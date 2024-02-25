const modelsController = require('../controllers/models-controller.js');
const modelsRouter = require('express').Router();


// *** import express validator to validate requests
// import { query, body, validationResult, matchedData } from 'express-validator';

// import validationSchemas necessary for each route

// need:
// 1) paramsIsNumber validation schema
// 2) modelDataValid validation schema: name, agency, agencyUrl: only name required, all must be string or not present/undefined/null (?)


// get models route
// for getting all models to show in the add model select for adding a shoot
modelsRouter.route('/all')
.get(modelsController.getAllModels);


// get models by id
// for getting model by id to edit model modal
modelsRouter.route('/model/:id')
  .get(modelsController.getModelByID);
  
  
// add model route  
modelsRouter.route('/add')
  .post(modelsController.addModel);
  

// edit model by id route  
modelsRouter.route('/edit/:id')
  .put(modelsController.editModelById);

  
// delete model route
// will need to make deleting a model check if they are used in any existing shoots; handle error
modelsRouter.route('/delete/:id')
  .delete(modelsController.deleteModelByID);

module.exports = modelsRouter;