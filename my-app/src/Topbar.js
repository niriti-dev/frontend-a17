import React from 'react';
import './topbar.css';

const Topbar = () => {
  return (
    <header className="topbar">
      {/* Brand / Logo */}

      {/* Navigation Links */}
      <nav>
        <a href="/dashboard">Dashboard</a>
        <a href="/users">Users</a>
        <a href="/manuscripts">Manuscripts</a>
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