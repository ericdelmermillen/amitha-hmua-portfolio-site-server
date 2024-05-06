const tagsController = require('../controllers/tags-controller');
const tagsRouter = require('express').Router();
const { validationResult } = require('express-validator');
const { paramsIsNumber, tagDataValid } = require('../utils/validationSchemas.js');


// get models route
tagsRouter.route('/all')
  .get(tagsController.getAllTags);


// // add model route  
tagsRouter.route('/add')
  .post(tagDataValid, (req, res, next) => {
    const errors = validationResult(req);
    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }

    next();
  }, tagsController.addTag);
  
  
// edit tag by id route  
tagsRouter.route('/edit/:id')
  .put(paramsIsNumber, tagDataValid, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, tagsController.editTagById);

  
// // delete model route
tagsRouter.route('/delete/:id')
  .delete(paramsIsNumber, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, tagsController.deleteTagByID);


module.exports = tagsRouter;