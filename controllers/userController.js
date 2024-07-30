const bcrypt = require('bcrypt');
const { createConnection } = require('../config/db');
const generateUniqueUserID = require('../utils/generateUniqueUserID');

// Function to create a new user
const createUser = async (req, res) => {
  const db = createConnection(); // Always use default database 'mvpr'
  const {
    username,
    password,
    confirmPassword,
    first_name,
    last_name,
    email,
    phone_number,
    street_address,
    city,
    state_province,
    postal_code,
    country,
    date_of_birth,
    gender,
    profile_picture,
    access_level,
  } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    db.end();
    return res.status(400).json({ message: 'Passwords do not match. Please verify your password.' });
  }

  // Check if username or email already exists
  const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkUserQuery, [username, email], async (err, results) => {
    if (err) {
      db.end();
      return res.status(500).json({ message: err.message });
    }
    if (results.length > 0) {
      db.end();
      return res.status(400).json({ message: 'Username or email already exists. Please use a different one.' });
    }

    try {
      // Generate a unique user ID
      const user_id = await generateUniqueUserID();

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const insertUserQuery = `
        INSERT INTO users (uuid, username, password, first_name, last_name, email, phone_number, street_address, city, state_province, postal_code, country, date_of_birth, gender, profile_picture, access_level)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        insertUserQuery,
        [
          user_id,
          username,
          hashedPassword,
          first_name,
          last_name,
          email,
          phone_number,
          street_address,
          city,
          state_province,
          postal_code,
          country,
          date_of_birth,
          gender,
          profile_picture,
          access_level,
        ],
        (err, result) => {
          db.end();
          if (err) {
            return res.status(500).json({ message: err.message });
          }
          return res.status(201).json({ success: true, message: 'User created successfully', uuid: user_id });
        }
      );
    } catch (error) {
      db.end();
      return res.status(500).json({ message: error.message });
    }
  });
};

module.exports = {
  createUser,
};
