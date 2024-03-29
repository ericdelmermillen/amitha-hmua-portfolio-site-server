const modelsController = require('../controllers/models-controller.js');
const modelsRouter = require('express').Router();
const { validationResult } = require('express-validator');
const { paramsIsNumber, modelDataValid } = require('../utils/validationSchemas.js');


// get models route
modelsRouter.route('/all')
  .get(modelsController.getAllModels);


// get models by id
modelsRouter.route('/model/:id')
  .get(paramsIsNumber, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, modelsController.getModelByID);
  


// add model route  
modelsRouter.route('/add')
  .post(modelDataValid, (req, res, next) => {
    const errors = validationResult(req);
      const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }

    next();
  }, modelsController.addModel);
  
  
// edit model by id route  
modelsRouter.route('/edit/:id')
  .put(paramsIsNumber, modelDataValid, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, modelsController.editModelById);

  
// delete model route
modelsRouter.route('/delete/:id')
  .delete(paramsIsNumber, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, modelsController.deleteModelByID);


module.exports = modelsRouter;