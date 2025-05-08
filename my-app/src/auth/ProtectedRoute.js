import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute() {
  const { token } = useAuth();

  if (token === null) return null;          
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
