require('dotenv').config();

const express = require('express');
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

// ---
// test route for putting to AWS S3 bucket
// memory storage for multer so my file uploads can be handled via memory storage and sent directly to S3 without being saved to the file system
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});
// used for generating unique names
const crypto = require('crypto');

const randomImageName = (bytes = 32) => crypto.randomBytes().toString('hex');

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKeyId: secretAccessKey, 
  },
  region: bucketRegion
});


// test route for putting to AWS S3 bucket
// mock post request
// Key/req.file.originalname needs to be unique to prevent a naming collision
app.post("/api/posts", upload.single('image'), async (req, res) => {
  const imageName = randomImageName();
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  }
  // need to store the random image name assigned to the picture to save the url to the database

  try {
    const command = new PutObjectCommand(params);
    console.log(command)
    const response = await s3.send(command);
    res.send({}); 
    // need to store the location to the database
  } catch (error) {
    console.log('Upload error:', error);
    res.status(500).send({ error: 'An error occurred during upload' }); // Send error response to the client
  }
});


// mock DELETE request
app.delete("/api/posts/:id", async (req, res) => {
  const id = +req.params.id;

  // res.send({message: `post ${id} deleted successfully`});
})


// in route to post new shoot  
// will need to send the ~10 files
// sending files in multi-part-file:

// const params = {
//   Bucket: bucketName,
//   Key: req.file.originalname,
//   Body: req.file.buffer,
//   ContentType: req.file.mimetype
// }

// const command = new PutObjectCommand(params);

// await s3.send(command)





// middleware for uploading single images: will need to import multi images at once: CHANGE THIS LATER
// string used here is the name of the image being uploaded; will be the name field of the input on the client
// upload.array('fieldName', maxCount) allows you to accept multiple files with the specified field name (fieldName) and a maximum number of files (maxCount).
// upload.single('image')

// // Log the origin of a request
// app.use((req, res, next) => {
//   const origin = req.get('Origin'); // Get the value of the Origin header from the request
//   console.log('Request Origin:', origin); // Log the origin to the console
//   next(); // Move to the next middleware
// });


// ---





// need to set up .env for environment variables
const PORT = process.env.PORT || 8080;
 
// import routes
const authRouter = require('./routes/auth.js')
const shootsRouter = require('./routes/shoots.js');
const contactRouter = require('./routes/contact.js');
const modelsRouter = require('./routes/models.js');
const photographersRouter = require('./routes/photographers.js');
const { contentType } = require('express/lib/response.js');

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


// set up jwt refreshing for all protected routes