require('dotenv').config();
const express = require('express');
const app = express();

// necessary for parsing the req.body
app.use(express.json());

// helmet for security on requests
const helmet = require("helmet");
app.use(helmet());

// need to research each config option and set up later
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "'unsafe-inline'", "https://example.com"], // Allow scripts from self and example.com
//       styleSrc: ["'self'", "'unsafe-inline'", "https://example.com"], // Allow styles from self and example.com
//       imgSrc: ["'self'", "data:", "https://example.com"], // Allow images from self, data URIs, and example.com
//       connectSrc: ["'self'", "https://api.example.com"], // Allow connections to self and api.example.com
//       fontSrc: ["'self'", "https://example.com"], // Allow fonts from self and example.com
//       objectSrc: ["'none'"], // Disallow plugins like Flash
//       frameAncestors: ["'none'"], // Disallow embedding the site in iframes
//       formAction: ["'self'"], // Allow form actions only from self
//       upgradeInsecureRequests: [], // Automatically upgrade HTTP requests to HTTPS
//     },
//   },
//   referrerPolicy: { policy: 'no-referrer-when-downgrade' },
//   frameguard: { action: 'sameorigin' }, // Only allow framing on the same origin
//   hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // Enforce HTTPS for one year
//   hidePoweredBy: true, // Hide X-Powered-By header
//   noSniff: true, // Prevent MIME type sniffing
//   xssFilter: true, // Enable XSS filter in browsers
// }));

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


// // test deleting route
// gets names of aws 3s bucket objects from req.body: no db look up
// app.delete("/api/images/delete/:id", async (req, res) => {
//   const id = +req.params.id
//   const { objNames } = req.body;

//   try {
//     const deleteResponse = await deleteFiles(objNames);
//     console.log(deleteResponse); // optional: log the response for debugging
//     res.send("Deleted");
//   } catch (error) {
//     console.error("Error deleting file:", error);
//     res.status(500).send("Error deleting files");
//   }
// })

// import routes
const authRouter = require('./routes/auth.js');
const bioRouter = require('./routes/bio.js');
const shootsRouter = require('./routes/shoots.js');
const contactRouter = require('./routes/contact.js');
const modelsRouter = require('./routes/models.js');
const tagsRouter = require('./routes/tags.js');
const photographersRouter = require('./routes/photographers.js');

// auth route for: createUser, login for admin, get AWS signed URL
app.use('/api/auth', authRouter);

// auth route for: createUser, login for admin, get AWS signed URL
app.use('/api/bio', bioRouter);

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