const express = require('express')
// const BiblePost = require('../models/BiblePostModule')
const {
    getBibleposts,
    getBiblepost,
    createBiblePost,
    deleteBiblePost,
    updateBiblePost
} = require('../controllers/biblePostController')

const router = express.Router()



//GET all site routes
router.get('/', getBibleposts)

// router.get('/', (req, res)=>{
//     res.json({mssg: "Get all routes"})
// })




//GET a single route
router.get('/:id', getBiblepost)

// router.get('/:id', (req, res)=>{
//     res.json({mssg: "Single routes"})
// })




//POST a new post
router.post('/', createBiblePost)






//DELETE a post
router.delete('/:id', deleteBiblePost)

// router.delete('/:id', (req, res)=>{
//     res.json({mssg: "DELETE a post"})
// })




//UPDATE a post
router.patch('/:id', updateBiblePost)

// router.patch('/:id', (req, res)=>{
//     res.json({mssg: "UPDATE a post"})
// })

module.exports = router
