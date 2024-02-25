const contactController = require('../controllers/contact-controller.js');
const contactRouter = require('express').Router();

// contact route
contactRouter.route('/')
  .post(contactController.handleContactForm);


module.exports = contactRouter;