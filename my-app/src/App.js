import React, { useState } from 'react';
import './App.css';
import Users from './Users.jsx';
import Manuscripts from './Manuscripts.jsx'; 
import Books from './Books.jsx'; 
import Login from './login.jsx';
import SignUp from './signup.jsx';

function App() {
  const [view, setView] = useState('users');

  return (
    <div>
      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => setView('users')}>Users</button>
        <button className="nav-btn" onClick={() => setView('manuscripts')}>Manuscripts</button>
        {/* <button className="nav-btn" onClick={() => setView('books')}>Show Books</button> */}
        <button className="nav-btn" onClick={() => setView('login')}>Log In</button>
        <button className="nav-btn" onClick={() => setView('register')}>Sign Up</button>
      </div>

      {view === 'users' && <Users />}
      {view === 'manuscripts' && <Manuscripts />}
      {view === 'books' && <Books />}
      {view === 'login' && <Login />}
      {view === 'register' && <SignUp />}
    </div>
  );
}

export default App;
export const API_BASE = "http://tinostinostinos.pythonanywhere.com";
