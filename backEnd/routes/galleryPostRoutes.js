// const express = require('express');
// const galleryPostRoutes = express.Router();
// const pool = require('../db');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // ========== CONFIGURE MULTER FOR MULTIPLE IMAGE UPLOADS ==========

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, '../uploads/gallery');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     // Create unique filename: timestamp-randomnumber-originalname
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     cb(null, `gallery-${uniqueSuffix}${ext}`);
//   }
// });

// // File filter for images only
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|webp/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);
  
//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
//   }
// };

// // Configure multer for multiple files (max 10 files, 5MB each)
// const upload = multer({
//   storage: storage,
//   limits: { 
//     fileSize: 5 * 1024 * 1024, // 5MB per file
//     files: 10 // Max 10 files
//   },
//   fileFilter: fileFilter
// });

// // Middleware for handling multiple files (field name: 'images')
// const uploadMultiple = upload.array('images', 10);

// // ========== HELPER FUNCTION TO DELETE OLD IMAGES ==========
// const deleteImages = (imageUrls) => {
//   if (!imageUrls || !Array.isArray(imageUrls)) return;
  
//   imageUrls.forEach(imageUrl => {
//     if (imageUrl) {
//       const filename = path.basename(imageUrl);
//       const filePath = path.join(uploadDir, filename);
      
//       fs.unlink(filePath, (err) => {
//         if (err) console.error(`Failed to delete image: ${filePath}`, err);
//       });
//     }
//   });
// };

// // ========== CREATE gallery post with multiple images ==========
// galleryPostRoutes.post('/', uploadMultiple, async (req, res) => {
//   try {
//     const { title, description } = req.body;
    
//     // Get uploaded files URLs
//     const uploadedFiles = req.files || [];
//     const imageUrls = uploadedFiles.map(file => `/uploads/gallery/${file.filename}`);
    
//     if (imageUrls.length === 0) {
//       return res.status(400).json({ error: "At least one image is required" });
//     }
    
//     // Store images as JSON array in database
//     const newGalleryPost = await pool.query(
//       `INSERT INTO gallery_posts (title, description, images, created_at, updated_at)
//        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
//        RETURNING *`,
//       [title, description, JSON.stringify(imageUrls)]
//     );
    
//     res.status(201).json({
//       success: true,
//       data: newGalleryPost.rows[0],
//       uploadedImages: imageUrls
//     });
//   } catch (err) {
//     console.error("CREATE gallery post ERROR:", err.message);
    
//     // Delete uploaded files if database insert fails
//     if (req.files) {
//       req.files.forEach(file => {
//         fs.unlink(file.path, (unlinkErr) => {
//           if (unlinkErr) console.error("Error deleting file:", unlinkErr);
//         });
//       });
//     }
    
//     res.status(500).json({ error: "Server Error", details: err.message });
//   }
// });

// // ========== GET all gallery posts ==========
// galleryPostRoutes.get('/', async (req, res) => {
//   try {
//     const result = await pool.query(
//       'SELECT * FROM gallery_posts ORDER BY created_at DESC'
//     );
    
//     // Parse JSON images array for each post
//     const posts = result.rows.map(post => ({
//       ...post,
//       images: post.images ? JSON.parse(post.images) : []
//     }));
    
//     res.json(posts);
//   } catch (err) {
//     console.error("GET gallery posts ERROR:", err.message);
//     res.status(500).json({ error: "Server Error", details: err.message });
//   }
// });

// // ========== GET single gallery post ==========
// galleryPostRoutes.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query(
//       'SELECT * FROM gallery_posts WHERE id = $1',
//       [id]
//     );
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Gallery post not found" });
//     }
    
//     // Parse JSON images array
//     const post = {
//       ...result.rows[0],
//       images: result.rows[0].images ? JSON.parse(result.rows[0].images) : []
//     };
    
//     res.json(post);
//   } catch (err) {
//     console.error("GET gallery post ERROR:", err.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // ========== UPDATE gallery post with multiple images ==========
// galleryPostRoutes.put('/:id', uploadMultiple, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, existingImages } = req.body;
    
