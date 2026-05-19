// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../Login_Context/AuthContext';

// const ProtectedRoute = ({ children, requiredAction }) => {
//   const { isAuthenticated, hasPermission, loading } = useAuth();

//   if (loading) {
//     return <div className="text-center mt-5">Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (requiredAction && !hasPermission(requiredAction)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;
// };

// export default ProtectedRoute;




// src/components/Login_Context/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Login_Context/AuthContext'; // Fixed path

const ProtectedRoute = ({ children, requiredCategory = null }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check for specific category requirement
  if (requiredCategory !== null && user?.category !== requiredCategory) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;