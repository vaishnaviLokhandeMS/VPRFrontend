const jwt = require('jsonwebtoken');
const { createConnection } = require('../config/db');

const selectShop = (req, res) => {
  const db = createConnection(); // Always use default database 'mvpr'
  try {
    const { shopId } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is associated with the shop or is an admin
    const query = 'SELECT * FROM users WHERE uuid = ?';
    db.query(query, [decoded.userId], (err, results) => {
      if (err) {
        db.end();
        return res.status(500).json({ message: err.message });
      }
      if (results.length === 0) {
        db.end();
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];
      const isAdmin = user.isAdmin;
      const shopColumns = Array.from({ length: 30 }, (_, i) => `sh${String(i + 1).padStart(2, '0')}`);
      const isShopAssociated = shopColumns.some(col => user[col] === shopId);

      if (isShopAssociated || isAdmin) {
        const shopToken = jwt.sign({ userId: decoded.userId, shopId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        db.end();
        return res.json({ success: true, token: shopToken });
      } else {
        db.end();
        return res.status(403).json({ message: 'User is not associated with the shop and is not an admin' });
      }
    });
  } catch (error) {
    db.end();
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  selectShop,
};
