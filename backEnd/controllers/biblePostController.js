// const biblePost = require('../controllers/biblePostControllers')
const mongoose = require('mongoose');
const BiblePost = require('../models/BiblePostModule').BiblePost;



//GET all bible Posts
const getBibleposts = async (req, res) =>{
    const biblePosts = await BiblePost.find({}).sort({createdAt: -1})

    res.status(200).json(biblePosts)
}


//GET a single bible post
const getBiblepost = async (req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post exist'})
    }

    const biblepost = await BiblePost.findById(id)

    if(!biblepost){
        return res.status(404).json({error: 'No such post exit'})
    }

    res.status(200).json(biblepost)
}



//CREATE new bible post
const createBiblePost = async (req, res) => {
    const {title, description, bibleVerse} = req.body

    //add doc to db
    try {
        const biblePost = await BiblePost.create({title, description, bibleVerse})
        res.status(200).json(biblePost)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



//DELETE a bible post
const deleteBiblePost = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such post exist'})
    }

    const biblepost = await BiblePost.findOneAndDelete({_id: id})

    if(!biblepost){
        return res.status(400).json({error: 'No such post exit'})
    }

    res.status(200).json(biblepost)
}





//UPDATE a bible post
const updateBiblePost = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such post exist'})
    }

    const biblepost = await BiblePost.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!biblepost){
        return res.status(400).json({error: 'No such post exit'})
    }

    res.status(200).json(biblepost)
}



module.exports = {
    getBibleposts,
    getBiblepost,
    createBiblePost,
    deleteBiblePost,
    updateBiblePost
}