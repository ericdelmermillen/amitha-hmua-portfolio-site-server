require('dotenv').config();

// *** import express validator to validate requests
// import { query, body, validationResult, matchedData } from 'express-validator';

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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});


// set up jwt refreshing for all protected routes
// ***************** //

// research how to handle errors in accessing the database with my ORM (KNEX?)

// research interacting with mysql database from express server without an ORM/KNEX.js

// move token verification function to utils for code reusability

// move validation of requests into /utils/validationSchemas

// user validation via express-validator middleware