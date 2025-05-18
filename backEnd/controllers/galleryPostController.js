const mongoose = require('mongoose');
const GalleryPost = require('../models/BiblePostModule').GalleryPost;



// GET all gallery posts
const getGalleryPosts = async (req, res) => {
    try {
        const galleryPosts = await GalleryPost.find({}).sort({createdAt: -1});
        res.status(200).json(galleryPosts);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// GET a single gallery post
const getGalleryPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post exists'});
    }

    try {
        const galleryPost = await GalleryPost.findById(id);
        if (!galleryPost) {
            return res.status(404).json({error: 'No such post exists'});
        }

        res.status(200).json(galleryPost);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// CREATE new gallery post
const createGalleryPost = async (req, res) => {
    const { title, description, imageUrl } = req.body;

    try {
        const galleryPost = await GalleryPost.create({ title, description, imageUrl });
        res.status(200).json(galleryPost);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// // CREATE new gallery post
// const createGalleryPost = async (req, res) => {
//     const { title, description, imageUrl } = req.body;

//     try {
//         const galleryPost = await GalleryPost.create({ title, description, imageUrl, image: imageUrl });
//         res.status(200).json(galleryPost);
//     } catch (error) {
//         res.status(400).json({error: error.message});
//     }
// };


// DELETE a gallery post
const deleteGalleryPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such post exists'});
    }

    try {
        const galleryPost = await GalleryPost.findOneAndDelete({_id: id});
        if (!galleryPost) {
            return res.status(400).json({error: 'No such post exists'});
        }

        res.status(200).json(galleryPost);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// UPDATE a gallery post
const updateGalleryPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such post exists'});
    }

    try {
        const galleryPost = await GalleryPost.findOneAndUpdate({_id: id}, { ...req.body }, { new: true });
        if (!galleryPost) {
            return res.status(400).json({error: 'No such post exists'});
        }

        res.status(200).json(galleryPost);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getGalleryPosts,
    getGalleryPost,
    createGalleryPost,
    deleteGalleryPost,
    updateGalleryPost
};
