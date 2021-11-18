const db = require('../db');

const get = () => {
  return new Promise((resolve, reject) => {
    let query = 'select room_name from chatapp.rooms';
    db.query(query, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = {
  get
};