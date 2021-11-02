const express = require('express');
const path = require('path');
const db = require('./db/index.js');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const router = require('router');

const formatMessage = require('./../helpers/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./../helpers/users');

const app = express();
app.use(express.static(path.join(__dirname, '/../client/dist')));

const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

const botName = 'Chatroom concierge';
io.on('connection', socket => {
  console.log('Socket connection is successful');

  socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
      console.log(`${user.username} has joined ${user.room}`);

      socket.join(user.room);

      socket.emit('message', formatMessage(botName, `Hi ${user.username}, welcome to Coding Chatroom!`));

      socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

      io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
      });
  });

  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    console.log(`${user.username} sent message: ${msg}`);
      io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  socket.on('disconnect', () => {
      const user = userLeave(socket.id);

      if (user) {
          io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
      }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));