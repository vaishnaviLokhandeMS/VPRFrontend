const moment = require('moment');
const db = require('../config/db.js');
const bcrypt = require('bcrypt');
const generateUniqueShopID = require('../utils/generateUniqueShopID');

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

const createShop = async (req, res) => {
  const {
    shop_name,
    shop_address,
    gst_no,
    city,
    branch_name,
    branch_number,
    google_map_url,
    phone_number,
    password,
    user_id, // User UUID from the logged-in user
  } = req.body;

  try {
    console.log('Received shop creation request for user_id:', user_id); // Log the received user_id

    const hashedPassword = await bcrypt.hash(password, 10);

    const now = moment();
    const currentDate = now.format('YYYY-MM-DD');

    // Generate unique shop ID
    const shopID = await generateUniqueShopID();

    const insertShopQuery = `INSERT INTO shops (shopID, shop_name, shop_address, gst_no, city, branch_name, branch_number, google_map_url, phone_number, password, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    db.query(
      insertShopQuery,
      [
        shopID,
        shop_name,
        shop_address,
        gst_no,
        city,
        branch_name,
        branch_number,
        google_map_url,
        phone_number,
        hashedPassword,
      ],
      (insertShopErr, result) => {
        if (insertShopErr) {
          if (insertShopErr.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Shop already exists. Please choose another name.' });
          }
          return res.status(500).json({ message: 'Database error', error: insertShopErr });
        }

        // Increment the counter for the day
        const updateCountQuery = 'UPDATE shop_counter SET counter = counter + 1 WHERE date = ?';
        db.query(updateCountQuery, [currentDate], (updateCountErr) => {
          if (updateCountErr) {
            return res.status(500).json({ message: 'Database error', error: updateCountErr });
          }

          // Get the user row to find the first null shop column
          const getUserQuery = 'SELECT * FROM users WHERE uuid = ?';
          db.query(getUserQuery, [user_id], (getUserErr, getUserResult) => {
            if (getUserErr) {
              console.error('Error querying users table:', getUserErr);
              return res.status(500).json({ message: 'Database error', error: getUserErr });
            }

            if (!getUserResult || getUserResult.length === 0) {
              console.log('User not found for user_id:', user_id); // Log if user is not found
              return res.status(404).json({ message: 'User not found.' });
            }

            const userRow = getUserResult[0];
            console.log('User Row:', userRow); // Debugging log
            const userShopColumn = findFirstNullShopColumn(userRow);

            if (!userShopColumn) {
              return res.status(500).json({ message: 'No available shop column for the user.' });
            }

            // Associate shop with the user in users table
            const updateUserQuery = `UPDATE users SET ${userShopColumn} = ? WHERE uuid = ?`;
            db.query(updateUserQuery, [shopID, user_id], (updateUserErr) => {
              if (updateUserErr) {
                console.error('Error updating users table:', updateUserErr);
                return res.status(500).json({ message: 'Database error', error: updateUserErr });
              }

              // Get the shop row to find the first null user column
              const getShopQuery = 'SELECT * FROM shops WHERE shopID = ?';
              db.query(getShopQuery, [shopID], (getShopErr, getShopResult) => {
                if (getShopErr) {
                  console.error('Error querying shops table:', getShopErr);
                  return res.status(500).json({ message: 'Database error', error: getShopErr });
                }

                if (!getShopResult || getShopResult.length === 0) {
                  return res.status(404).json({ message: 'Shop not found.' });
                }

                const shopRow = getShopResult[0];
                console.log('Shop Row:', shopRow); // Debugging log
                const shopUserColumn = findFirstNullUserColumn(shopRow);

                if (!shopUserColumn) {
                  return res.status(500).json({ message: 'No available user column for the shop.' });
                }

                // Associate user with the shop in shops table
                const updateShopQuery = `UPDATE shops SET ${shopUserColumn} = ? WHERE shopID = ?`;
                db.query(updateShopQuery, [user_id, shopID], (updateShopErr) => {
                  if (updateShopErr) {
                    console.error('Error updating shops table:', updateShopErr);
                    return res.status(500).json({ message: 'Database error', error: updateShopErr });
                  }

                  res.status(201).json({ success: true, shopId: shopID });
                });
              });
            });
          });
        });
      }
    );
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = {
  createShop,
};
