import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const hostName=process.env.REACT_APP_HOST_NAME
const PORT = process.env.REACT_APP_PORT;

const Register = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://${hostName}:${PORT}/api/auth/register`, { name, email, password });
      // Redirect to login page on successful registration
      window.location.href = '/login';
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form className="form-container" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
      <Link to="/login" className="link">Already a member? Login</Link>
    </div>
  );
};

export default Register;
