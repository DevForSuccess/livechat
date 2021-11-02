import React from 'react';

const RoomInfo = ({ room }) => (
  <>
    <h3><i className="fas fa-comments"></i><span>Room:</span></h3>
    <h3 id="room-name">{room}</h3>
  </>
);

export default RoomInfo;
