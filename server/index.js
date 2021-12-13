const express = require('express');
const path = require('path');
const room = require('./controllers/room');
const cors = require('cors');
const http = require('http');

const https = require('https');
const fs = require('fs');

const socketio = require('socket.io');
const router = require('router');

const formatMessage = require('./../helpers/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./../helpers/users');

const app = express();
app.use(express.static(path.join(__dirname, '/../client/dist')));

const server = https.createServer(
  {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  },
  app);
const io = socketio(server);

app.use(cors());
// app.use(router);

app.get('/api/rooms', room.getAll); // -> this can be moved to separate routing files

// chat code block
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
// end of chat code block

const PORT = process.env.PORT || 80;
server.listen(PORT, () => console.log(`Server running on port https://localhost:${PORT}`));
app.listen(8780, () => console.log(`API running on port https://localhost:8780`));