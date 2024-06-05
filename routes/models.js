const modelsController = require('../controllers/models-controller.js');
const modelsRouter = require('express').Router();
const { validationResult } = require('express-validator');
const { paramsIsNumber, modelDataValid } = require('../utils/validationSchemas.js');
const { verifyToken } = require('../utils/utils.js');


// get models route
modelsRouter.route('/all')
  .get(modelsController.getAllModels);


// add model route  
modelsRouter.route('/add')
  .post(modelDataValid, (req, res, next) => {
    const errors = validationResult(req);
    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    
    const token = req.headers.authorization; 
    
    if(!verifyToken(token)) {
      return res.status(401).send({message: "unauthorized"});
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

    const token = req.headers.authorization; 
    
    if(!verifyToken(token)) {
      return res.status(401).send({message: "unauthorized"});
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

    const token = req.headers.authorization; 
    
    if(!verifyToken(token)) {
      console.log("rejected in route")
      return res.status(401).send({message: "unauthorized"});
    }
    
    next();
  }, modelsController.deleteModelByID);


module.exports = modelsRouter;