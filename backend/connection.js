const mysql = require('mysql2');
const db = mysql.createConnection({
  user: '',
  host: '',
  password: '',
  database: '',
});

module.exports = db;
