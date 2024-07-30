const { createConnection } = require('../config/db');
const moment = require('moment');

const generateUniqueItemID = async (dbName) => {
  return new Promise((resolve, reject) => {
    const db = createConnection(); // Connect to the specified database
    const currentDate = moment();
    const year = currentDate.year();
    const week = currentDate.isoWeek();
    const day = currentDate.day();
    const dayShortForm = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][day];

    // Increment the counter and get the new value
    const incrementCounterQuery = `UPDATE ${dbName}.counters SET counter2 = counter2 + 1 WHERE id = 1`;
    const getCounterQuery = `SELECT counter2 FROM ${dbName}.counters WHERE id = 1`;

    db.query(incrementCounterQuery, (incrementErr) => {
      if (incrementErr) {
        db.end();
        return reject(incrementErr);
      }

      db.query(getCounterQuery, (getCounterErr, results) => {
        if (getCounterErr) {
          db.end();
          return reject(getCounterErr);
        }

        const counterValue = results[0].counter2.toString().padStart(4, '0');
        const uniqueItemID = `I${year}${dayShortForm}${week.toString().padStart(2, '0')}${counterValue}`;
        
        db.end();
        resolve(uniqueItemID);
      });
    });
  });
};

module.exports = generateUniqueItemID;
