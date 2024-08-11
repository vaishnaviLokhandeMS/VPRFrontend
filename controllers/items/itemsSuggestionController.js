const { createConnection } = require('../../config/db.js');

const itemsSuggestion = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Item name is required' });
  }

  const shopIDFromToken = req.shopId; // Retrieved from the shop token

  // Create MySQL connection with shopIDFromToken
  const db = createConnection(shopIDFromToken);

  try {
    const query = `SELECT itemname FROM items WHERE itemname LIKE ? LIMIT 10`;
    const values = [`${name}%`]; // Match item names starting with the provided input

    db.query(query, values, (err, results) => {
      if (err) {
        db.end();
        console.error('Error fetching item suggestions:', err);
        return res.status(500).json({ message: 'Database error', error: err });
      }

      const suggestions = results.map(row => row.itemname);
      db.end();
      res.json(suggestions);
    });
  } catch (err) {
    db.end();
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = {
  itemsSuggestion,
};
