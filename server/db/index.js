import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

var connection = mysql.createConnection({
  user: process.env.MYSQL_CHAT_USER,
  password: process.env.MYSQL_CHAT_PASS,
  database: process.env.MYSQL_CHAT_DB
});

connection.connect();

export default connection;