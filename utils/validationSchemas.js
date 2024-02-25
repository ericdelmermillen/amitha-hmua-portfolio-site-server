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

const addModelDataValid = [
  body('model_name').isString().notEmpty().withMessage('Name must be a non-empty string'),
  body('agency').optional({ nullable: true }).isString().withMessage('Agency must be a string').notEmpty().withMessage('Agency cannot be an empty string'),
  body('agency_url').optional({ nullable: true }).isString().withMessage('Agency URL must be a string').notEmpty().withMessage('Agency URL cannot be an empty string')
];

const addPhotographerDataValid = [
  body('photographer_name').isString().notEmpty().withMessage('Photographer name must be a non-empty string'),
  body('websiteURL').optional({ nullable: true }).isString().withMessage('Website URL must be a string').notEmpty().withMessage('Website URL cannot be an empty string'),
  body('instagramURL').optional({ nullable: true }).isString().withMessage('Instagram URL must be a string').notEmpty().withMessage('Instagram URL cannot be an empty string'),
  body('facebookURL').optional({ nullable: true }).isString().withMessage('Facebook URL must be a string').notEmpty().withMessage('Facebook URL cannot be an empty string'),
  body('twitterURL').optional({ nullable: true }).isString().withMessage('Twitter URL must be a string').notEmpty().withMessage('Twitter URL cannot be an empty string'),
  body('pinterestURL').optional({ nullable: true }).isString().withMessage('Pinterest URL must be a string').notEmpty().withMessage('Pinterest URL cannot be an empty string')
];


// need: validTokenPresent validation schema


// need: photographerDataValid validation schema

// need: shootDataValid validation schema

// need: shootsOrderDataValid validation schema

module.exports = {
  paramsIsNumber,
  emailAndPasswordAreValid, 
  validContactFormData,
  addModelDataValid,
  addPhotographerDataValid
}