const db = require('./index');
const rooms = require('./rooms');

const seedData = async () => {
  try {
    await dropTable();
    await createTable();
    await importData();
  } catch (err) {
    console.log(err);
  } finally {
    db.end();
  }
}

const dropTable = () => {
  let query = `DROP TABLE IF EXISTS rooms`;
  db.query(query);
}

const createTable = () => {
  let query = `CREATE TABLE chatapp.rooms (room_id int NOT NULL AUTO_INCREMENT, room_name varchar(45) NOT NULL, PRIMARY KEY (room_id))`;
  db.query(query);
}

const importData = () => {
  let query = `INSERT INTO rooms (room_name) \
               VALUES (?)`;
  for (let i = 0; i < rooms.length; i++) {
    db.query(query, [rooms[i]], (err, result) => {
      if (!err) {
        console.log(result.insertId);
      } else {
        return err;
      }
    });
  }
}

seedData();