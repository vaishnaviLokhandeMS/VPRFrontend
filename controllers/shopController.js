const moment = require('moment');
const { createConnection } = require('../config/db.js');
const bcrypt = require('bcrypt');
const generateUniqueShopID = require('../utils/generateUniqueShopID');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectMongoDB = require('../config/mongo'); // Import MongoDB connection
const initializeShopDatabase = require('../utils/dbInitializer'); // Import the DB initializer

// Load environment variables from .env file
dotenv.config();

// Helper functions to find the first null column
const findFirstNullShopColumn = (userRow) => {
  for (let i = 1; i <= 30; i++) {
    const columnName = `sh${i.toString().padStart(2, '0')}`;
    if (userRow[columnName] === null) {
      return columnName;
    }
  }
  return null;
};

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
  const db = createConnection(); // Always use default database 'mvpr'
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
    user_id,
  } = req.body;

  try {
    console.log('Received shop creation request for user_id:', user_id);

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
      async (insertShopErr, result) => {
        if (insertShopErr) {
          db.end();
          if (insertShopErr.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Shop already exists. Please choose another name.' });
          }
          return res.status(500).json({ message: 'Database error', error: insertShopErr });
        }

        try {
          // Create a new MySQL database for the shop
          const createMysqlDatabaseQuery = `CREATE DATABASE ??`;
          await new Promise((resolve, reject) => {
            db.query(createMysqlDatabaseQuery, [shopID], (createDbErr) => {
              if (createDbErr) return reject(createDbErr);
              resolve();
            });
          });

          // Initialize the newly created MySQL database with necessary tables
          await initializeShopDatabase(shopID);

          // Create a new MongoDB database for the shop and perform an initial write
          const shopMongoDbUri = `${process.env.MONGO_URI}/${shopID}`;
          const shopMongoConnection = mongoose.createConnection(shopMongoDbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

          shopMongoConnection.once('open', async () => {
            console.log(`MongoDB database ${shopID} created successfully`);
            // Perform an initial write to ensure the database is created
            const initialCollection = shopMongoConnection.collection('initialCollection');
            await initialCollection.insertOne({ init: true });
            console.log(`Initial document written to MongoDB database ${shopID}`);
          });

          shopMongoConnection.on('error', (err) => {
            console.error('Error creating MongoDB database:', err);
          });

          // Increment the counter for the day
          const updateCountQuery = 'UPDATE shop_counter SET counter = counter + 1 WHERE date = ?';
          db.query(updateCountQuery, [currentDate], (updateCountErr) => {
            if (updateCountErr) {
              db.end();
              return res.status(500).json({ message: 'Database error', error: updateCountErr });
            }

            // Get the user row to find the first null shop column
            const getUserQuery = 'SELECT * FROM users WHERE uuid = ?';
            db.query(getUserQuery, [user_id], (getUserErr, getUserResult) => {
              if (getUserErr) {
                db.end();
                console.error('Error querying users table:', getUserErr);
                return res.status(500).json({ message: 'Database error', error: getUserErr });
              }

              if (!getUserResult || getUserResult.length === 0) {
                db.end();
                console.log('User not found for user_id:', user_id);
                return res.status(404).json({ message: 'User not found.' });
              }

              const userRow = getUserResult[0];
              console.log('User Row:', userRow);
              const userShopColumn = findFirstNullShopColumn(userRow);

              if (!userShopColumn) {
                db.end();
                return res.status(500).json({ message: 'No available shop column for the user.' });
              }

              // Associate shop with the user in users table
              const updateUserQuery = `UPDATE users SET ${userShopColumn} = ? WHERE uuid = ?`;
              db.query(updateUserQuery, [shopID, user_id], (updateUserErr) => {
                if (updateUserErr) {
                  db.end();
                  console.error('Error updating users table:', updateUserErr);
                  return res.status(500).json({ message: 'Database error', error: updateUserErr });
                }

                // Get the shop row to find the first null user column
                const getShopQuery = 'SELECT * FROM shops WHERE shopID = ?';
                db.query(getShopQuery, [shopID], (getShopErr, getShopResult) => {
                  if (getShopErr) {
                    db.end();
                    console.error('Error querying shops table:', getShopErr);
                    return res.status(500).json({ message: 'Database error', error: getShopErr });
                  }

                  if (!getShopResult || getShopResult.length === 0) {
                    db.end();
                    return res.status(404).json({ message: 'Shop not found.' });
                  }

                  const shopRow = getShopResult[0];
                  console.log('Shop Row:', shopRow);
                  const shopUserColumn = findFirstNullUserColumn(shopRow);

                  if (!shopUserColumn) {
                    db.end();
                    return res.status(500).json({ message: 'No available user column for the shop.' });
                  }

                  // Associate user with the shop in shops table
                  const updateShopQuery = `UPDATE shops SET ${shopUserColumn} = ? WHERE shopID = ?`;
                  db.query(updateShopQuery, [user_id, shopID], (updateShopErr) => {
                    db.end();
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
        } catch (err) {
          db.end();
          console.error('Error creating databases:', err);
          res.status(500).json({ message: 'Error creating databases', error: err });
        }
      }
    );
  } catch (err) {
    db.end();
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = {
  createShop,
};
