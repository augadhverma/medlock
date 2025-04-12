import React, { useState, useEffect } from 'react';
import './AdminComponents.css';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filterAction, setFilterAction] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  useEffect(() => {
    // Fetch audit logs
    const fetchLogs = async () => {
      try {
        // API call would go here
        // Using placeholder data
        setLogs([
          { 
            id: 1, 
            timestamp: '2025-04-12T10:30:45', 
            user: 'Dr. Smith', 
            action: 'document_upload', 
            details: 'Uploaded "Patient Assessment.pdf"',
            ip: '192.168.1.105'
          },
          { 
            id: 2, 
            timestamp: '2025-04-12T09:15:22', 
            user: 'John Doe', 
            action: 'document_view', 
            details: 'Viewed "Blood Test Results.pdf"',
            ip: '192.168.1.110'
          },
          { 
            id: 3, 
            timestamp: '2025-04-11T16:45:37', 
            user: 'Dr. Johnson', 
            action: 'document_share', 
            details: 'Shared "X-Ray Results.pdf" with Dr. Williams',
            ip: '192.168.1.108'
          },
          { 
            id: 4, 
            timestamp: '2025-04-11T11:22:18', 
            user: 'Admin', 
            action: 'user_create', 
            details: 'Created new user: jane@example.com',
            ip: '192.168.1.1'
          }
        ]);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      }
    };
    
    fetchLogs();
  }, []);
  
  const filteredLogs = logs.filter(log => {
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    
    let matchesDateRange = true;
    if (startDate && endDate) {
      const logDate = new Date(log.timestamp);
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDateRange = logDate >= start && logDate <= end;
    }
    
    return matchesAction && matchesDateRange;
  });
  
  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <div className="audit-logs">
      <h2>Audit Logs</h2>
      
      <div className="filters">
        <div className="action-filter">
          <label>Filter by action:</label>
          <select 
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
          >
            <option value="all">All Actions</option>
            <option value="document_upload">Document Upload</option>
            <option value="document_view">Document View</option>
            <option value="document_share">Document Share</option>
            <option value="user_create">User Create</option>
            <option value="user_update">User Update</option>
          </select>
        </div>
        
        <div className="date-filter">
          <label>From:</label>
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          
          <label>To:</label>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        
        <button className="export-btn">Export Logs</button>
      </div>
      
      <div className="logs-table">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td>{formatTimestamp(log.timestamp)}</td>
                <td>{log.user}</td>
                <td>
                  <span className={`action-badge ${log.action}`}>
                    {log.action.replace('_', ' ')}
                  </span>
                </td>
                <td>{log.details}</td>
                <td>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
