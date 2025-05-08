import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);     

  useEffect(() => {
    console.log('useEffect in Authontext')
    const stored = localStorage.getItem('token');
    setToken(stored ? stored : false);
    console.log('token:', token)
  }, []);


  const login  = jwt => { localStorage.setItem('token', jwt); setToken(jwt); };
  const logout = ()  => { localStorage.removeItem('token');   setToken(false); };

  return (
    <AuthCtx.Provider value={{ token, login, logout, isAuthed: (token)? true:false }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
