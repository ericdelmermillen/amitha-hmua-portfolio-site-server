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
app.use(cors(corsOptions));

// aws sdkv3 delete object --
  const { deleteFiles } = require("./s3.js");
// ---


// test deleting route
app.delete("/api/images/delete/:id", async (req, res) => {
  const id = +req.params.id
  const { objNames } = req.body;

  try {
    const deleteResponse = await deleteFiles(objNames);
    console.log(deleteResponse); // optional: log the response for debugging
    res.send("Deleted");
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send("Error deleting files");
  }
})

// import routes
const authRouter = require('./routes/auth.js')
const shootsRouter = require('./routes/shoots.js');
const contactRouter = require('./routes/contact.js');
const modelsRouter = require('./routes/models.js');
const tagsRouter = require('./routes/tags.js');
const photographersRouter = require('./routes/photographers.js');

// auth route for: createUser, login for admin, get AWS signed URL
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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});