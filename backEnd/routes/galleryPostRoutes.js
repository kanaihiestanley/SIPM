const express = require('express');
const router = express.Router();
const {
    getGalleryPosts,
    getGalleryPost,
    createGalleryPost,
    deleteGalleryPost,
    updateGalleryPost
} = require('../controllers/galleryPostController');



// GET all gallery posts
router.get('/', getGalleryPosts);



// GET a single gallery post
router.get('/:id', getGalleryPost);



// POST a new gallery post
router.post('/', createGalleryPost);



// DELETE a gallery post
router.delete('/:id', deleteGalleryPost);



// UPDATE a gallery post
router.patch('/:id', updateGalleryPost);



module.exports = router;
