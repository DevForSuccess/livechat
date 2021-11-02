import React, { useState, useEffect } from 'react';

const SendMessage = ({ socket }) => {
  const [message, setMessage] = useState('');
  let messageBox;

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  }

  const submitMessage = (e) => {
    e.preventDefault();

    socket.emit('chatMessage', message);

    setMessage('');
    messageBox.focus();
  };

  return (
    <>
      <form id="chat-form">
        <input ref={(input) => { messageBox = input; }} value={message} onChange={handleInputChange} id="msg" type="text" placeholder="Enter Message" required autoComplete="off" />
        <button onClick={submitMessage} className="btn"><i className="fas fa-paper-plane"></i> Send</button>
      </form>
    </>
  )
};

export default SendMessage;
