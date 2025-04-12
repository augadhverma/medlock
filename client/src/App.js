import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';
import Login from './components/Login';
import './styles.css';

// Placeholder Dashboard components
const PatientDashboard = () => <div>Patient Dashboard</div>;
const DoctorDashboard = () => <div>Doctor Dashboard</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;

// Protected Route component
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  const features = [
    {
      icon: "HIPAA",
      title: "HIPAA Compliant",
      description: "Fully adheres to HIPAA standards for data protection"
    },
    {
      icon: "Upload",
      title: "Encrypted Uploads",
      description: "Medical documents are protected with end-to-end encryption"
    },
    {
      icon: "Audit",
      title: "Audit Logging",
      description: "Comprehensive audit logs track access and sharing."
    }
  ];

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main>
                <HeroSection />
                <div className="features-container">
                  {features.map((feature, index) => (
                    <FeatureCard 
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  ))}
                </div>
              </main>
            </>
          } />
          
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/patient/dashboard" 
            element={
              <ProtectedRoute allowedRole="patient">
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/doctor/dashboard" 
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
