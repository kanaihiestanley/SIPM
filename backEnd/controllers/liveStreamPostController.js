const mongoose = require('mongoose');
const LiveStreamPost = require('../models/BiblePostModule').LiveStreamPost;



// GET all YOUTUBE LiveStream posts
const getLiveStreamPosts = async (req, res) => {
    try {
        const LiveStreamPosts = await LiveStreamPost.find({}).sort({createdAt: -1});
        res.status(200).json(LiveStreamPosts);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// GET a single YOUTUBE LiveStream post
const getLiveStreamPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post exists'});
    }

    try {
        const LiveStreamPost = await LiveStreamPost.findById(id);
        if (!LiveStreamPost) {
            return res.status(404).json({error: 'No such post exists'});
        }

        res.status(200).json(LiveStreamPost);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// CREATE new YOUTUBE LiveStream post
const createLiveStreamPost = async (req, res) => {
    const { theme, videoContent } = req.body;

    try {
        const newLiveStreamPost = await LiveStreamPost.create({ theme, videoContent });
        res.status(201).json(newLiveStreamPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// const createLiveStreamPost = async (req, res) => {
//     const { theme, videoContent } = req.body;

//     try {
//         const LiveStreamPost = await LiveStreamPost.create({ theme, videoContent });
//         res.status(200).json(LiveStreamPost);
//     } catch (error) {
//         res.status(400).json({error: error.message});
//     }
// };

// // CREATE new LiveStream post
// const createLiveStreamPost = async (req, res) => {
//     const { title, description, imageUrl } = req.body;

//     try {
//         const LiveStreamPost = await LiveStreamPost.create({ title, description, imageUrl, image: imageUrl });
//         res.status(200).json(LiveStreamPost);
//     } catch (error) {
//         res.status(400).json({error: error.message});
//     }
// };


// DELETE a LiveStream post
const deleteLiveStreamPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such post exists'});
    }

    try {
        const LiveStreamPost = await LiveStreamPost.findOneAndDelete({_id: id});
        if (!LiveStreamPost) {
            return res.status(400).json({error: 'No such post exists'});
        }

        res.status(200).json(LiveStreamPost);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// UPDATE a LiveStream post
const updateLiveStreamPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such post exists'});
    }

    try {
        const LiveStreamPost = await LiveStreamPost.findOneAndUpdate({_id: id}, { ...req.body }, { new: true });
        if (!LiveStreamPost) {
            return res.status(400).json({error: 'No such post exists'});
        }

        res.status(200).json(LiveStreamPost);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getLiveStreamPosts,
    getLiveStreamPost,
    createLiveStreamPost,
    deleteLiveStreamPost,
    updateLiveStreamPost
};
