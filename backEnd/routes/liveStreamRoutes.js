const express = require('express');
const router = express.Router();
const {
    getLiveStreamPosts,
    getLiveStreamPost,
    createLiveStreamPost,
    deleteLiveStreamPost,
    updateLiveStreamPost
} = require('../controllers/liveStreamPostController');



// GET YOUTUBE all LiveStream posts
router.get('/', getLiveStreamPosts);



// GET a single YOUTUBE LiveStream post
router.get('/:id', getLiveStreamPost);



// POST a new YOUTUBE LiveStream post
router.post('/', createLiveStreamPost);



// DELETE a YOUTUBE LiveStream post
router.delete('/:id', deleteLiveStreamPost);



// UPDATE a YOUTUBE LiveStream post
router.patch('/:id', updateLiveStreamPost);



module.exports = router;
