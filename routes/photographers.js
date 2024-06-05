const photographersController = require('../controllers/photographers-controller.js');
const photographersRouter = require('express').Router();
const { validationResult } = require('express-validator');
const { paramsIsNumber, photographerDataValid } = require('../utils/validationSchemas.js');
const { verifyToken } = require('../utils/utils.js');


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
    
    const token = req.headers.authorization; 
    
    if(!verifyToken(token)) {
      return res.status(401).send({message: "unauthorized"});
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
    
    const token = req.headers.authorization; 

    if(!verifyToken(token)) {
      return res.status(401).send({message: "unauthorized"});
    }
    
    next();
  }, photographersController.editPhotographerById);


// delete photographer route
photographersRouter.route('/delete/:id')
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
  }, photographersController.deletePhotographerByID);

  
module.exports = photographersRouter;