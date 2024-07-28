const db = require('../config/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helper function to find the first null shop column
const findFirstNullShopColumn = (userRow) => {
  for (let i = 1; i <= 30; i++) {
    const columnName = `sh${i.toString().padStart(2, '0')}`;
    if (userRow[columnName] === null) {
      return columnName;
    }
  }
  return null;
};

// Helper function to find the first null user column
const findFirstNullUserColumn = (shopRow) => {
  for (let i = 1; i <= 30; i++) {
    const columnName = `user${i}`;
    if (shopRow[columnName] === null) {
      return columnName;
    }
  }
  return null;
};

const getUserShops = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT in getUserShops:', decoded);

    const query = 'SELECT * FROM users WHERE uuid = ?';
    db.query(query, [decoded.userId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (result.length === 0) {
        console.log('User not found for UUID:', decoded.userId);
        return res.status(404).json({ message: 'User not found' });
      }

      const user = result[0];

      // Check if the user is an admin
      if (user.isAdmin === 1) {
        const getAllShopsQuery = 'SELECT * FROM shops';
        db.query(getAllShopsQuery, (shopsErr, shopsResult) => {
          if (shopsErr) {
            return res.status(500).json({ message: shopsErr.message });
          }
          return res.json({ shops: shopsResult });
        });
      } else {
        const shopColumns = Array.from({ length: 30 }, (_, i) => `sh${String(i + 1).padStart(2, '0')}`);
        const userShops = shopColumns.filter(col => user[col] !== null).map(col => user[col]);

        if (userShops.length === 0) {
          return res.status(404).json({ message: 'No shops associated with this user' });
        }

        const getShopsQuery = 'SELECT * FROM shops WHERE shopID IN (?)';
        db.query(getShopsQuery, [userShops], (shopsErr, shopsResult) => {
          if (shopsErr) {
            return res.status(500).json({ message: shopsErr.message });
          }

          res.json({ shops: shopsResult });
        });
      }
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const validateShopID = (req, res) => {
  try {
    const { shopID, password } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT in validateShopID:', decoded);

    const query = 'SELECT * FROM shops WHERE shopID = ?';
    db.query(query, [shopID], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'No shop found with the provided ID.' });
      }

      const shop = results[0];
      const isMatch = await bcrypt.compare(password, shop.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid password.' });
      }

      // Fetch user row to check if the shop is already associated with the user
      const getUserQuery = 'SELECT * FROM users WHERE uuid = ?';
      db.query(getUserQuery, [decoded.userId], (getUserErr, getUserResult) => {
        if (getUserErr) {
          return res.status(500).json({ message: getUserErr.message });
        }
        if (getUserResult.length === 0) {
          console.log('User not found for UUID in validateShopID:', decoded.userId);
          return res.status(404).json({ message: 'User not found.' });
        }

        const userRow = getUserResult[0];
        const shopColumns = Array.from({ length: 30 }, (_, i) => `sh${String(i + 1).padStart(2, '0')}`);
        const isShopAlreadyAssociated = shopColumns.some(col => userRow[col] === shopID);

        if (isShopAlreadyAssociated) {
          return res.status(400).json({ message: 'This shop is already associated with the user.' });
        }

        const userShopColumn = findFirstNullShopColumn(userRow);

        if (!userShopColumn) {
          return res.status(500).json({ message: 'No available shop column for the user.' });
        }

        // Associate shop with the user in users table
        const updateUserQuery = `UPDATE users SET ${userShopColumn} = ? WHERE uuid = ?`;
        db.query(updateUserQuery, [shopID, decoded.userId], (updateUserErr) => {
          if (updateUserErr) {
            return res.status(500).json({ message: updateUserErr.message });
          }

          // Associate user with the shop in shops table
          const getShopQuery = 'SELECT * FROM shops WHERE shopID = ?';
          db.query(getShopQuery, [shopID], (getShopErr, getShopResult) => {
            if (getShopErr) {
              return res.status(500).json({ message: getShopErr.message });
            }
            if (getShopResult.length === 0) {
              return res.status(404).json({ message: 'Shop not found.' });
            }

            const shopRow = getShopResult[0];
            const shopUserColumn = findFirstNullUserColumn(shopRow);

            if (!shopUserColumn) {
              return res.status(500).json({ message: 'No available user column for the shop.' });
            }

            const updateShopQuery = `UPDATE shops SET ${shopUserColumn} = ? WHERE shopID = ?`;
            db.query(updateShopQuery, [decoded.userId, shopID], (updateShopErr) => {
              if (updateShopErr) {
                return res.status(500).json({ message: updateShopErr.message });
              }

              res.json({ success: true, message: 'New shop has been tagged to you.' });
            });
          });
        });
      });
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  getUserShops,
  validateShopID,
};
