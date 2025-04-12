import React from 'react';
import logo from '../logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
      <a href="/"><img src={logo} alt="MedLock Logo" className="logo-icon" /></a>
        <a href="/" className='nav-link'><span className="logo-text">MedLock </span><span className='logo-text pro'>Pro</span></a>
      </div>
      <nav className="navigation">
        <a href="#features" className="nav-link">Features</a>
        <a href="/login" className="nav-link login-link">Login</a>
      </nav>
    </header>
  );
}

export default Header;
