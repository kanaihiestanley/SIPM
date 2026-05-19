const express = require('express');
const biblePosts = express.Router();
const pool = require('../db');

// CREATE biblePost
biblePosts.post('/', async (req, res) => {
  try {
    const { title, description, bible_verse } = req.body;
    
    const newbiblePost = await pool.query(
      `INSERT INTO bible_posts (title, description, bible_verse)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, description, bible_verse]
    );
    
    res.status(201).json(newbiblePost.rows[0]);
  } catch (err) {
    console.error("CREATE biblePost ERROR:", err.message);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// GET all biblePosts
biblePosts.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bible_posts ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error("GET biblePosts ERROR:", err.message);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// GET single biblePost
biblePosts.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM bible_posts WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "biblePost not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET biblePost ERROR:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// UPDATE biblePost
biblePosts.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, bible_verse } = req.body;
    
    const update = await pool.query(
      `UPDATE bible_posts
       SET title = $1, 
           description = $2, 
           bible_verse = $3, 
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [title, description, bible_verse, id]
    );
    
    if (update.rows.length === 0) {
      return res.status(404).json({ error: "biblePost not found" });
    }
    
    res.json(update.rows[0]);
  } catch (err) {
    console.error("UPDATE biblePost ERROR:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// DELETE biblePost
biblePosts.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletebiblePost = await pool.query(
      'DELETE FROM bible_posts WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (deletebiblePost.rows.length === 0) {
      return res.status(404).json({ error: "biblePost not found" });
    }
    
    res.json({ message: "biblePost deleted successfully" });
  } catch (err) {
    console.error("DELETE biblePost ERROR:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = biblePosts;