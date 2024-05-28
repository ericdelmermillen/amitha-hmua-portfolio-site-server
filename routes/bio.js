const bioController = require("../controllers/bio-controller.js");
const bioRouter = require("express").Router();
// const { validationResult } = require('express-validator');
// const { modelDataValid } = require('../utils/validationSchemas.js');


// getBio route
bioRouter.route("/")
  .get(bioController.getBio)



  module.exports = bioRouter;