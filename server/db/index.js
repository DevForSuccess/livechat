const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_CHAT_USER,
  password: process.env.MYSQL_CHAT_PASS,
  database: process.env.MYSQL_CHAT_DB
});

connection.connect(err => {
  if (err) { console.log(err) }
  else { console.log('database connected') };
});

module.exports = connection;