const contactController = require('../controllers/contact-controller.js');
const contactRouter = require('express').Router();
const { validationResult } = require('express-validator');
const { validContactFormData } = require('../utils/validationSchemas.js');


// contact route
contactRouter.route('/')
  .post(validContactFormData, (req, res, next) => {
    const errors = validationResult(req);
      const errorMsgs = errors.array().map(error => error.msg);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
      
    next();
  }, contactController.handleContactForm);


module.exports = contactRouter;