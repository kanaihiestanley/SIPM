const { Pool } = require('pg');
require('dotenv').config();



const pool = new Pool({
  user: 'postgres',
  password: '12345',   // change this
  host: 'localhost',
  port: 5432,
  database: 'sipmdb'
});


// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('✅ Successfully connected to PostgreSQL database');
    release();
  }
});

module.exports = pool;
