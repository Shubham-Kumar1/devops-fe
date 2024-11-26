import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  console.log(`Hostname hai ${process.env.REACT_APP_BACKENDHOST}`);
  
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://${process.env.REACT_APP_BACKENDHOST}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

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
          placeholder="Name"
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
