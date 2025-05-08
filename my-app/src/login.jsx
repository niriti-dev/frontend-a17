import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from './config';
import { useAuth } from './auth/AuthContext';
import './login.css';

export default function Login() {
  // State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const { email, password } = formData;

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE}/auth/login`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      login(response.data.token);
      navigate('/users', { replace: true });
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setErrors({ form: 'Invalid email or password' });
            break;
          case 400:
            setErrors({ form: 'Please fill in all fields' });
            break;
          default:
            setErrors({ form: 'An error occurred. Please try again.' });
        }
      } else if (err.request) {
        setErrors({ form: 'Cannot connect to server. Please check your internet connection.' });
      } else {
        setErrors({ form: 'An unexpected error occurred.' });
      }
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="auth-container">
      <h2>Log In</h2>

      {errors.form && (
        <div className="error-message">{errors.form}</div>
      )}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
          {errors.email && (
            <div className="error-message">{errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="auth-links">
          <span>Don't have an account?</span>
          <a href="/signup">Sign Up</a>
        </div>
      </form>
    </div>
  );
} 