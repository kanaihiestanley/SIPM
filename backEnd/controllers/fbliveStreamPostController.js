const mongoose = require('mongoose');
const FBLiveStreamPost = require('../models/BiblePostModule').FBLiveStreamPost;



// GET all YOUTUBE FBLiveStream posts
const getFBLiveStreamPosts = async (req, res) => {
    try {
        const FBLiveStreamPosts = await FBLiveStreamPost.find({}).sort({createdAt: -1});
        res.status(200).json(FBLiveStreamPosts);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// GET a single YOUTUBE FBLiveStream post
const getFBLiveStreamPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post exists'});
    }

    try {
        const FBLiveStreamPost = await FBLiveStreamPost.findById(id);
        if (!FBLiveStreamPost) {
            return res.status(404).json({error: 'No such post exists'});
        }

        res.status(200).json(FBLiveStreamPost);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// CREATE new YOUTUBE FBLiveStream post
const createFBLiveStreamPost = async (req, res) => {
    const { theme, videoContent } = req.body;

    try {
        const newFBLiveStreamPost = await FBLiveStreamPost.create({ theme, videoContent });
        res.status(201).json(newFBLiveStreamPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// const createFBLiveStreamPost = async (req, res) => {
//     const { theme, videoContent } = req.body;

//     try {
//         const FBLiveStreamPost = await FBLiveStreamPost.create({ theme, videoContent });
//         res.status(200).json(FBLiveStreamPost);
//     } catch (error) {
//         res.status(400).json({error: error.message});
//     }
// };

// // CREATE new FBLiveStream post
// const createFBLiveStreamPost = async (req, res) => {
//     const { title, description, imageUrl } = req.body;

//     try {
//         const FBLiveStreamPost = await FBLiveStreamPost.create({ title, description, imageUrl, image: imageUrl });
//         res.status(200).json(FBLiveStreamPost);
//     } catch (error) {
//         res.status(400).json({error: error.message});
//     }
// };


// DELETE a FBLiveStream post
const deleteFBLiveStreamPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such post exists'});
    }

    try {
        const FBLiveStreamPost = await FBLiveStreamPost.findOneAndDelete({_id: id});
        if (!FBLiveStreamPost) {
            return res.status(400).json({error: 'No such post exists'});
        }

        res.status(200).json(FBLiveStreamPost);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// UPDATE a FBLiveStream post
const updateFBLiveStreamPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such post exists'});
    }

    try {
        const FBLiveStreamPost = await FBLiveStreamPost.findOneAndUpdate({_id: id}, { ...req.body }, { new: true });
        if (!FBLiveStreamPost) {
            return res.status(400).json({error: 'No such post exists'});
        }

        res.status(200).json(FBLiveStreamPost);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getFBLiveStreamPosts,
    getFBLiveStreamPost,
    createFBLiveStreamPost,
    deleteFBLiveStreamPost,
    updateFBLiveStreamPost
};
