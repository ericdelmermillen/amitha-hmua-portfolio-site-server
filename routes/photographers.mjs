import express from 'express';
import {
  getAllPhotographers,
  addPhotographer,
  editPhotographerById,
  deletePhotographerByID
} from '../controllers/photographers-controller.mjs';
import { paramsIsNumber, photographerDataValid } from '../utils/validationSchemas.mjs';
import { validateToken, validateRequest } from '../middleware/middleware.mjs';

const photographersRouter = express.Router();

// ***may refactor to make / the ropute for get app and add: will need to update the client

// get photographers route
// for getting all photographers to show in the add photographers select for adding a shoot
photographersRouter.route('/all')
  .get(getAllPhotographers);

// add photographer route
photographersRouter.route('/add')
  .post(validateToken, validateRequest(photographerDataValid), addPhotographer);

// edit photographer by id route  
photographersRouter.route('/edit/:id')
  .put(validateToken, validateRequest(paramsIsNumber, photographerDataValid), editPhotographerById);

// delete photographer route
photographersRouter.route('/delete/:id')
  .delete(validateToken, validateRequest(paramsIsNumber), deletePhotographerByID);

export default photographersRouter;
