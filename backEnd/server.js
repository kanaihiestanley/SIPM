console.log(process.cwd());
require('dotenv').config();

const express = require('express');
const sipmRoutes = require('./routes/sipmRoute');
const galleryPostRoutes = require('./routes/galleryPostRoutes');
const liveStreamRoutes = require('./routes/liveStreamRoutes');
const fbliveStreamRoutes = require('./routes/fbliveStreamRoutes');
const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/sipmdb";
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const galleryModel = require('./models/BiblePostModule');
const liveStreamModel = require('./models/BiblePostModule');
const http = require('http');
const socketIo = require('socket.io');




//express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);




//middleware
app.use(express.json())
app.use(express.static('public'))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})



//ENABLE CORS FOR ALL ROUTES

const allowedOrigins = ['http://localhost:3000', 'https://sipm.com'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin ){
            callback(null, true);
        }
        else {
            callback(new Error('site not exist'));
        }
    }
}

app.use(cors(corsOptions));


//routes
app.use('/api/sipmRoute', sipmRoutes);
app.use('/api/galleryposts', galleryPostRoutes);
app.use('/api/livestreamposts', liveStreamRoutes); // Adjusted route path
app.use('/api/fblivestreamposts', fbliveStreamRoutes); // Adjusted route path



// Serve uploaded images

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images') //make sure public/Images folder is created
        
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + "_" + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single('file'), (req, res) => {
	userModel.create({imageUrl: req.file.filename})
	.then(result => res.json(result))
	.catch(err => console.log(err))
});


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('New client connected');
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  
    socket.on('video-offer', data => {
      // Broadcast the video offer to all other clients
      socket.broadcast.emit('video-offer', data);
    });
  
    socket.on('video-answer', data => {
      // Broadcast the video answer to all other clients
      socket.broadcast.emit('video-answer', data);
    });
  
    socket.on('ice-candidate', data => {
      // Broadcast ICE candidate information to all other clients
      socket.broadcast.emit('ice-candidate', data);
    });
  });
  

// new suggestions on 23.03.2024 
// app.post('/upload', upload.single('file'), (req, res) => {
//     liveStreamModel.LiveStreamPost.create({ imageUrl: req.file.filename })
//         .then(result => res.json(result))
//         .catch(err => console.log(err))
// });


mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true} ).then(()=>{
    //listening for request
    app.listen(process.env.PORT, () => {
        console.log("listening to PORT", process.env.PORT)
    });
}).catch((error) => {
    console.log(error)
})
 



