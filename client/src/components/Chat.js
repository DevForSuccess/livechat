import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Qs from 'query-string';
import io from 'socket.io-client'

import RoomInfo from './Room';
import UsersInfo from './User';
import Messages from './Messages';
import SendMessage from './SendMessage';

const socket = io();

const Chat = ({ location }) => {
  const [username, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { username, room } = Qs.parse(location.search, {
      ignoreQueryPrefix: true
    });

    setRoom(room);
    setName(username);

    socket.emit('joinRoom', { username, room }, (err) => {
      console.log('Error emitting: ', err);
    });

  }, []);

  useEffect(() => {
    socket.on('roomUsers', ({ room, users }) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });
  }, []);


  return (
    <>
      <div className="chat-container">
        <header className="chat-header">
          <h1><i className="fas fa-smile"></i> Coding Chatroom</h1>
          <a href="/" className="btn">Leave Room</a>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <div><RoomInfo room={room} /></div>
            <UsersInfo users={users} />
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => <Messages key={i} message={m} />)}
          </div>
        </main>
        <div className="chat-form-container">
          <SendMessage socket={socket} />
        </div>
      </div>
    </>
  )
}

export default Chat;