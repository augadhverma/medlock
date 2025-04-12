import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DocumentList from '../documents/DocumentList';
import DocumentUpload from '../documents/DocumentUpload';
import './Dashboard.css';

const PatientDashboard = () => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [activeTab, setActiveTab] = useState('myDocuments');
  
  useEffect(() => {
    // Fetch patient's documents and associated doctors
    const fetchData = async () => {
      try {
        // API calls would go here
        // For now, using placeholder data
        setDocuments([
          { id: 1, name: 'Blood Test Results.pdf', date: '2025-04-05', sharedWith: ['Dr. Smith'] },
          { id: 2, name: 'X-Ray Report.pdf', date: '2025-03-22', sharedWith: [] }
        ]);
        
        setDoctors([
          { id: 101, name: 'Dr. Smith', specialty: 'Cardiology' },
          { id: 102, name: 'Dr. Johnson', specialty: 'Neurology' }
        ]);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    
    fetchData();
  }, [currentUser]);
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser?.name || 'Patient'}</h1>
        <p>Manage your medical documents securely</p>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'myDocuments' ? 'active' : ''} 
          onClick={() => setActiveTab('myDocuments')}
        >
          My Documents
        </button>
        <button 
          className={activeTab === 'upload' ? 'active' : ''} 
          onClick={() => setActiveTab('upload')}
        >
          Upload Document
        </button>
        <button 
          className={activeTab === 'myDoctors' ? 'active' : ''} 
          onClick={() => setActiveTab('myDoctors')}
        >
          My Doctors
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'myDocuments' && (
          <DocumentList 
            documents={documents} 
            userRole="patient"
            doctors={doctors}
          />
        )}
        
        {activeTab === 'upload' && (
          <DocumentUpload 
            userRole="patient"
            recipients={doctors}
          />
        )}
        
        {activeTab === 'myDoctors' && (
          <div className="doctors-list">
            <h2>My Healthcare Providers</h2>
            {doctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <h3>{doctor.name}</h3>
                <p>Specialty: {doctor.specialty}</p>
                <button className="share-button">Share Documents</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
