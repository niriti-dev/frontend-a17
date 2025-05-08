import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Topbar() {
  const btn    = ({ isActive }) => `nav-btn${isActive ? ' active' : ''}`;
  const { isAuthed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace:true });
  };

  return (
    <header className="topbar">
      <nav className="topbar-nav">
        <NavLink to="/users"       className={btn}>Users</NavLink>
        <NavLink to="/manuscripts" className={btn}>Manuscripts</NavLink>
        <NavLink to="/books"       className={btn}>Books</NavLink>

        {isAuthed ? (
          <button onClick={handleLogout} className="nav-btn">Log&nbsp;Out</button>
        ) : (
          <>
            <NavLink to="/login"  className={btn}>Log&nbsp;In</NavLink>
            <NavLink to="/signup" className={btn}>Sign&nbsp;Up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
