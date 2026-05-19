import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="container mt-5 text-center">
      <div className="alert alert-danger">
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    </div>
  );
};

export default Unauthorized;