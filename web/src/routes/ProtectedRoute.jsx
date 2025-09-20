import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // 1. Check if the user is authenticated
  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back there after they log in.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check if the user has the required role
  // The `allowedRoles` prop is an array of roles (e.g., ['Admin', 'Staff'])
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have access.
    // You could redirect to a specific "Unauthorized" page or back to a safe page.
    // For simplicity, we'll send citizens to their dashboard and others to the landing page.
    return <Navigate to={user.role === 'Citizen' ? '/dashboard' : '/'} replace />;
  }

  // 3. If everything is fine, render the component they were trying to access
  return children;
};

export default ProtectedRoute;