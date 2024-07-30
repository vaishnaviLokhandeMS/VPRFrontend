// config/db.js
const mysql = require('mysql');
const logger = require('./../utils/logger');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'mvpr' // Default database
};

const createConnection = (database) => {
  const finalConfig = { ...dbConfig, database: database || dbConfig.database };
  logger.info(`Creating connection to database: ${finalConfig.database}`);
  const connection = mysql.createConnection(finalConfig);

  connection.connect((err) => {
    if (err) {
      logger.error(`Error connecting to database ${finalConfig.database}: ${err.message}`);
    } else {
      logger.info(`Connected to database: ${finalConfig.database}`);
    }
  });

  return connection;
};

module.exports = { createConnection };
