import express from 'express';
import { getBio, updateBio } from '../controllers/bio-controller.mjs';
import { bioDataIsValid } from '../utils/validationSchemas.mjs';
import { validateToken, validateRequest } from '../middleware/middleware.mjs';

const bioRouter = express.Router();

// GET getBio route
bioRouter.route('/')
  .get(getBio);

// PUT updateBio route
bioRouter.route('/update')
  .put(validateToken, validateRequest(bioDataIsValid), updateBio);

export default bioRouter;
