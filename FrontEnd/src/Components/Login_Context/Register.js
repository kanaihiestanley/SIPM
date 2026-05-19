// import React, { useState } from 'react';
// import { useAuth } from '../Login_Context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     fullname: '',
//     email: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       setLoading(false);
//       return;
//     }

//     const result = await register(formData);
    
//     if (result.success) {
//       navigate('/');
//     } else {
//       setError(result.error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header">
//               <h3>Register</h3>
//             </div>
//             <div className="card-body">
//               {error && (
//                 <div className="alert alert-danger">{error}</div>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="fullname"
//                     value={formData.fullname}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Username</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                   <small className="text-muted">Password must be at least 6 characters</small>
//                 </div>
//                 <button 
//                   type="submit" 
//                   className="btn btn-primary w-100"
//                   disabled={loading}
//                 >
//                   {loading ? 'Registering...' : 'Register'}
//                 </button>
//               </form>
//               <div className="mt-3 text-center">
//                 <p>Already have an account? <a href="/login">Login here</a></p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Login_Context/AuthContext';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullname: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  const { user, isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin (Category 1)
  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!isAuthenticated) {
        // Not logged in, redirect to login
        navigate('/login');
        return;
      }
      
      if (user?.category !== 1) {
        // Logged in but not admin
        setError('Access Denied: Only administrators can register new users.');
        setIsAuthorized(false);
        setCheckingAuth(false);
        // Redirect after 3 seconds
        setTimeout(() => navigate('/'), 3000);
        return;
      }
      
      // User is admin
      setIsAuthorized(true);
      setCheckingAuth(false);
    };
    
    checkAdminAccess();
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Include admin token in the request
      const response = await axios.post(
        'http://localhost:5005/api/auth/register', 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        alert(`User "${formData.username}" has been registered successfully!`);
        setFormData({
          username: '',
          password: '',
          fullname: '',
          email: ''
        });
        // Optionally redirect to user management page
        // navigate('/admin/users');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (checkingAuth) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Verifying access...</p>
      </div>
    );
  }

  // Show unauthorized message
  if (!isAuthorized) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4><span role="img" aria-label="warning">⚠️</span> Access Denied</h4>
          <p>{error}</p>
          <p>You will be redirected to the home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <span role="img" aria-label="register">📝</span> Register New User
              </h3>
              <small className="text-white-50">Administrator access only</small>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Username *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">Password must be at least 6 characters</small>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register New User'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;