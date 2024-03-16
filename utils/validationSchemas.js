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
  body('subject')
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 5, max: 100 }).withMessage('Subject must be between 5-100 characters long.'),
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 500 }).withMessage('Message must be between 10-500 characters long.')
  ];
  
//   const modelDataValid = [
//     body('model_name')
//       .isString().withMessage('Model Name must be a string')
//       .notEmpty().withMessage('Model Name must be a non-empty string')
//       .isLength({ min: 2, max: 50 }).withMessage('Model Name must be between 2-50 characters long.'),
//     body('agency')
//       .isString().withMessage('Agency Name must be a string')
//       .notEmpty().withMessage('Agency Name must be a non-empty string')
//       .optional({ nullable: true }).isString().withMessage('Agency must be a string').notEmpty().withMessage('Agency cannot be an empty string')
//       .isLength({ min: 2, max: 50 }).withMessage('Agency Name must be between 2-50 characters long.'),
//     body('agency_url')
//       .optional({ nullable: true })
//       .isString().withMessage('Agency URL must be a string')
//       .notEmpty().withMessage('Agency URL cannot be an empty string')
//       .isURL().withMessage('Agency URL must be a valid URL')
// ];


const modelDataValid = [
  body('model_name')
    .isString().withMessage('Model Name must be a string')
    .notEmpty().withMessage('Model Name must be a non-empty string')
    .isLength({ min: 2, max: 50 }).withMessage('Model Name must be between 2-50 characters long.'),
  body('agency')
    .optional({ nullable: true })
    .isString().withMessage('Agency Name must be a string')
    .notEmpty().withMessage('Agency Name must be a non-empty string')
    .isLength({ min: 2, max: 50 }).withMessage('Agency Name must be between 2-50 characters long.'),
  body('agencyURL')
    .optional({ nullable: true })
    .isURL().withMessage('Agency URL must be a valid URL')
];



const photographerDataValid = [
  body('photographer_name')
    .isString().notEmpty().withMessage('Photographer name must be a non-empty string')
    .isLength({ min: 2, max: 50 }).withMessage('Photographer Name must be between 2-50 characters long.'),
  body('websiteURL')
    .optional({ nullable: true })
    .isURL().withMessage('Website URL must be a valid URL'),
  body('instagramURL')
    .optional({ nullable: true })
    .isURL().withMessage('Instagram URL must be a valid URL'),
  body('facebookURL')
    .optional({ nullable: true })
    .isURL().withMessage('Facebook URL must be a valid URL'),
  body('twitterURL')
    .optional({ nullable: true })
    .isURL().withMessage('Twitter URL must be a valid URL'),
  body('pinterestURL')
    .optional({ nullable: true })
    .isURL().withMessage('Pinterest URL must be a valid URL')
];


const shootDataValid = [
  body('shoot_date')
    .isString().withMessage('Shoot date must be a string')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Shoot date must be in YYYY-MM-DD format'),
  body('shoot_title')
    .isString().withMessage('Shoot title must be a string')
    .isLength({ min: 3, max: 50 }).withMessage('Shoot title must be between 3 and 50 characters long'),
  body('shoot_blurb')
    .isString().withMessage('Shoot blurb must be a string')
    .isLength({ min: 10, max: 1000 }).withMessage('Shoot blurb must be between 10 and 255 characters long'),
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


const photoOrderDataValid = [
  body('new_photo_order')
    .isArray({ min: 1 }).withMessage('At least one photo order update is required')
    .custom(updates => updates.every(update => 
      'photo_id' in update && typeof update.photo_id === 'number' && 
      'display_order' in update && typeof update.display_order === 'number'
    )).withMessage('Each update must have photo_id and display_order as numbers')
];


const shootsOrderDataValid = [
  body('new_shoot_order')
    .isArray({ min: 1 }).withMessage('At least one shoot order update is required')
    .custom(updates => updates.every(update => 
      'shoot_id' in update && typeof update.shoot_id === 'number' && 
      'display_order' in update && typeof update.display_order === 'number'
    )).withMessage('Each update must have shoot_id and display_order as numbers')
];


// Helper function to validate URL
function isValidURL(url) {
  // Regular expression to check URL format
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};


// need: validTokenPresent validation schema

module.exports = {
  paramsIsNumber,
  emailAndPasswordAreValid, 
  validContactFormData,
  modelDataValid,
  photographerDataValid,
  shootDataValid,
  shootsOrderDataValid,
  photoOrderDataValid
};