import React, { useState } from 'react';
import axios from 'axios';
import './css/LoginPage.css';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null); // Initialize isLoggedIn state

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Make API request
    axios
      .post('https://ph-django.vercel.app/signin/', { email, password })
      .then((response) => {
        // Handle successful sign-in
        console.log('User signed in successfully:', response.data);
        localStorage.setItem('user_id', response.data.user_id);
        // Perform any desired actions after successful sign-in
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsLoggedIn(true); // Update the isLoggedIn state to true
        navigate('/assesment', { replace: true });
      })
      .catch((error) => {
        // Handle sign-in error
        console.error('Sign-in error:', error.response.data);
        setError('Invalid email or password. Please try again.');
      });
  };

  return (
    <div>
      <div className="login-page">
        <div className="login-box">
          <h2 className="login-heading">Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="label">Email:</label>
              <input className="input" type="email" value={email} onChange={handleEmailChange} required />
            </div>
            <div className="form-group">
              <label className="label">Password:</label>
              <input className="input" type="password" value={password} onChange={handlePasswordChange} required />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="login-button" type="submit">Sign In</button>
            <p className="signup-text">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
