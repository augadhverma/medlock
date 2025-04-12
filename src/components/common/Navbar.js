import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">🔒</div>
          <span>MedLock</span>
        </Link>
        
        <div className="navbar-links">
          {!currentUser && (
            <>
              <Link to="/features" className="nav-link">Features</Link>
              <Link to="/login" className="nav-link login-link">Login</Link>
            </>
          )}
          
          {currentUser && (
            <>
              {currentUser.role === 'patient' && (
                <Link to="/patient-dashboard" className="nav-link">Dashboard</Link>
              )}
              
              {currentUser.role === 'doctor' && (
                <Link to="/doctor-dashboard" className="nav-link">Dashboard</Link>
              )}
              
              {currentUser.role === 'admin' && (
                <Link to="/admin-dashboard" className="nav-link">Dashboard</Link>
              )}
              
              <div className="user-menu">
                <span className="user-name">{currentUser.name}</span>
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
