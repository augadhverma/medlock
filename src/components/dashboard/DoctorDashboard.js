import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DocumentList from '../documents/DocumentList';
import DocumentUpload from '../documents/DocumentUpload';
import './Dashboard.css';

const DoctorDashboard = () => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [colleagues, setColleagues] = useState([]);
  const [activeTab, setActiveTab] = useState('patientDocuments');
  
  useEffect(() => {
    // Fetch doctor's documents and associated patients/colleagues
    const fetchData = async () => {
      try {
        // API calls would go here
        // For now, using placeholder data
        setDocuments([
          { id: 1, name: 'Patient A Medical History.pdf', patientName: 'John Doe', date: '2025-04-10' },
          { id: 2, name: 'Lab Results.pdf', patientName: 'Jane Smith', date: '2025-04-08' }
        ]);
        
        setPatients([
          { id: 201, name: 'John Doe', dateOfBirth: '1985-07-15' },
          { id: 202, name: 'Jane Smith', dateOfBirth: '1992-03-22' }
        ]);
        
        setColleagues([
          { id: 101, name: 'Dr. Williams', specialty: 'Radiology' },
          { id: 102, name: 'Dr. Brown', specialty: 'Oncology' }
        ]);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
    
    fetchData();
  }, [currentUser]);
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser?.name || 'Doctor'}</h1>
        <p>Manage your patients' medical documents securely</p>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'patientDocuments' ? 'active' : ''} 
          onClick={() => setActiveTab('patientDocuments')}
        >
          Patient Documents
        </button>
        <button 
          className={activeTab === 'upload' ? 'active' : ''} 
          onClick={() => setActiveTab('upload')}
        >
          Upload Document
        </button>
        <button 
          className={activeTab === 'patients' ? 'active' : ''} 
          onClick={() => setActiveTab('patients')}
        >
          My Patients
        </button>
        <button 
          className={activeTab === 'colleagues' ? 'active' : ''} 
          onClick={() => setActiveTab('colleagues')}
        >
          Colleagues
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'patientDocuments' && (
          <DocumentList 
            documents={documents} 
            userRole="doctor"
            patients={patients}
            colleagues={colleagues}
          />
        )}
        
        {activeTab === 'upload' && (
          <DocumentUpload 
            userRole="doctor"
            patients={patients}
            colleagues={colleagues}
          />
        )}
        
        {activeTab === 'patients' && (
          <div className="patients-list">
            <h2>My Patients</h2>
            {patients.map(patient => (
              <div key={patient.id} className="patient-card">
                <h3>{patient.name}</h3>
                <p>DOB: {patient.dateOfBirth}</p>
                <div className="patient-actions">
                  <button className="view-docs-button">View Documents</button>
                  <button className="share-button">Share Document</button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'colleagues' && (
          <div className="colleagues-list">
            <h2>My Colleagues</h2>
            {colleagues.map(colleague => (
              <div key={colleague.id} className="colleague-card">
                <h3>{colleague.name}</h3>
                <p>Specialty: {colleague.specialty}</p>
                <button className="share-button">Share Document</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
