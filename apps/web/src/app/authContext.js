// AuthContext.js
'use client';
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Perform login logic (e.g., send login request to backend)
    // If login is successful, set isAuthenticated to true
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform logout logic (e.g., clear authentication token)
    // Set isAuthenticated to false
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
