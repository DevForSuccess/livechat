import db from './index.js';
import rooms from './rooms.js';

const importData = async () => {
  // try {
  //   await
  // }
  let query;
  query = 'DROP TABLE rooms IF EXISTS';

  query = `INSERT INTO rooms (room_name) \
               VALUES (?)`;
  for (let i = 0; i < rooms.length; i++) {
    db.query(query, [rooms[i]], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.insertId);
      }
    });
  }
  db.end();
}

importData();