import React, { useState } from 'react';
import { encryptFile } from '../../utils/encryption';
import './DocumentComponents.css';

const DocumentUpload = ({ userRole, patients, colleagues, recipients }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Auto-fill document name from file name
      setDocumentName(file.name);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    setError('');
    
    try {
      // Simulate file encryption and upload with progress
      const encryptedFile = await encryptFile(selectedFile);
      
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // In a real app, this would send the encrypted file to the server
      console.log('Uploading encrypted file:', encryptedFile);
      console.log('Document name:', documentName);
      console.log('Selected recipients:', selectedRecipients);
      
      // Reset form after successful upload
      setSelectedFile(null);
      setDocumentName('');
      setSelectedRecipients([]);
      setUploadProgress(0);
      
      // Show success message or redirect
      alert('Document uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload document. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRecipientToggle = (id) => {
    setSelectedRecipients(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(recipientId => recipientId !== id);
      } else {
        return [...prevState, id];
      }
    });
  };
  
  return (
    <div className="document-upload">
      <h2>Upload Document</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="file">Select Document</label>
          <div className="file-input-wrapper">
            <input 
              type="file" 
              id="file" 
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <div className="file-input-info">
              {selectedFile ? (
                <span>{selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)</span>
              ) : (
                <span>No file selected</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="documentName">Document Name</label>
          <input 
            type="text"
            id="documentName"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            disabled={isUploading}
            required
          />
        </div>
        
        {userRole === 'patient' && recipients && (
          <div className="form-group">
            <label>Share with Doctors (Optional)</label>
            <div className="recipients-list">
              {recipients.map(doctor => (
                <div key={doctor.id} className="recipient-item">
                  <input 
                    type="checkbox"
                    id={`doctor-${doctor.id}`}
                    checked={selectedRecipients.includes(doctor.id)}
                    onChange={() => handleRecipientToggle(doctor.id)}
                    disabled={isUploading}
                  />
                  <label htmlFor={`doctor-${doctor.id}`}>
                    {doctor.name} ({doctor.specialty})
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {userRole === 'doctor' && (
          <>
            <div className="form-group">
              <label>Select Patient</label>
              <select disabled={isUploading} required>
                <option value="">-- Select Patient --</option>
                {patients?.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Share with Colleagues (Optional)</label>
              <div className="recipients-list">
                {colleagues?.map(colleague => (
                  <div key={colleague.id} className="recipient-item">
                    <input 
                      type="checkbox"
                      id={`colleague-${colleague.id}`}
                      checked={selectedRecipients.includes(colleague.id)}
                      onChange={() => handleRecipientToggle(colleague.id)}
                      disabled={isUploading}
                    />
                    <label htmlFor={`colleague-${colleague.id}`}>
                      {colleague.name} ({colleague.specialty})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {isUploading && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="progress-text">{uploadProgress}% Complete</div>
          </div>
        )}
        
        <button 
          type="submit" 
          className="upload-button"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;