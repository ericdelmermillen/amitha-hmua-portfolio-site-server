const bioController = require("../controllers/bio-controller.js");
const bioRouter = require("express").Router();
const { validationResult } = require('express-validator');
const { bioDataIsValid } = require('../utils/validationSchemas.js');


// GET getBio route
bioRouter.route("/")
  .get(bioController.getBio);

// PUT updateBio route
bioRouter.route("/update")
  .put(bioDataIsValid, (req, res, next) => {
    const errors = validationResult(req);
    const errorMsgs = errors.array().map(error => error.msg);
    
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errorMsgs});
    }
    
    next();
  }, bioController.updateBio);


  module.exports = bioRouter;