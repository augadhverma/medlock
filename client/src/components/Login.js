import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../logo.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store token and user info in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', role);
      
      // Redirect based on role
      switch (role) {
        case 'patient':
          navigate('/patient/dashboard');
          break;
        case 'doctor':
          navigate('/doctor/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
      
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <a href="/" className='nav-link'><div className="login-header">
          <img src={logo} alt="MedLock Logo" className="login-logo" />
          <h1>MedLock Pro</h1>
        </div>
        </a>
        <h2>Sign In</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          
          <div className="form-group">
            <label>Logging in as</label>
            <div className="role-selector">
              <div className={`role-option ${role === 'patient' ? 'active' : ''}`}>
                <input
                  type="radio"
                  id="patient"
                  name="role"
                  value="patient"
                  checked={role === 'patient'}
                  onChange={() => setRole('patient')}
                />
                <label htmlFor="patient">Patient</label>
              </div>
              
              <div className={`role-option ${role === 'doctor' ? 'active' : ''}`}>
                <input
                  type="radio"
                  id="doctor"
                  name="role"
                  value="doctor"
                  checked={role === 'doctor'}
                  onChange={() => setRole('doctor')}
                />
                <label htmlFor="doctor">Doctor</label>
              </div>
              
              <div className={`role-option ${role === 'admin' ? 'active' : ''}`}>
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                />
                <label htmlFor="admin">Admin</label>
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          <a href="#forgot-password">Forgot Password?</a>
          <a href="#register">New User? Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
