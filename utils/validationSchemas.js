const { query, body, param, validationResult, matchedData } = require('express-validator');

const paramsIsNumber = [
  param('id').isInt().withMessage('ID must be a number')
];

const emailAndPasswordAreValid = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

const validContactFormData = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required')
];


// need: validTokenPresent validation schema


// need: modelDataValid validation schema

// need: photographerDataValid validation schema

// need: shootDataValid validation schema

// need: shootsOrderDataValid validation schema

module.exports = {
  paramsIsNumber,
  emailAndPasswordAreValid, 
  validContactFormData
}