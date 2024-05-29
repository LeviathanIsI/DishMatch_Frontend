import React, { useState } from 'react';
import apiFetch from '../api/fetch';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFetch('/users/register', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
      });
      localStorage.setItem('token', response.token);
      setMessageType('success');
      setMessage('User registered successfully!');
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessageType('error');
      setMessage('Error registering user: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && (
        <p style={{ color: messageType === 'success' ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;
