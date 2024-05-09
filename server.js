require('dotenv').config();
const express = require('express');

// for dealing with file system or working with file uploads in memory
const multer = require('multer');
const app = express();

// necessary for parsing the req.body
app.use(express.json());

// need to set up cors for cross origin access
const cors = require('cors');

// cors config object for cross origin 
const TESTING = process.env.TESTING || false;
const corsOptions = TESTING ?  { }:  { origin: process.env.CLIENT_HOST};

// cors options use
app.use(cors(
  corsOptions
));

// test AWS signed URL route
// import { generateUploadURL } from './s3.js';
const { generateUploadURL } = require('./s3.js');

app.get('/s3url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})


 
// import routes
const authRouter = require('./routes/auth.js')
const shootsRouter = require('./routes/shoots.js');
const contactRouter = require('./routes/contact.js');
const modelsRouter = require('./routes/models.js');
const tagsRouter = require('./routes/tags.js');
const photographersRouter = require('./routes/photographers.js');

// auth route for: login for admin
app.use('/api/auth', authRouter);

// contact form route
app.use('/api/contact', contactRouter);

// photographers: get all photographers, edit a photographer, add a photographer, delete a photographer
app.use('/api/photographers', photographersRouter);

// models: get all models, get model by id, add a model, edit a model, delete a model
app.use('/api/models', modelsRouter);

// models: get all tags, get tag by id, add a tag, edit a tag, delete a tag
app.use('/api/tags', tagsRouter);

// shoots route for: summary of shoots, shoot by id, add a shoot, edit a shoot, delete a shoot, update shoot order
app.use('/api/shoots', shootsRouter);

// multer error handling: place after route?
app.use((error, req, res, next) => {
  if(error instanceof multer.MulterError) {
    if(error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: "File is too large"
      });
    }

    if(error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit exceeded"
      });
    }

    if(error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image"
      });
    }
  }
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});