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

  const login = (jwt, user = null) => { 
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

  const updateUserData = (user) => {
    localStorage.setItem('userData', JSON.stringify(user));
    setUserData(user);
  };

  return (
    <AuthCtx.Provider value={{ 
      token, 
      userData, 
      login, 
      logout, 
      updateUserData,
      isAuthed: Boolean(token) 
    }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
