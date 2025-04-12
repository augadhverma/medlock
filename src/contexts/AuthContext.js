import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // In a real app, this would check for a valid token in localStorage
        // or make an API call to verify the session
        const storedUser = localStorage.getItem('medlock_user');
        
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('medlock_user');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // Login function
  const login = async (email, password) => {
    // In a real app, this would make an API call to authenticate
    
    // Simulate API call for demo
    // This would be replaced with actual authentication logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo user data - in a real app, this would come from the server
        let userData;
        
        if (email === 'patient@example.com' && password === 'password') {
          userData = {
            id: 1,
            name: 'John Doe',
            email: 'patient@example.com',
            role: 'patient'
          };
        } else if (email === 'doctor@example.com' && password === 'password') {
          userData = {
            id: 2,
            name: 'Dr. Smith',
            email: 'doctor@example.com',
            role: 'doctor'
          };
        } else if (email === 'admin@example.com' && password === 'password') {
          userData = {
            id: 3,
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin'
          };
        } else {
          return reject(new Error('Invalid email or password'));
        }
        
        // Store user data in state and localStorage
        setCurrentUser(userData);
        localStorage.setItem('medlock_user', JSON.stringify(userData));
        
        resolve(userData);
      }, 1000); // Simulate network delay
    });
  };
  
  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('medlock_user');
  };
  
  const value = {
    currentUser,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
