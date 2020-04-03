import React from "react";
import "./UserMenu.css";

const UserMenu = ({ user, logout }) => {
  return (
    <>
      <li className="nav-item">
        <span className="nav-link">Hello, {user}!</span>
      </li>
      <li className="nav-item">
        <span className="nav-link">|</span>
      </li>
      <li className="nav-item">
        <span onClick={logout} className="nav-link" style={{cursor: 'pointer'}}>Logout</span>
      </li>
    </>
  );
};

export default UserMenu;
