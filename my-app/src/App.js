import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Topbar       from './Topbar';
import Users        from './Users';
import Manuscripts  from './Manuscripts';
import Books        from './Books.jsx';
import Login        from './login.jsx';
import SignUp       from './signup';

import './App.css';

export const API_BASE =
  'http://tinostinostinos.pythonanywhere.com';

export default function App() {
  return (
    <BrowserRouter>
      <Topbar />

      <main className="content">
        <Routes>
          <Route path="/"            element={<Navigate to="/dashboard" replace />} />
          <Route path="/users"       element={<Users        />} />
          <Route path="/manuscripts" element={<Manuscripts  />} />
          <Route path="/books"       element={<Books        />} />
          <Route path="/login"       element={<Login        />} />
          <Route path="/signup"      element={<SignUp       />} />
          <Route path="*"            element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
