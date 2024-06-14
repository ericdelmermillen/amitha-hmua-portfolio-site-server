const bioController = require("../controllers/bio-controller.js");
const bioRouter = require("express").Router();
const { bioDataIsValid } = require('../utils/validationSchemas.js');
const { validateToken, validateRequest } = require("../middleware/middleware.js");


// GET getBio route
bioRouter.route("/")
  .get(bioController.getBio);
  

// PUT updateBio route
bioRouter.route("/update")
  .put(validateToken, validateRequest(bioDataIsValid), bioController.updateBio);


  module.exports = bioRouter;