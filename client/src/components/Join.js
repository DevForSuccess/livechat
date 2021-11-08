import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
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
                <option value="Javascript">Javascript</option>
                <option value="Node">Node</option>
                <option value="React">React</option>
                <option value="MySQL">MySQL</option>
                <option value="Redux">Redux</option>
                <option value="Mongo">Mongo</option>
                <option value="Sequelize">Sequelize</option>
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