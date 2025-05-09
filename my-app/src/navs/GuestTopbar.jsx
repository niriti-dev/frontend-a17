import React from 'react';
import { NavLink } from 'react-router-dom';

export default function GuestTopbar() {
  const btn = ({ isActive }) => `nav-btn${isActive ? ' active' : ''}`;

  return (
    <header className="topbar">
      <nav className="topbar-nav">
        <div className="nav-left"></div>
        <div className="nav-right">
          <NavLink to="/login" className={btn}>Log&nbsp;In</NavLink>
          <NavLink to="/signup" className={btn}>Sign&nbsp;Up</NavLink>
        </div>
      </nav>
    </header>
  );
}
