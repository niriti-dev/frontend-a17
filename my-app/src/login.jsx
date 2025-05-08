import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from './config'
import { useAuth } from './auth/AuthContext';
import './login.css';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE}/auth/login`,
        { email, password },
        { headers: { 'Content-Type':'application/json' } }
      );
      login(res.data.token);           // save JWT
      navigate('/users', { replace:true });
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email"    placeholder="Email"    value={email}
               onChange={e=>setEmail(e.target.value)}    required />
        <input type="password" placeholder="Password" value={password}
               onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
