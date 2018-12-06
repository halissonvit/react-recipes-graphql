import React from "react";
import Link from "react-router-dom/Link";

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => {
  return (
    <div>
      <h3>User Info</h3>
      <p>Username: {session.getCurrentUser.username}</p>
      <p>Email: {session.getCurrentUser.email}</p>
      <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>

      <h3>{session.getCurrentUser.username}'s favorites</h3>
      <ul>
        {session.getCurrentUser.favorites.map(favorite => (
          <li key={favorite._id}>
            <Link to={`/recipes/${favorite._id}`}>{favorite.name}</Link>
          </li>
        ))}
        {!session.getCurrentUser.favorites.length && (
          <p>You have no favorites currently. Go add some!</p>
        )}
      </ul>
    </div>
  );
};

export default UserInfo;
