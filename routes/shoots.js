const shootsController = require('../controllers/shoots-controller.js');
const shootsRouter = require('express').Router();
const { query, body, validationResult, matchedData } = require('express-validator');
const { paramsIsNumber } = require('../utils/validationSchemas.js');

// *** import express validator to validate requests
// import { query, body, validationResult, matchedData } from 'express-validator';

// import validationSchemas necessary for each route

// need:
// 1) paramsIsNumber validation schema
// 2) shootDataValid validation schema: shoot_title, shoot_blurb, photographer_ids, model_ids, photo_urls
// 3) shootsOrderDataValid validation schema



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
// client needs to be able to compress then send uploaded photo(s) to AWS abd receive the urls back to be able to add them to the db
shootsRouter.route('/add')
  .post(shootsController.addShoot);


// edit shoot by id
shootsRouter.route('/edit/:id')
  .put(shootsController.editShootByID);


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
  .patch(shootsController.updateShootOrder);


module.exports = shootsRouter;