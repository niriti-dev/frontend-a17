import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Topbar() {
  const btn = ({ isActive }) => `nav-btn${isActive ? ' active' : ''}`;
  const { isAuthed, logout, user } = useAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const modalRef = useRef(null);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login', { replace: true });
  };

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="topbar">
      <nav className="topbar-nav">
        <div className="nav-left">
          <NavLink to="/users" className={btn}>Users</NavLink>
          <NavLink to="/manuscripts" className={btn}>Manuscripts</NavLink>
        </div>
        
        <div className="nav-right">
          <a href="#" onClick={handleLogout} className="nav-btn">
            Log&nbsp;Out
          </a>
          <button 
            className="hamburger-btn"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>
      </nav>

      {showProfile && (
        <>
          <div className="side-panel-overlay" onClick={() => setShowProfile(false)} />
          <div className="profile-side-panel" ref={modalRef}>
            <h3>User Profile</h3>
            <div className="profile-info">
              <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
              <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
              <p><strong>Affiliation:</strong> {user?.affiliation || 'N/A'}</p>
              <p><strong>Roles:</strong> {Array.isArray(user?.roles) ? user.roles.join(', ') : user?.roles || 'N/A'}</p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
