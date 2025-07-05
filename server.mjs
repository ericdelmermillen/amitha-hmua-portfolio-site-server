import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

// import { deleteFiles } from './s3.mjs';

// Import routes
import authRouter from './routes/auth.mjs';
import bioRouter from './routes/bio.mjs';
import contactRouter from './routes/contact.mjs';
import modelsRouter from './routes/models.mjs';
import shootsRouter from './routes/shoots.mjs';
import photographersRouter from './routes/photographers.mjs';
import tagsRouter from './routes/tags.mjs';

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());

const TESTING = process.env.TESTING || false;
const corsOptions = TESTING ? {} : { origin: process.env.CLIENT_HOST };
app.use(cors(corsOptions));


// Routes:
// Auth route for: createUser, login for admin, get AWS signed URL
app.use('/api/auth', authRouter);

// Bio route for admin bio content
app.use('/api/bio', bioRouter);

// Contact form route
app.use('/api/contact', contactRouter);

// Models: get all, get by ID, add, edit, delete
app.use('/api/models', modelsRouter);

// Photographers: get all, add, edit, delete
app.use('/api/photographers', photographersRouter);

// Shoots: summary, by ID, add, edit, delete, update order
app.use('/api/shoots', shootsRouter);

// Tags: get all, get by ID, add, edit, delete
app.use('/api/tags', tagsRouter);

/* ------------------ OPTIONAL TEST ROUTE ------------------ */

// Gets names of AWS S3 bucket objects from req.body (no DB lookup)
// Uncomment to test delete functionality
// app.delete('/api/images/delete/:id', async (req, res) => {
//   const id = +req.params.id;
//   const { objNames } = req.body;

//   try {
//     const deleteResponse = await deleteFiles(objNames);
//     console.log(deleteResponse); // Optional: log the response for debugging
//     res.send('Deleted');
//   } catch (error) {
//     console.error('Error deleting file:', error);
//     res.status(500).send('Error deleting files');
//   }
// });

/* ------------------------ START SERVER ------------------------ */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
