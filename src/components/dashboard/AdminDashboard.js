import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserManagement from '../admin/UserManagement';
import AuditLogs from '../admin/AuditLogs';
import './Dashboard.css';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('userManagement');
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>System management and security monitoring</p>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'userManagement' ? 'active' : ''} 
          onClick={() => setActiveTab('userManagement')}
        >
          User Management
        </button>
        <button 
          className={activeTab === 'auditLogs' ? 'active' : ''} 
          onClick={() => setActiveTab('auditLogs')}
        >
          Audit Logs
        </button>
        <button 
          className={activeTab === 'systemSettings' ? 'active' : ''} 
          onClick={() => setActiveTab('systemSettings')}
        >
          System Settings
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'userManagement' && <UserManagement />}
        {activeTab === 'auditLogs' && <AuditLogs />}
        {activeTab === 'systemSettings' && (
          <div className="system-settings">
            <h2>System Settings</h2>
            <form className="settings-form">
              <div className="form-group">
                <label>Document Retention Period (days)</label>
                <input type="number" defaultValue={365} />
              </div>
              <div className="form-group">
                <label>Session Timeout (minutes)</label>
                <input type="number" defaultValue={30} />
              </div>
              <div className="form-group">
                <label>Encryption Algorithm</label>
                <select defaultValue="aes256">
                  <option value="aes256">AES-256</option>
                  <option value="aes128">AES-128</option>
                </select>
              </div>
              <button type="submit" className="save-button">Save Settings</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
