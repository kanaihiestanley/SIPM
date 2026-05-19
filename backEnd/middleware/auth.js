const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this';

// Verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

// Check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

// Role-based access control
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

// Category-based access control
const checkCategoryAccess = (requiredAction) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Category 1: Full access (post, edit, delete)
    if (req.user.category === 1) {
      return next();
    }
    
    // Category 2: Can only view and post, no edit/delete
    if (req.user.category === 2) {
      if (requiredAction === 'edit' || requiredAction === 'delete') {
        return res.status(403).json({ error: 'You do not have permission to edit or delete.' });
      }
      return next();
    }
    
    return res.status(403).json({ error: 'Access denied.' });
  };
};

module.exports = { authenticateToken, isAuthenticated, authorize, checkCategoryAccess, JWT_SECRET };