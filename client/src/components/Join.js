import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Join = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('/api/rooms')
      .then(res => {
        let rm = [];
        res.data.forEach(room => rm.push(room.room_name));
        setRooms(rm);
      });
  }, []);

  const [name, setName] = useState('');
  const [room, setRoom] = useState('JavaScript');

  return (
    <>
      <div className="join-container">
        <header className="join-header">
          <h1><i className="fas fa-smile"></i> Coding Chatroom</h1>
        </header>
        <main className="join-main">
          <form action="chat.html">
            <div className="form-control">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter name..."
                required
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="room">Room</label>
              <select name="room" id="room" onChange={(event) => setRoom(event.target.value)}>
                {rooms.map((room, i) => <option key={i} value={room}>{room}</option>)}
              </select>
            </div>
            <Link to={`/chat?username=${name}&room=${room}`}>
              <button type="submit" className="btn">Join Room</button>
            </Link>
          </form>
        </main>
      </div>
    </>
  )
}

export default Join;