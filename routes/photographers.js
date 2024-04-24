const photographersController = require('../controllers/photographers-controller.js');
const photographersRouter = require('express').Router();
const { validationResult } = require('express-validator');
const { paramsIsNumber, photographerDataValid } = require('../utils/validationSchemas.js');


// get photographers route
// for getting all photographers to show in the add photographers select for adding a shoot
photographersRouter.route('/all')
  .get(photographersController.getAllPhotographers);


// add photographer route
photographersRouter.route('/add')
  .post(photographerDataValid, (req, res, next) => {
    const errors = validationResult(req);
      const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }

    next();
  }, photographersController.addPhotographer);


// edit photographer by id route  
photographersRouter.route('/edit/:id')
  .put(paramsIsNumber, photographerDataValid, (req, res, next) => {
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