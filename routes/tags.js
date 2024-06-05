const tagsController = require('../controllers/tags-controller');
const tagsRouter = require('express').Router();
const { validationResult } = require('express-validator');
const { paramsIsNumber, tagDataValid } = require('../utils/validationSchemas.js');
const { validateToken, validateRequest } = require("./middleware/middleware.js");


// get models route
tagsRouter.route('/all')
  .get(tagsController.getAllTags);


// // add model route  
tagsRouter.route('/add')
  .post(validateToken, validateRequest(tagDataValid), tagsController.addTag);
  
  
// edit tag by id route  
tagsRouter.route('/edit/:id')
  .put(validateToken, validateRequest(paramsIsNumber, tagDataValid), tagsController.editTagById);

  
// // delete model route
tagsRouter.route('/delete/:id')
  .delete(validateToken, validateRequest(paramsIsNumber), tagsController.deleteTagByID);


module.exports = tagsRouter;