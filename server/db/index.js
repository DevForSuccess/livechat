var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'student',
  password: 'my_student_2021',
  database: 'chatapp'
});

connection.connect();

module.exports = connection;