import React, { useState } from 'react';
import './DocumentComponents.css';

const DocumentList = ({ documents, userRole, patients, doctors, colleagues }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.patientName && doc.patientName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleDownload = (docId) => {
    // Handle document download with decryption
    console.log('Downloading document:', docId);
    // In a real app, this would initiate download with client-side decryption
  };
  
  const handleShare = (docId) => {
    // Handle document sharing
    console.log('Sharing document:', docId);
    // In a real app, this would open a sharing modal
  };
  
  return (
    <div className="document-list">
      <div className="list-header">
        <h2>
          {userRole === 'patient' ? 'My Documents' : 'Patient Documents'}
        </h2>
        <div className="document-search">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredDocuments.length === 0 ? (
        <div className="no-documents">
          <p>No documents found.</p>
        </div>
      ) : (
        <div className="documents-table">
          <table>
            <thead>
              <tr>
                <th>Document Name</th>
                {userRole === 'doctor' && <th>Patient</th>}
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map(doc => (
                <tr key={doc.id}>
                  <td className="document-name">{doc.name}</td>
                  {userRole === 'doctor' && <td>{doc.patientName}</td>}
                  <td>{doc.date}</td>
                  <td>
                    <span className="doc-status shared">
                      {doc.sharedWith && doc.sharedWith.length > 0 ? 'Shared' : 'Private'}
                    </span>
                  </td>
                  <td className="document-actions">
                    <button 
                      className="view-btn"
                      onClick={() => handleDownload(doc.id)}
                    >
                      View
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(doc.id)}
                    >
                      Share
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
