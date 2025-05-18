const mongoose = require('mongoose')

const Schema = mongoose.Schema


//BIBLE POST schema
const BiblePostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bibleVerse: {
        type: String,
        required: true
    },
}, {timestamps: true
})

// GalleryPost Schema
const GalleryPostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,  // Assuming you are storing URLs, adjust if storing images differently
        required: true
    },
    // image: {
    //     type: String,  // Assuming you are storing image filenames, adjust if storing images differently
    //     required: true
    // }
}, {timestamps: true});



//FACEBOOK LIVE STREAM POST schema
const FBLiveStreamPostSchema = new Schema({
    theme: {
        type: String,
        required: true
    },    
    videoContent: {
        type: String, //Buffer is for video but am using the link only for simplicity
        required: true
    },
}, { timestamps: true });


// YOUTUBE LIVESTREAM VIDEO POST schema
const LiveStreamPostSchema = new Schema({
    theme: {
        type: String,
        required: true
    },    
    videoContent: {
        type: String, //Buffer is for video but am using the link only for simplicity
        required: true
    },
}, { timestamps: true });

// Export models
const BiblePost = mongoose.model('BiblePost', BiblePostSchema);
const GalleryPost = mongoose.model('GalleryPost', GalleryPostSchema);
const FBLiveStreamPost = mongoose.model('VideoPost', FBLiveStreamPostSchema);
const LiveStreamPost = mongoose.model('LiveStreamPost', LiveStreamPostSchema);


module.exports = { BiblePost, GalleryPost, FBLiveStreamPost, LiveStreamPost };
// BiblePost.find()