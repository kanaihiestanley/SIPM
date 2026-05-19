// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from './AuthContext';
// import { useNavigate } from 'react-router-dom';

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { user, isAuthenticated, token } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user is admin
//     if (!isAuthenticated || user?.category !== 1) {
//       navigate('/');
//       return;
//     }
//     fetchUsers();
//   }, [isAuthenticated, user, navigate]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5005/api/auth/users', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setError('Failed to load users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUserCategory = async (userId, category) => {
//     try {
//       await axios.put(
//         `http://localhost:5005/api/auth/users/${userId}/category`,
//         { category },
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       fetchUsers(); // Refresh list
//       alert('User updated successfully');
//     } catch (error) {
//       console.error('Error updating user:', error);
//       alert('Failed to update user');
//     }
//   };

//   if (loading) return <div className="text-center mt-5">Loading...</div>;

//   return (
//     <div className="container mt-4">
//       <div className="card">
//         <div className="card-header bg-primary text-white">
//           <h3>👥 User Management</h3>
//         </div>
//         <div className="card-body">
//           {error && <div className="alert alert-danger">{error}</div>}
//           <div className="table-responsive">
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Username</th>
//                   <th>Full Name</th>
//                   <th>Email</th>
//                   <th>Category</th>
//                   <th>Role</th>
//                   <th>Created At</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((u) => (
//                   <tr key={u.id}>
//                     <td>{u.id}</td>
//                     <td>{u.username}</td>
//                     <td>{u.fullname}</td>
//                     <td>{u.email}</td>
//                     <td>
//                       <span className={`badge ${u.category === 1 ? 'bg-danger' : 'bg-secondary'}`}>
//                         {u.category === 1 ? 'Admin' : 'User'}
//                       </span>
//                     </td>
//                     <td>{u.role}</td>
//                     <td>{new Date(u.created_at).toLocaleDateString()}</td>
//                     <td>
//                       {u.id !== user?.id && (
//                         <select
//                           className="form-select form-select-sm"
//                           value={u.category}
//                           onChange={(e) => updateUserCategory(u.id, parseInt(e.target.value))}
//                         >
//                           <option value={2}>User (Limited)</option>
//                           <option value={1}>Admin (Full)</option>
//                         </select>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;



// src/components/Login_Context/AdminUsers.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../Login_Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  // Wrap fetchUsers in useCallback to avoid dependency issues
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/auth/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.response?.data?.error || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // Check if user is admin
    if (!isAuthenticated || user?.category !== 1) {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [isAuthenticated, user, navigate, fetchUsers]); // Added fetchUsers to dependencies

  const updateUserCategory = async (userId, category) => {
    try {
      await axios.put(
        `http://localhost:5005/api/auth/users/${userId}/category`,
        { category },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      fetchUsers(); // Refresh list
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      alert(error.response?.data?.error || 'Failed to update user');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>
            <span role="img" aria-label="users">👥</span> User Management
          </h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Category</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.fullname}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.category === 1 ? 'bg-danger' : 'bg-secondary'}`}>
                        {u.category === 1 ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td>{u.role}</td>
                    <td>{new Date(u.created_at).toLocaleDateString()}</td>
                    <td>
                      {u.id !== user?.id && (
                        <select
                          className="form-select form-select-sm"
                          value={u.category}
                          onChange={(e) => updateUserCategory(u.id, parseInt(e.target.value))}
                        >
                          <option value={2}>User (Limited)</option>
                          <option value={1}>Admin (Full)</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;