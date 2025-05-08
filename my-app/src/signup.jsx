import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from './config';
import './login.css';

function SignUp() {
  // State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    affiliation: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const { name, email, password, affiliation } = formData;
    
    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!affiliation) {
      newErrors.affiliation = 'Affiliation is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    const AUTHOR_CODE = 'AU';
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      affiliation: formData.affiliation,
      roles: [AUTHOR_CODE]
    };
  
    try {
      const response = await axios.post(
        `${API_BASE}/people/create`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setFormData({
        name: '',
        email: '',
        password: '',
        affiliation: ''
      });
      
      alert('Sign-up successful! Please log in.');
      navigate('/login', { replace: true });

    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setErrors({ form: 'Please fill in all fields correctly' });
            break;
          case 409:
            setErrors({ email: 'This email is already registered' });
            break;
          case 422:
            setErrors({ form: err.response.data.message || 'Invalid input data' });
            break;
          default:
            setErrors({ form: 'An error occurred. Please try again.' });
        }
      } else if (err.request) {
        setErrors({ form: 'Cannot connect to server. Please check your internet connection.' });
      } else {
        setErrors({ form: 'An unexpected error occurred.' });
      }
      console.error('Sign-up error:', err);
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
      <h2>Sign Up</h2>
      
      {errors.form && (
        <div className="error-message">{errors.form}</div>
      )}

      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
          {errors.name && (
            <div className="error-message">{errors.name}</div>
          )}
        </div>

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

        <div className="form-group">
          <input
            type="text"
            name="affiliation"
            placeholder="Affiliation"
            value={formData.affiliation}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
          {errors.affiliation && (
            <div className="error-message">{errors.affiliation}</div>
          )}
        </div>

        <p className="info-text">
          Note: All users are registered as <strong>Author</strong>. Additional roles can be requested after login.
        </p>

        <button 
          type="submit" 
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <div className="auth-links">
          <span>Already have an account?</span>
          <a href="/login">Login here</a>
        </div>
      </form>
    </div>
  );
}

export default SignUp;