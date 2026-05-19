// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const pool = require('../db');
// const { authenticateToken, JWT_SECRET } = require('../middleware/auth');

// const router = express.Router();

// // REGISTER
// router.post('/register', async (req, res) => {
//   const { username, password, fullname, email } = req.body;
  
//   // Validation
//   if (!username || !password || !fullname || !email) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }
  
//   if (password.length < 6) {
//     return res.status(400).json({ error: 'Password must be at least 6 characters' });
//   }
  
//   try {
//     // Check if user exists
//     const existingUser = await pool.query(
//       'SELECT * FROM users WHERE username = $1 OR email = $2',
//       [username, email]
//     );
    
//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({ error: 'Username or email already exists' });
//     }
    
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Create user (default category 2)
//     const result = await pool.query(
//       `INSERT INTO users (username, password, fullname, email, category, role)
//        VALUES ($1, $2, $3, $4, $5, $6)
//        RETURNING id, username, fullname, email, category, role, created_at`,
//       [username, hashedPassword, fullname, email, 2, 'user']
//     );
    
//     // Create token
//     const token = jwt.sign(
//       { 
//         id: result.rows[0].id, 
//         username: result.rows[0].username, 
//         fullname: result.rows[0].fullname,
//         email: result.rows[0].email,
//         category: result.rows[0].category,
//         role: result.rows[0].role
//       },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );
    
//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully',
//       user: result.rows[0],
//       token
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // LOGIN
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
  
//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required' });
//   }
  
//   try {
//     // Find user
//     const result = await pool.query(
//       'SELECT * FROM users WHERE username = $1',
//       [username]
//     );
    
//     if (result.rows.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
    
//     const user = result.rows[0];
    
//     // Check password
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
    
//     // Update last login
//     await pool.query(
//       'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
//       [user.id]
//     );
    
//     // Create token
//     const token = jwt.sign(
//       { 
//         id: user.id, 
//         username: user.username, 
//         fullname: user.fullname,
//         email: user.email,
//         category: user.category,
//         role: user.role
//       },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );
    
//     res.json({
//       success: true,
//       message: 'Login successful',
//       user: {
//         id: user.id,
//         username: user.username,
//         fullname: user.fullname,
//         email: user.email,
//         category: user.category,
//         role: user.role
//       },
//       token
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // GET CURRENT USER (Protected)
// router.get('/me', authenticateToken, async (req, res) => {
//   try {
//     const result = await pool.query(
//       'SELECT id, username, fullname, email, category, role, created_at, last_login FROM users WHERE id = $1',
//       [req.user.id]
//     );
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }
    
//     res.json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // LOGOUT
// router.post('/logout', (req, res) => {
//   res.json({ success: true, message: 'Logged out successfully' });
// });

// // GET ALL USERS (Admin only)
// router.get('/users', authenticateToken, async (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Admin access required' });
//   }
  
//   try {
//     const result = await pool.query(
//       'SELECT id, username, fullname, email, category, role, is_active, created_at, last_login FROM users ORDER BY created_at DESC'
//     );
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // UPDATE USER CATEGORY (Admin only)
// router.put('/users/:id/category', authenticateToken, async (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Admin access required' });
//   }
  
//   const { id } = req.params;
//   const { category } = req.body;
  
//   if (!category || (category !== 1 && category !== 2)) {
//     return res.status(400).json({ error: 'Category must be 1 or 2' });
//   }
  
//   try {
//     const result = await pool.query(
//       'UPDATE users SET category = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, username, fullname, email, category',
//       [category, id]
//     );
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }
    
//     res.json({ success: true, user: result.rows[0] });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;











// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { authenticateToken, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// REGISTER - Only accessible by admin (add admin check)
router.post('/register', authenticateToken, async (req, res) => {
  // Check if requester is admin
  if (req.user.role !== 'admin' && req.user.category !== 1) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { username, password, fullname, email, category = 2 } = req.body;
  
  if (!username || !password || !fullname || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  
  try {
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      `INSERT INTO users (username, password, fullname, email, category, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, username, fullname, email, category, role, created_at`,
      [username, hashedPassword, fullname, email, category, 'user']
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// LOGIN - Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND is_active = true',
      [username]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    await pool.query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );
    
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        fullname: user.fullname,
        email: user.email,
        category: user.category,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        category: user.category,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET CURRENT USER
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, fullname, email, category, role, created_at, last_login FROM users WHERE id = $1',
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// GET ALL USERS - Admin only
router.get('/users', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.category !== 1) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  try {
    const result = await pool.query(
      'SELECT id, username, fullname, email, category, role, is_active, created_at, last_login FROM users ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE USER CATEGORY - Admin only
router.put('/users/:id/category', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.category !== 1) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  const { id } = req.params;
  const { category } = req.body;
  
  if (!category || (category !== 1 && category !== 2)) {
    return res.status(400).json({ error: 'Category must be 1 or 2' });
  }
  
  try {
    const result = await pool.query(
      'UPDATE users SET category = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, username, fullname, email, category',
      [category, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;