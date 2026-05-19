// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   // Set up axios interceptor for authentication
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       fetchUser();
//     } else {
//       setLoading(false);
//     }
//   }, [token]);

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get('http://localhost:5005/api/auth/me');
//       setUser(response.data);
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       logout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('http://localhost:5005/api/auth/login', {
//         username,
//         password
//       });
      
//       const { token: newToken, user: userData } = response.data;
      
//       localStorage.setItem('token', newToken);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//       setToken(newToken);
//       setUser(userData);
      
//       return { success: true };
//     } catch (error) {
//       return { 
//         success: false, 
//         error: error.response?.data?.error || 'Login failed' 
//       };
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const response = await axios.post('http://localhost:5005/api/auth/register', userData);
      
//       const { token: newToken, user: newUser } = response.data;
      
//       localStorage.setItem('token', newToken);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//       setToken(newToken);
//       setUser(newUser);
      
//       return { success: true };
//     } catch (error) {
//       return { 
//         success: false, 
//         error: error.response?.data?.error || 'Registration failed' 
//       };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//     setToken(null);
//     setUser(null);
//   };

//   const hasPermission = (action) => {
//     if (!user) return false;
    
//     // Category 1: Full access
//     if (user.category === 1) return true;
    
//     // Category 2: Can only view and create, no edit/delete
//     if (user.category === 2) {
//       if (action === 'edit' || action === 'delete') return false;
//       return true;
//     }
    
//     return false;
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       loading,
//       login,
//       register,
//       logout,
//       hasPermission,
//       isAuthenticated: !!user
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Move fetchUser outside useEffect and memoize it with useCallback
  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token, fetchUser]); // Add fetchUser to dependencies

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5005/api/auth/login', {
        username,
        password
      });
      
      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setToken(newToken);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5005/api/auth/register', userData);
      
      const { token: newToken, user: newUser } = response.data;
      
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setToken(newToken);
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  const hasPermission = (action) => {
    if (!user) return false;
    
    // Category 1 (Admin): Full access
    if (user.category === 1) return true;
    
    // Category 2 (User): Can only create and view
    if (user.category === 2) {
      if (action === 'edit' || action === 'delete') return false;
      return true;
    }
    
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      hasPermission,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};