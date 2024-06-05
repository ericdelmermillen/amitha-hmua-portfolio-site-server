const photographersController = require('../controllers/photographers-controller.js');
const photographersRouter = require('express').Router();
const { paramsIsNumber, photographerDataValid } = require('../utils/validationSchemas.js');
const { validateToken, validateRequest } = require("./middleware/middleware.js");


// get photographers route
// for getting all photographers to show in the add photographers select for adding a shoot
photographersRouter.route('/all')
  .get(photographersController.getAllPhotographers);


// add photographer route
photographersRouter.route('/add')
  .post(validateToken, validateRequest(photographerDataValid), photographersController.addPhotographer);


// edit photographer by id route  
photographersRouter.route('/edit/:id')
  .put(validateToken, validateRequest(paramsIsNumber, photographerDataValid), photographersController.editPhotographerById);


// delete photographer route
photographersRouter.route('/delete/:id')
  .delete(validateToken, validateRequest(paramsIsNumber), photographersController.deletePhotographerByID);

  
module.exports = photographersRouter;