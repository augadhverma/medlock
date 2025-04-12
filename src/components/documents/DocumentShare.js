import React, { useState, useEffect } from 'react';
import './DocumentComponents.css';

const DocumentShare = ({ document, userRole, onClose, recipients }) => {
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const handleRecipientToggle = (id) => {
    setSelectedRecipients(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(recipientId => recipientId !== id);
      } else {
        return [...prevState, id];
      }
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedRecipients.length === 0) {
      alert('Please select at least one recipient');
      return;
    }
    
    setIsSending(true);
    
    try {
      // In a real app, this would call an API to share the document
      console.log('Sharing document:', document.id);
      console.log('Recipients:', selectedRecipients);
      console.log('Message:', message);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onClose();
      alert('Document shared successfully!');
    } catch (error) {
      console.error('Error sharing document:', error);
      alert('Failed to share document. Please try again.');
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="document-share">
      <div className="share-header">
        <h3>Share Document</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="document-info">
        <p><strong>Document:</strong> {document.name}</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Recipients</label>
          <div className="recipients-list">
            {recipients.map(recipient => (
              <div key={recipient.id} className="recipient-item">
                <input 
                  type="checkbox"
                  id={`recipient-${recipient.id}`}
                  checked={selectedRecipients.includes(recipient.id)}
                  onChange={() => handleRecipientToggle(recipient.id)}
                  disabled={isSending}
                />
                <label htmlFor={`recipient-${recipient.id}`}>
                  {recipient.name} 
                  {recipient.specialty && `(${recipient.specialty})`}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="shareMessage">Message (Optional)</label>
          <textarea
            id="shareMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSending}
            placeholder="Add a message to recipients..."
            rows={3}
          />
        </div>
        
        <div className="share-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={onClose}
            disabled={isSending}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="share-btn"
            disabled={isSending}
          >
            {isSending ? 'Sharing...' : 'Share Document'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentShare;
