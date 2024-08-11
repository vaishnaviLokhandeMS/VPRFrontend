const { createConnection } = require('../config/db.js');

const initializeShopDatabase = async (shopID) => {
  const db = createConnection(shopID);
  
  const createTablesQueries = [
    `CREATE TABLE items (
    itemID VARCHAR(255) PRIMARY KEY,
    itemname VARCHAR(255),
    createdBy VARCHAR(255) NOT NULL,
    createdOnDate DATE NOT NULL,
    createdOnTime TIME NOT NULL,
    modifiedBy VARCHAR(255),
    modifiedOnDate DATE,
    modifiedOnTime TIME
);
`,
    `CREATE TABLE customer (
      customerID VARCHAR(255) PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      middleName VARCHAR(255),
      lastName VARCHAR(255),
      billingAddress TEXT,
      shippingAddress TEXT,
      phone1 VARCHAR(20),
      phone2 VARCHAR(20),
      email VARCHAR(255) UNIQUE,
      createdOnDate DATE NOT NULL,
      createdOnTime TIME NOT NULL,
      createdBy VARCHAR(255) NOT NULL,
      age INT,
      gender VARCHAR(10),
      occupation VARCHAR(255)
    );`,
    `CREATE TABLE partner (
      partnerID VARCHAR(255) PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      middleName VARCHAR(255),
      lastName VARCHAR(255),
      billingAddress TEXT,
      shippingAddress TEXT,
      phone1 VARCHAR(20),
      phone2 VARCHAR(20),
      email VARCHAR(255) UNIQUE,
      createdOnDate DATE NOT NULL,
      createdOnTime TIME NOT NULL,
      createdBy VARCHAR(255) NOT NULL,
      age INT,
      gender VARCHAR(10),
      occupation VARCHAR(255)
    );`,
    `CREATE TABLE counters (
      id INT AUTO_INCREMENT PRIMARY KEY,
      counter1 INT DEFAULT 0,
      counter2 INT DEFAULT 0,
      counter3 INT DEFAULT 0,
      counter4 INT DEFAULT 0,
      counter5 INT DEFAULT 0,
      counter6 INT DEFAULT 0,
      counter7 INT DEFAULT 0,
      counter8 INT DEFAULT 0,
      counter9 INT DEFAULT 0,
      counter10 INT DEFAULT 0
    );`
  ];

  const insertInitialCounterQuery = `
    INSERT INTO counters (counter1, counter2, counter3, counter4, counter5, counter6, counter7, counter8, counter9, counter10)
    VALUES (0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  `;

  try {
    for (const query of createTablesQueries) {
      await new Promise((resolve, reject) => {
        db.query(query, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    // Insert initial counter values
    await new Promise((resolve, reject) => {
      db.query(insertInitialCounterQuery, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    console.log(`Tables created successfully in ${shopID} database.`);
  } catch (err) {
    console.error(`Error creating tables in ${shopID} database:`, err);
    throw err;
  } finally {
    db.end();
  }
};

module.exports = initializeShopDatabase;
