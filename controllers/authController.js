const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createConnection } = require('../config/db');

const loginUser = (req, res) => {
  const db = createConnection(); // Always use default database 'mvpr'
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';

  db.query(query, [username], async (err, results) => {
    if (err) {
      db.end();
      return res.status(500).json({ message: err.message });
    }
    if (results.length === 0) {
      db.end();
      return res.status(400).json({ success: false, message: 'Check your username or password' });
    }

    const user = results[0];
    if (user.is_locked) {
      db.end();
      return res.status(400).json({ success: false, message: 'This user is locked. Contact the administrator.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const updateQuery = 'UPDATE users SET failed_attempts = failed_attempts + 1 WHERE username = ?';
      db.query(updateQuery, [username], (updateErr) => {
        if (updateErr) {
          db.end();
          return res.status(500).json({ message: updateErr.message });
        }
        const checkLockQuery = 'SELECT failed_attempts FROM users WHERE username = ?';
        db.query(checkLockQuery, [username], (checkErr, checkResults) => {
          if (checkErr) {
            db.end();
            return res.status(500).json({ message: checkErr.message });
          }
          const failedAttempts = checkResults[0].failed_attempts;
          if (failedAttempts >= 5) {
            const lockQuery = 'UPDATE users SET is_locked = TRUE WHERE username = ?';
            db.query(lockQuery, [username], (lockErr) => {
              db.end();
              if (lockErr) {
                return res.status(500).json({ message: lockErr.message });
              }
              return res.status(400).json({ success: false, message: 'Account is locked due to too many failed attempts. Contact the administrator.' });
            });
          } else {
            db.end();
            return res.status(400).json({ success: false, message: `Wrong password. You have ${failedAttempts} failed attempts.` });
          }
        });
      });
    } else {
      const resetQuery = 'UPDATE users SET failed_attempts = 0 WHERE username = ?';
      db.query(resetQuery, [username], (resetErr) => {
        if (resetErr) {
          db.end();
          return res.status(500).json({ message: resetErr.message });
        }
        const token = jwt.sign({ userId: user.uuid, accessLevel: user.access_level }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated JWT:', token); // Log the generated token

        // Check for shop associations
        const shopColumns = Array.from({ length: 30 }, (_, i) => `sh${String(i + 1).padStart(2, '0')}`);
        const hasShops = shopColumns.some(col => user[col] !== null);

        db.end();
        res.json({ success: true, token, hasShops });
      });
    }
  });
};

const getUser = (req, res) => {
  const db = createConnection(); // Always use default database 'mvpr'
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Decoded JWT in getUser:', decoded); // Add this line
  const query = 'SELECT * FROM users WHERE uuid = ?';

  db.query(query, [decoded.userId], (err, result) => {
    if (err) {
      db.end();
      return res.status(500).json({ message: err.message });
    }
    if (result.length === 0) {
      db.end();
      return res.status(404).json({ message: 'User not found' });
    }
    db.end();
    res.json({ user: result[0] });
  });
};

module.exports = {
  loginUser,
  getUser,
};
