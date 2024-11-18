import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const hostName = process.env.REACT_APP_HOST_NAME;
const PORT = process.env.REACT_APP_PORT;

console.log(`host is ${hostName}`)
console.log(`port is ${PORT}`)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://${hostName}:${PORT}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/todos';
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form className="form-container" onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <Link to="/register" className="link">Don't have an account? Register</Link>
    </div>
  );
};

export default Login;
