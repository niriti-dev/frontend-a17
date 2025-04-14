import React from 'react';
import { NavLink } from 'react-router-dom';
import './topbar.css';

const Topbar = () => {
  return (
    <header className="topbar">
      {/* Navigation Links */}
      
      <nav>
        <NavLink 
          to="/dashboard"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/users"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Users
        </NavLink>
        <NavLink 
          to="/manuscripts"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Manuscripts
        </NavLink>
      </nav>

      {/* User Profile Section */}

      <div className="user-profile">
        <img 
          src="https://via.placeholder.com/36" 
          alt="User Profile" 
        />
        <span>Username</span>
      </div>
    </header>
  );
};

export default Topbar;
