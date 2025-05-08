import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { API_BASE } from './config'

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [affiliation, setAffiliation] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    const roles = ['Author'];
  
    const userData = {
      email,
      password,
      affiliation,
      roles
    };
  
    try {
      const response = await axios.post(`${API_BASE}/people/create`, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response)

      alert('Sign-up successful!');
      setEmail('');
      setPassword('');
      setAffiliation('');

    } catch (error) {
      console.error('Error during sign-up:', error);
      if (error.response) {
        alert('Error: ' + error.response.data.message);
      } else {
        alert('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Affiliation"
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
          required
        />

        <p style={{ fontSize: '0.9rem', color: '#555' }}>
          Note: All users are registered as <strong>Author</strong>. Additional roles can be requested after login.
        </p>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;