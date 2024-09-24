import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignImg from '../assets/SignImg.jpg';
import { signin } from '../api/api.js';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await signin(email, password);
      navigate('/dashboard');  // Redirect to dashboard on successful login
    } catch (error) {
      setError(error.response?.data?.message || 'Error logging in');  // Handle login error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 md:p-10 lg:p-12">
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-semibold text-center mb-6">Log In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-0 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Log In
          </button>
        </div>
        <div className="text-center">
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/signup">
            Don't have an account? Sign Up
          </a>
        </div>
      </form>
    </div>
  </div>
  );
};

export default SignIn;
