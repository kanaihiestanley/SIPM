const express = require('express');
const router = express.Router();
const {
    getFBLiveStreamPosts,
    getFBLiveStreamPost,
    createFBLiveStreamPost,
    deleteFBLiveStreamPost,
    updateFBLiveStreamPost
} = require('../controllers/fbliveStreamPostController');



// GET YOUTUBE all FBLiveStream posts
router.get('/', getFBLiveStreamPosts);



// GET a single YOUTUBE FBLiveStream post
router.get('/:id', getFBLiveStreamPost);



// POST a new YOUTUBE FBLiveStream post
router.post('/', createFBLiveStreamPost);



// DELETE a YOUTUBE FBLiveStream post
router.delete('/:id', deleteFBLiveStreamPost);



// UPDATE a YOUTUBE FBLiveStream post
router.patch('/:id', updateFBLiveStreamPost);



module.exports = router;
