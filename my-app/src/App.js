import React, { useState } from 'react';
import './App.css';
import Users from './Users.jsx';
import Manuscripts from './Manuscripts.jsx'; 

function App() {
  const [view, setView] = useState('users');

  return (
    <div>
		<div className="nav-buttons">
			<button className="nav-btn" onClick={() => setView('users')}>Show Users</button>
			<button className="nav-btn" onClick={() => setView('manuscripts')}>Show Manuscripts</button>
			<button className="nav-btn" onClick={() => setView('books')}>Show Books</button>
		</div>


      {view === 'users' && <Users />}
      {view === 'manuscripts' && <Manuscripts />}
	  {view === 'books' && <div>Books view coming soon...</div>}
      {/* Replace <div>... with <Books /> once that component exists */}
    </div>
  );
}

export default App;
