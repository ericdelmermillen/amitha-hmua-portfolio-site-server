const photographersController = require('../controllers/photographers-controller.js');
const photographersRouter = require('express').Router();

// *** import express validator to validate requests
// import { query, body, validationResult, matchedData } from 'express-validator';

// import validationSchemas necessary for each route

// need:
// 1) paramsIsNumber validation schema
// 2) photographerDataValid validation schema: photographer_name, websiteURL, instagramURL, facebookURL, twitterURL, pinterestURL: only name required, all must be string or not present/undefined/null (?)


// get photographers route
// for getting all photographers to show in the add photographers select for adding a shoot
photographersRouter.route('/all')
  .get(photographersController.getAllPhotographers);


// get photographer by id
// for getting photographer by id to edit photographer modal
photographersRouter.route('/photographer/:id')
  .get(photographersController.getPhotographerByID);
  

// add photographer route
photographersRouter.route('/add')
  .post(photographersController.addPhotographer);


// edit model by id route  
photographersRouter.route('/edit/:id')
  .put(photographersController.editPhotographerById);

// delete photographer route
// will need to make deleting a photographer delete all shoots/photos that reference them
photographersRouter.route('/delete/:id')
  .delete(photographersController.deletePhotographerByID);

  
module.exports = photographersRouter;