import React from 'react';

const UsersInfo = ({ users }) => (
  <>
    <h3><i className="fas fa-users"></i> Users:</h3>
    <ul id="users">
      {users.map(user => {
        return (
          <li key={user.username}>{user.username}</li>
        )
      })}
    </ul>
  </>
);

export default UsersInfo;
