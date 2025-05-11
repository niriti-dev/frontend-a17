import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });     

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem('userData');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    console.log('Token changed:', token);
  }, [token]);

  useEffect(() => {
    console.log('User data changed:', userData);
  }, [userData]);

  const login = (jwt, user = null) => { 
    console.log('Login called with user data:', user);
    localStorage.setItem('token', jwt);
    setToken(jwt);
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
      setUserData(user);
    }
  };
  
  const logout = () => { 
    localStorage.removeItem('token');   
    localStorage.removeItem('userData');
    setToken(null);
    setUserData(null);
  };

  return (
    <AuthCtx.Provider value={{ 
      token, 
      userData, 
      login, 
      logout, 
      isAuthed: Boolean(token) 
    }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
