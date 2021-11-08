/* const express = require('express');
const path = require('path');
const db = require('./db/index.js');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const router = require('router'); */

import express from 'express';
import path from 'path';
import db from './db/index.js';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import router from 'router';

import formatMessage from './../helpers/messages.js';
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from './../helpers/users.js';

const app = express();
app.use(express.static(path.join(new URL(import.meta.url).pathname, '/../client/dist')));
// app.use(express.static(path.join(__dirname, '/../client/dist')));

const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(router);

app.get('/api/rooms', (req, res) => {

});

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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));