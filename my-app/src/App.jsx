// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

import AuthTopbar  from './navs/AuthTopar';
import GuestTopbar from './navs/GuestTopbar';

import Users       from './Users';
import Manuscripts from './manuscripts/Manuscripts';
import Books       from './Books';
import Login       from './Login';
import SignUp      from './signup';

// export const API_BASE = 'http://tinostinostinos.pythonanywhere.com';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthed } = useAuth();   

  return (
    <>
      {isAuthed ? <AuthTopbar /> : <GuestTopbar />}

      <Routes>
        {/* public */}
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/users"       element={<Users />} />
          <Route path="/manuscripts" element={<Manuscripts />} />
          <Route path="/books"       element={<Books />} />
          <Route path="/"            element={<Navigate to="/users" />} />
        </Route>
      </Routes>
    </>
  );
}
