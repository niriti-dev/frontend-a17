import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Topbar() {
  return (
    <header className="topbar">

      <nav className="topbar-nav">
        <NavLink to="/dashboard"   className="nav-btn">
          Dashboard
        </NavLink>
        <NavLink to="/users"       className="nav-btn">
          Users
        </NavLink>
        <NavLink to="/manuscripts" className="nav-btn">
          Manuscripts
        </NavLink>
        <NavLink to="/books"       className="nav-btn">
          Books
        </NavLink>
        <NavLink to="/login"       className="nav-btn">
          Log&nbsp;In
        </NavLink>
        <NavLink to="/signup"      className="nav-btn">
          Sign&nbsp;Up
        </NavLink>
      </nav>
    </header>
  );
}
