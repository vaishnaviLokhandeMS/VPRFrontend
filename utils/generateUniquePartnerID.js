const { createConnection } = require('../config/db');
const moment = require('moment');

const generateUniquePartnerID = async (dbName) => {
  return new Promise((resolve, reject) => {
    const db = createConnection(); // Connect to the specified database
    const currentDate = moment();
    const year = currentDate.year();
    const week = currentDate.isoWeek();
    const day = currentDate.day();
    const dayShortForm = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][day];

    // Increment the counter and get the new value
    const incrementCounterQuery = `UPDATE ${dbName}.counters SET counter4 = counter4 + 1 WHERE id = 1`;
    const getCounterQuery = `SELECT counter4 FROM ${dbName}.counters WHERE id = 1`;

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

        const counterValue = results[0].counter4.toString().padStart(4, '0');
        const uniquePartnerID = `P${year}${dayShortForm}${week.toString().padStart(2, '0')}${counterValue}`;
        
        db.end();
        resolve(uniquePartnerID);
      });
    });
  });
};

module.exports = generateUniquePartnerID;
