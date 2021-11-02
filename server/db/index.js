var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'chatApp'
});

connection.connect();

module.exports = connection;