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

const photographerDataValid = [
  body('photographer_name').isString().notEmpty().withMessage('Photographer name must be a non-empty string'),
  body('websiteURL').optional({ nullable: true }).isString().withMessage('Website URL must be a string').notEmpty().withMessage('Website URL cannot be an empty string'),
  body('instagramURL').optional({ nullable: true }).isString().withMessage('Instagram URL must be a string').notEmpty().withMessage('Instagram URL cannot be an empty string'),
  body('facebookURL').optional({ nullable: true }).isString().withMessage('Facebook URL must be a string').notEmpty().withMessage('Facebook URL cannot be an empty string'),
  body('twitterURL').optional({ nullable: true }).isString().withMessage('Twitter URL must be a string').notEmpty().withMessage('Twitter URL cannot be an empty string'),
  body('pinterestURL').optional({ nullable: true }).isString().withMessage('Pinterest URL must be a string').notEmpty().withMessage('Pinterest URL cannot be an empty string')
];


const shootDataValid = [
  body('shoot_date')
    .isString().withMessage('Shoot date must be a string')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Shoot date must be in YYYY-MM-DD format'),
  body('shoot_title')
    .isString().withMessage('Shoot title must be a string')
    .isLength({ min: 3, max: 255 }).withMessage('Shoot title must be between 3 and 255 characters long'),
  body('shoot_blurb')
    .isString().withMessage('Shoot blurb must be a string')
    .isLength({ min: 10, max: 255 }).withMessage('Shoot blurb must be between 10 and 255 characters long'),
  body('photographer_ids')
    .isArray({ min: 1 }).withMessage('At least one photographer ID is required')
    .custom(ids => ids.every(id => typeof id === 'number')).withMessage('Each photographer ID must be a number'),
  body('model_ids')
    .isArray({ min: 1 }).withMessage('At least one model ID is required')
    .custom(ids => ids.every(id => typeof id === 'number')).withMessage('Each model ID must be a number'),
  body('photo_urls')
    .isArray({ min: 1 }).withMessage('At least one photo URL is required')
    .custom(urls => urls.every(url => typeof url === 'string' && isValidURL(url))).withMessage('Each photo URL must be a valid URL')
];

// Helper function to validate URL
function isValidURL(url) {
  // Regular expression to check URL format
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};


const shootsOrderDataValid = [
  body('new_shoot_order')
    .isArray({ min: 1 }).withMessage('At least one shoot order update is required')
    .custom(updates => updates.every(update => 
      'shoot_id' in update && typeof update.shoot_id === 'number' && 
      'display_order' in update && typeof update.display_order === 'number'
    )).withMessage('Each update must have shoot_id and display_order as numbers')
];




// need: shootsOrderDataValid validation schema


// need: validTokenPresent validation schema





module.exports = {
  paramsIsNumber,
  emailAndPasswordAreValid, 
  validContactFormData,
  modelDataValid,
  photographerDataValid,
  shootDataValid,
  shootsOrderDataValid
};