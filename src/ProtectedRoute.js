import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // Ensure Navigate is imported
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ role, children }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