//     // Get existing post to delete removed images
//     const existingPost = await pool.query(
//       'SELECT images FROM gallery_posts WHERE id = $1',
//       [id]
//     );
    
//     if (existingPost.rows.length === 0) {
//       return res.status(404).json({ error: "Gallery post not found" });
//     }
    
//     const oldImages = existingPost.rows[0].images ? JSON.parse(existingPost.rows[0].images) : [];
    
//     // Parse existingImages if provided (images to keep)
//     let keepImages = [];
//     if (existingImages) {
//       keepImages = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
//     }
    
//     // Get newly uploaded files
//     const newFiles = req.files || [];
//     const newImageUrls = newFiles.map(file => `/uploads/gallery/${file.filename}`);
    
//     // Combine kept images with new ones
//     const allImages = [...keepImages, ...newImageUrls];
    
//     // Find and delete removed images
//     const removedImages = oldImages.filter(img => !keepImages.includes(img));
//     deleteImages(removedImages);
    
//     const update = await pool.query(
//       `UPDATE gallery_posts
//        SET title = $1, 
//            description = $2, 
//            images = $3,
//            updated_at = CURRENT_TIMESTAMP
//        WHERE id = $4
//        RETURNING *`,
//       [title, description, JSON.stringify(allImages), id]
//     );
    
//     if (update.rows.length === 0) {
//       return res.status(404).json({ error: "Gallery post not found" });
//     }
    
//     res.json({
//       success: true,
//       data: update.rows[0],
//       uploadedImages: newImageUrls
//     });
//   } catch (err) {
//     console.error("UPDATE gallery post ERROR:", err.message);
    
//     // Delete newly uploaded files if update fails
//     if (req.files) {
//       req.files.forEach(file => {
//         fs.unlink(file.path, (unlinkErr) => {
//           if (unlinkErr) console.error("Error deleting file:", unlinkErr);
//         });
//       });
//     }
    
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // ========== DELETE gallery post and its images ==========
// galleryPostRoutes.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Get images before deleting
//     const galleryPost = await pool.query(
//       'SELECT images FROM gallery_posts WHERE id = $1',
//       [id]
//     );
    
//     if (galleryPost.rows.length === 0) {
//       return res.status(404).json({ error: "Gallery post not found" });
//     }
    
//     // Delete image files from server
//     const images = galleryPost.rows[0].images ? JSON.parse(galleryPost.rows[0].images) : [];
//     deleteImages(images);
    
//     // Delete from database
//     const deletedPost = await pool.query(
//       'DELETE FROM gallery_posts WHERE id = $1 RETURNING *',
//       [id]
//     );
    
//     res.json({ 
//       success: true, 
//       message: "Gallery post deleted successfully",
//       deletedImages: images.length
//     });
//   } catch (err) {
//     console.error("DELETE gallery post ERROR:", err.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // ========== DELETE single image from gallery post ==========
// galleryPostRoutes.delete('/:id/images', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { imageUrl } = req.body;
    
//     if (!imageUrl) {
//       return res.status(400).json({ error: "Image URL is required" });
//     }
    
//     // Get current images
//     const result = await pool.query(
//       'SELECT images FROM gallery_posts WHERE id = $1',
//       [id]
//     );
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Gallery post not found" });
//     }
    
//     const currentImages = result.rows[0].images ? JSON.parse(result.rows[0].images) : [];
//     const updatedImages = currentImages.filter(img => img !== imageUrl);
    
//     // Delete image file
//     deleteImages([imageUrl]);
    
//     // Update database
//     await pool.query(
//       'UPDATE gallery_posts SET images = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
//       [JSON.stringify(updatedImages), id]
//     );
    
//     res.json({ 
//       success: true, 
//       message: "Image deleted successfully",
//       remainingImages: updatedImages.length
//     });
//   } catch (err) {
//     console.error("DELETE image ERROR:", err.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// module.exports = galleryPostRoutes;






