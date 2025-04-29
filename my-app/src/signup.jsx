import React, { useState } from 'react';
import './login.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [affiliation, setAffiliation] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    const roles = ['Author']; // always assigned

    console.log('Signing up with:', {
      email,
      password,
      affiliation,
      roles
    });

    // Submit to backend
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