require('dotenv').config();

const express = require('express');
// for dealing with file system or working with file uploads in memory
const multer = require('multer');
const app = express();

// import of s3 service file
// const { s3Uploadv3 } = require("./s3Service.js");

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

// -- test route for posting to aws here

// for storing in memory while sending to AWS
const storage = multer.memoryStorage();

// multer error config for file type
const fileFilter = (req, file, callBack) => {
  if(file.mimetype.split('/')[0] === 'image') {
    callBack(null, true)
  } else {
    callBack(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false)
  }
}

// filesize limit in bytes and limit for number of files
const limits = {fileSize: 1000000, files: 10};


// middleware configured with storage and fileFilter configs
const upload = multer({ 
  storage, 
  fileFilter, 
  limits: limits
});

// posting route: posting multiple files to AWS S3: uses aws sdk v3 passing an array of file objects
app.post('/upload', upload.array("file"), async (req, res) => {
  console.log("from upload")
  try {
    const results = await s3Uploadv3(req.files);
    console.log(results);
    return res.json({status: "success", results});
  } catch(error) {
    console.log(error);
    return res.status(400).send({message: `Error posting files: ${error}`});
  }
});

// error handling: place after route?
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




//  --

// need to set up .env for environment variables
const PORT = process.env.PORT || 8080;
 
// import routes
const authRouter = require('./routes/auth.js')
const shootsRouter = require('./routes/shoots.js');
const contactRouter = require('./routes/contact.js');
const modelsRouter = require('./routes/models.js');
const photographersRouter = require('./routes/photographers.js');

// auth route for: login for admin
app.use('/api/auth', authRouter);

// shoots route for: summary of shoots, shoot by id, add a shoot, edit a shoot, delete a shoot, update shoot order
app.use('/api/shoots', shootsRouter);

// contact form route
app.use('/api/contact', contactRouter);

// models: get all models, get model by id, add a model, edit a model, delete a model
app.use('/api/models', modelsRouter);

// photographers: get all photographers, edit a photographer, add a photographer, delete a photographer
app.use('/api/photographers', photographersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});