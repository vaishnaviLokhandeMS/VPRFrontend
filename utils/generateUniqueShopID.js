const { createConnection } = require('../config/db');
const moment = require('moment');

const generateUniqueShopID = async () => {
  return new Promise((resolve, reject) => {
    const db = createConnection(); // Always use default database 'mvpr'
    const currentDate = moment();
    const year = currentDate.year();
    const week = currentDate.isoWeek();
    const day = currentDate.day();
    const dayShortForm = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][day];

    const dateString = currentDate.format('YYYY-MM-DD');

    // Check if there's a counter for today
    const checkCounterQuery = 'SELECT * FROM user_counter WHERE date = ?';
    db.query(checkCounterQuery, [dateString], (err, results) => {
      if (err) {
        db.end();
        return reject(err);
      }

      let counter = 1;

      if (results.length > 0) {
        // If there's an existing counter for today, increment it
        counter = results[0].counter + 1;
        const updateCounterQuery = 'UPDATE shop_counter SET counter = ? WHERE date = ?';
        db.query(updateCounterQuery, [counter, dateString], (updateErr) => {
          if (updateErr) {
            db.end();
            return reject(updateErr);
          }
        });
      } else {
        // If there's no counter for today, create one
        const insertCounterQuery = 'INSERT INTO shop_counter (date, counter) VALUES (?, ?)';
        db.query(insertCounterQuery, [dateString, counter], (insertErr) => {
          if (insertErr) {
            db.end();
            return reject(insertErr);
          }
        });
      }

      const shopID = `S${year}${dayShortForm}${week.toString().padStart(2, '0')}${counter.toString().padStart(3, '0')}`;
      db.end();
      resolve(shopID);
    });
  });
};

module.exports = generateUniqueShopID;
