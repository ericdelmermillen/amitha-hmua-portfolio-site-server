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

const modelDataValid = [
  body('model_name').isString().notEmpty().withMessage('Name must be a non-empty string'),
  body('agency').optional({ nullable: true }).isString().withMessage('Agency must be a string').notEmpty().withMessage('Agency cannot be an empty string'),
  body('agency_url').optional({ nullable: true }).isString().withMessage('Agency URL must be a string').notEmpty().withMessage('Agency URL cannot be an empty string')
];

module.exports = {
  modelDataValid
};


// need: validTokenPresent validation schema


// need: modelDataValid validation schema

// need: photographerDataValid validation schema

// need: shootDataValid validation schema

// need: shootsOrderDataValid validation schema

module.exports = {
  paramsIsNumber,
  emailAndPasswordAreValid, 
  validContactFormData,
  modelDataValid
}