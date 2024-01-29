// utils/auth.js
import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Sample middleware function to check role
export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user; // Assuming user is attached to request object after authentication
    if (user && user.role === requiredRole) {
      next(); // User has required role, proceed to the next middleware or route handler
    } else {
      res.status(403).send('Forbidden'); // User does not have required role
    }
  };
};
