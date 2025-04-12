import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Secure Medical Document Exchange</h1>
        <p className="hero-description">
          A privacy-focused platform for patients and healthcare professionals to share medical records safely.
        </p>
        <Link to="/login" className="get-started-btn">
          Get Started
        </Link>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon hipaa-icon">HIPAA</div>
          <h3>HIPAA Compliant</h3>
          <p>Fully adheres to HIPAA standards for data protection</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon encrypt-icon">↑</div>
          <h3>Encrypted Uploads</h3>
          <p>Medical documents are protected with end-to-end encryption</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon audit-icon">⏱</div>
          <h3>Audit Logging</h3>
          <p>Comprehensive audit logs track access and sharing</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
