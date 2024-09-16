import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignImg from '../assets/SignImg.jpg';
import { signup } from '../api/api.js';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');  // Clear previous error

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(email, password);
      // Optionally redirect or handle successful registration
    } catch (error) {
      setError(error.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '50%', boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)', borderRadius: '8px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ flex: 1, padding: '2rem' }}>
          <img src={SignImg} alt="Sign Up" style={{ width: '100%', borderRadius: '8px 0 0 8px' }} />
        </div>
        <div style={{ flex: 1, padding: '2rem' }}>
          <h2>Sign Up</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSignUp}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              />
            </div>
            <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}>
              Register
            </button>
          </form>
          <p style={{ marginTop: '1rem' }}>
            Already have an account? <Link to="/signin">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
