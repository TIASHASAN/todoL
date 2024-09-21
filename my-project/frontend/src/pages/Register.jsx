import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== reEnterPassword) {setError('Passwords do not match');
      return;}
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        username: name, email: email, password: password, });

      if (response.data.message === 'User registered successfully') {
        setSuccess('Registration successful!');
        setError('');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-orange-500 mb-6">
          Create an Account</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name input */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your name"/>
          </div>
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"/>
          </div>
          {/* Password input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"/>
          </div>
          {/* Re-enter password */}
          <div>
            <label htmlFor="reEnterPassword" className="block text-gray-700 font-medium mb-1">
              Re-enter Password
            </label>
            <input type="password" id="reEnterPassword" value={reEnterPassword} onChange={(e) => setReEnterPassword(e.target.value)} required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Re-enter your password"/>
          </div>
          {/* Submit button */}
          <button type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition">
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <span className="text-orange-500 cursor-pointer" onClick={() => navigate('/login')}>
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
