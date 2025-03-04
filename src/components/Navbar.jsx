import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-check-circle"></i>
          <span>TodoMaster</span>
        </Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
        </button>
      </div>
      <div className={`navbar-menu ${isOpen ? 'is-open' : ''}`}>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className={`nav-link ${isActive('/login')}`}>Login</Link>
            <Link to="/register" className={`nav-link ${isActive('/register')}`}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/todos" className={`nav-link ${isActive('/todos')}`}>My Todos</Link>
            <button onClick={handleLogout} className="nav-link logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
