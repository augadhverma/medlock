import React, { useState, useEffect } from 'react';
import './AdminComponents.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Fetch users data
    const fetchUsers = async () => {
      try {
        // API call would go here
        // Using placeholder data
        setUsers([
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'patient', status: 'active' },
          { id: 2, name: 'Dr. Smith', email: 'smith@example.com', role: 'doctor', status: 'active' },
          { id: 3, name: 'Jane Wilson', email: 'jane@example.com', role: 'patient', status: 'inactive' },
          { id: 4, name: 'Dr. Johnson', email: 'johnson@example.com', role: 'doctor', status: 'active' }
        ]);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers();
  }, []);
  
  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });
  
  return (
    <div className="user-management">
      <div className="management-header">
        <h2>User Management</h2>
        <button className="add-user-btn">+ Add New User</button>
      </div>
      
      <div className="filters">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="role-filter">
          <label>Filter by role:</label>
          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="patient">Patients</option>
            <option value="doctor">Doctors</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>
      
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="role-cell">
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="edit-btn">Edit</button>
                  <button className="status-toggle-btn">
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
