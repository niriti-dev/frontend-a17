// src/Topbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Topbar() {
  const btn = ({ isActive }) => `nav-btn${isActive ? ' active' : ''}`;

  return (
    <header className="topbar">
      <nav className="topbar-nav">
        <NavLink to="/users"       className={btn}>Users</NavLink>
        <NavLink to="/manuscripts" className={btn}>Manuscripts</NavLink>
        <NavLink to="/books"       className={btn}>Books</NavLink>
        <NavLink to="/login"       className={btn}>Log&nbsp;In</NavLink>
        <NavLink to="/signup"      className={btn}>Sign&nbsp;Up</NavLink>
      </nav>
    </header>
  );
}
