const shootsController = require('../controllers/shoots-controller.js');
const shootsRouter = require('express').Router();
const { validationResult } = require('express-validator');
const { paramsIsNumber, shootDataValid, shootsOrderDataValid } = require('../utils/validationSchemas.js');


// GET shoots 
shootsRouter.route('/all')
  .get(shootsController.getShootSummaries);


// GET shoot by id
shootsRouter.route('/shoot/:id')
  .get(paramsIsNumber, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }

    next();
  }, shootsController.getShootByID);
  

// POST /shoots/add
shootsRouter.route('/add')
  .post(shootDataValid, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);
    
    if(!errors.isEmpty()) {
      console.log(`errorMsgs: ${errorMsgs}`);
      return res.status(400).json({ errors: errorMsgs });
    }

    next();
  }, shootsController.addShoot);


  // PUT /shoots/edit/:id
shootsRouter.route('/edit/:id')
  .put((req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      console.log(errorMsgs)
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, shootsController.editShootByID);

// delete shoot
shootsRouter.route('/delete/:id')
  .delete(paramsIsNumber, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, shootsController.deleteShootByID);
  

// edit shoots order
shootsRouter.route('/updateorder')
  .patch(shootsOrderDataValid, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, shootsController.updateShootOrder);


module.exports = shootsRouter;