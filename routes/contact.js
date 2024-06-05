const contactController = require('../controllers/contact-controller.js');
const contactRouter = require('express').Router();
const { validContactFormData } = require('../utils/validationSchemas.js');
const { validateRequest } = require("../middleware/middleware.js");


// contact route
contactRouter.route('/')
  .post(validateRequest(validContactFormData), contactController.handleContactForm);


module.exports = contactRouter;