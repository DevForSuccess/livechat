const Room = require('../models/room');

const getAll = async (req, res) => {
  Room.get()
    .then(rooms => {
      res.status(200).send(rooms);
    });
}

module.exports = { getAll };