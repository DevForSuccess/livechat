import React, { useState, useEffect } from 'react';

const Messages = ({ message }) => {
  const addStyling = () => {
    const chatMesages = document.querySelector('.chat-messages');
    chatMesages.scrollTop = chatMesages.scrollHeight;
  };

  useEffect(() => {
    addStyling();
  }, []);

  return (
    <>
      <div className='message' key={message.username + message.time}>
        <p className='meta'>{message.username}
          <span style={{ paddingLeft: "3px" }}>{message.time}</span></p>
        <p className='text'>{message.text}</p>
      </div>
    </>
  )
};

export default Messages;
