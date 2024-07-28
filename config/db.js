const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'vyapar',
  password: 'vyapar',
  database: 'mvpr',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('MySQL Connected...');
});

module.exports = db;