const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ========== CONFIGURE MULTER FOR MULTIPLE IMAGE UPLOADS ==========

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads/gallery');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename: timestamp-randomnumber-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, `gallery-${uniqueSuffix}${ext}`);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// Configure multer for multiple files (max 10 files, 5MB each)
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 10 // Max 10 files
  },
  fileFilter: fileFilter
});

// Middleware for handling multiple files (field name: 'images')
const uploadMultiple = upload.array('images', 10);

// ========== HELPER FUNCTION TO SAFELY PARSE IMAGES ==========
const safeParseImages = (imagesData) => {
  if (!imagesData) return [];
  
  // If it's already an array
  if (Array.isArray(imagesData)) return imagesData;
  
  // If it's a string
  if (typeof imagesData === 'string') {
    try {
      // Try to parse as JSON
      const parsed = JSON.parse(imagesData);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      // If not valid JSON, it might be a plain string URL
      // Return as a single-item array
      return [imagesData];
    }
  }
  
  // If it's a JSON object
  if (typeof imagesData === 'object' && imagesData !== null) {
    return Array.isArray(imagesData) ? imagesData : [imagesData];
  }
  
  return [];
};

// ========== HELPER FUNCTION TO DELETE OLD IMAGES ==========
const deleteImages = (imageUrls) => {
  if (!imageUrls || !Array.isArray(imageUrls)) return;
  
  imageUrls.forEach(imageUrl => {
    if (imageUrl && typeof imageUrl === 'string') {
      // Extract filename from URL
      const filename = path.basename(imageUrl);
      const filePath = path.join(uploadDir, filename);
      
      // Check if file exists before deleting
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Failed to delete image: ${filePath}`, err);
          else console.log(`Deleted image: ${filePath}`);
        });
      }
    }
  });
};

// ========== CREATE gallery post with multiple images ==========
router.post('/', uploadMultiple, async (req, res) => {
  try {
    console.log('📸 Received POST request to /api/gallery');
    console.log('Title:', req.body.title);
    console.log('Files received:', req.files ? req.files.length : 0);
    
    const { title, description } = req.body;
    
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    
    // Get uploaded files URLs
    const uploadedFiles = req.files || [];
    
    if (uploadedFiles.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }
    
    const imageUrls = uploadedFiles.map(file => `/uploads/gallery/${file.filename}`);
    
    // Store images as JSON array in database
    const newGalleryPost = await pool.query(
      `INSERT INTO gallery_posts (title, description, images, created_at, updated_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [title.trim(), description || '', JSON.stringify(imageUrls)]
    );
    
    console.log('✅ Gallery post created successfully, ID:', newGalleryPost.rows[0].id);
    
    // Parse images for response
    const savedPost = newGalleryPost.rows[0];
    savedPost.images = safeParseImages(savedPost.images);
    
    res.status(201).json({
      success: true,
      data: savedPost,
      uploadedImages: imageUrls
    });
  } catch (err) {
    console.error("❌ CREATE gallery post ERROR:", err.message);
    
    // Delete uploaded files if database insert fails
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlink(file.path, (unlinkErr) => {
            if (unlinkErr) console.error("Error deleting file:", unlinkErr);
          });
        }
      });
    }
    
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// ========== GET all gallery posts ==========
router.get('/', async (req, res) => {
  try {
    console.log('📋 Received GET request to /api/gallery');
    
    const result = await pool.query(
      'SELECT * FROM gallery_posts ORDER BY created_at DESC'
    );
    
    // Parse JSON images array for each post using safe parser
    const posts = result.rows.map(post => ({
      id: post.id,
      title: post.title,
      description: post.description,
      images: safeParseImages(post.images),
      created_at: post.created_at,
      updated_at: post.updated_at
    }));
    
    console.log(`✅ Retrieved ${posts.length} gallery posts`);
    res.json(posts);
  } catch (err) {
    console.error("❌ GET gallery posts ERROR:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// ========== GET single gallery post ==========
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📋 Fetching gallery post ID: ${id}`);
    
    const result = await pool.query(
      'SELECT * FROM gallery_posts WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Gallery post not found" });
    }
    
    const post = result.rows[0];
    post.images = safeParseImages(post.images);
    
    res.json(post);
  } catch (err) {
    console.error("❌ GET gallery post ERROR:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ========== UPDATE gallery post with multiple images ==========
router.put('/:id', uploadMultiple, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, existingImages } = req.body;
    
    console.log(`✏️ Updating gallery post ID: ${id}`);
    
    // Get existing post to delete removed images
    const existingPost = await pool.query(
      'SELECT images FROM gallery_posts WHERE id = $1',
      [id]
    );
    
    if (existingPost.rows.length === 0) {
      return res.status(404).json({ error: "Gallery post not found" });
    }
    
    // Safely parse old images
    const oldImages = safeParseImages(existingPost.rows[0].images);
    
    // Parse existingImages if provided (images to keep)
    let keepImages = [];
    if (existingImages) {
      try {
        keepImages = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
      } catch (e) {
        keepImages = [];
      }
    }
    
    // Get newly uploaded files
    const newFiles = req.files || [];
    const newImageUrls = newFiles.map(file => `/uploads/gallery/${file.filename}`);
    
    // Combine kept images with new ones
    const allImages = [...keepImages, ...newImageUrls];
    
    // Find and delete removed images
    const removedImages = oldImages.filter(img => !keepImages.includes(img));
    if (removedImages.length > 0) {
      deleteImages(removedImages);
    }
    
    const update = await pool.query(
      `UPDATE gallery_posts
       SET title = $1, 
           description = $2, 
           images = $3,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [title || '', description || '', JSON.stringify(allImages), id]
    );
    
    if (update.rows.length === 0) {
      return res.status(404).json({ error: "Gallery post not found" });
    }
    
    const updatedPost = update.rows[0];
    updatedPost.images = safeParseImages(updatedPost.images);
    
    console.log(`✅ Gallery post ${id} updated successfully`);
    
    res.json({
      success: true,
      data: updatedPost,
      uploadedImages: newImageUrls
    });
  } catch (err) {
    console.error("❌ UPDATE gallery post ERROR:", err.message);
    
    // Delete newly uploaded files if update fails
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlink(file.path, (unlinkErr) => {
            if (unlinkErr) console.error("Error deleting file:", unlinkErr);
          });
        }
      });
    }
    
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// ========== DELETE gallery post and its images ==========
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ Deleting gallery post ID: ${id}`);
    
    // Get images before deleting
    const galleryPost = await pool.query(
      'SELECT images FROM gallery_posts WHERE id = $1',
      [id]
    );
    
    if (galleryPost.rows.length === 0) {
      return res.status(404).json({ error: "Gallery post not found" });
    }
    
    // Safely parse and delete image files
    const images = safeParseImages(galleryPost.rows[0].images);
    if (images.length > 0) {
      deleteImages(images);
    }
    
    // Delete from database
    await pool.query(
      'DELETE FROM gallery_posts WHERE id = $1',
      [id]
    );
    
    console.log(`✅ Gallery post ${id} deleted successfully`);
    
    res.json({ 
      success: true, 
      message: "Gallery post deleted successfully",
      deletedImages: images.length
    });
  } catch (err) {
    console.error("❌ DELETE gallery post ERROR:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ========== DELETE single image from gallery post ==========
router.delete('/:id/images', async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;
    
    console.log(`🗑️ Deleting image from gallery post ID: ${id}`);
    
    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }
    
    // Get current images
    const result = await pool.query(
      'SELECT images FROM gallery_posts WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Gallery post not found" });
    }
    
    const currentImages = safeParseImages(result.rows[0].images);
    const updatedImages = currentImages.filter(img => img !== imageUrl);
    
    // Delete image file
    deleteImages([imageUrl]);
    
    // Update database
    await pool.query(
      'UPDATE gallery_posts SET images = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [JSON.stringify(updatedImages), id]
    );
    
    console.log(`✅ Image deleted from post ${id}`);
    
    res.json({ 
      success: true, 
      message: "Image deleted successfully",
      remainingImages: updatedImages.length
    });
  } catch (err) {
    console.error("❌ DELETE image ERROR:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;