const db = require(../db);

module.exports = {

  rooms: {
    get: (cb) {
      var query = 'select roomname from room';
      db.query(query, (err, results) => {
        cb(err, results)
      });
    }
  }

};