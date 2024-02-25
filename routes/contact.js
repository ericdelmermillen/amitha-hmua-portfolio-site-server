const contactController = require('../controllers/contact-controller.js');
const contactRouter = require('express').Router();

// *** import express validator to validate requests
// import { query, body, validationResult, matchedData } from 'express-validator';

// import validationSchemas necessary for each route

// need:
// 1) email, password, message present and valid schema: validContactFormData 

// contact route
contactRouter.route('/')
  .post(contactController.handleContactForm);


module.exports = contactRouter;