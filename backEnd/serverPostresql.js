const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const pool = require('./db');
const path = require('path');


const app = express();
const port = 5005;


// ✅ Add this to fix SSL certificate issues
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Add cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// ✅ IMPORT the gallery routes - MAKE SURE THIS EXISTS
const galleryPostRoutes = require('./routes/galleryPostRoutes'); // Adjust path as needed
const flyerPostRoutes = require('./routes/flyerPostRoutes');
const authRoutes = require('./routes/authRoutes');

// Your existing routes
app.use('/api/biblePosts', require('./routes/biblePostresqlRoute'));
app.use('/api/gallery', require('./routes/galleryPostRoutes'));
app.use('/api/flyers', flyerPostRoutes);
app.use('/api/auth', authRoutes);



app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Server is running',
      database_time: result.rows[0]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database connection error" });
  }
});

app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // ✅ Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: "Name, email, and message are required" 
    });
  }

  // ✅ Better configuration with TLS options
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "itropicalstan@gmail.com",
      pass: process.env.EMAIL_PASS || "stanley1500",
    },
    tls: {
      rejectUnauthorized: false  // ✅ Allow self-signed certificates
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "itropicalstan@gmail.com",
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nMessage: ${message}`,
    replyTo: email,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Detailed email error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Failed to send email" 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});