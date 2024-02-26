const photographersController = require('../controllers/photographers-controller.js');
const photographersRouter = require('express').Router();
const { query, body, validationResult, matchedData } = require('express-validator');
const { paramsIsNumber, addPhotographerDataValid } = require('../utils/validationSchemas.js');

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
  .get(paramsIsNumber,  (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, photographersController.getPhotographerByID);
  

// add photographer route
photographersRouter.route('/add')
  .post(addPhotographerDataValid, (req, res, next) => {
    const errors = validationResult(req);
      const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }

    next();
  }, photographersController.addPhotographer);


// edit photographer by id route  
photographersRouter.route('/edit/:id')
  .put(paramsIsNumber, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, photographersController.editPhotographerById);

// delete photographer route
// will need to make deleting a photographer delete all shoots/photos that reference them
photographersRouter.route('/delete/:id')
  .delete(paramsIsNumber, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, photographersController.deletePhotographerByID);

  
module.exports = photographersRouter;