const { body, param } = require('express-validator');

const paramsIsNumber = [
  param('id').isInt().withMessage('ID must be a number')
];

const emailAndPasswordAreValid = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

const validContactFormData = [
  body('firstName')
    .notEmpty().withMessage('First Name is required.')
    .isLength({ min: 2, max: 25 }).withMessage('First Name must be between 2-25 characters long.'),
  body('lastName')
    .notEmpty().withMessage('Last Name is required.')
    .isLength({ min: 2, max: 50 }).withMessage('First Name must be between 2-25 characters long.'),
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 500 }).withMessage('Message must be between 10-500 characters long.'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('subject')
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 5, max: 100 }).withMessage('Subject must be between 5-100 characters long.'),
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 500 }).withMessage('Message must be between 10-500 characters long.')
  ];
  
const photographerDataValid = [
  body('photographer_name')
    .isString().notEmpty().withMessage('Photographer name must be a non-empty string')
    .isLength({ min: 2, max: 50 }).withMessage('Photographer Name must be between 2-50 characters long.')
];

const modelDataValid = [
  body('model_name')
    .isString().withMessage('Model Name must be a string')
    .notEmpty().withMessage('Model Name must be a non-empty string')
    .isLength({ min: 2, max: 50 }).withMessage('Model Name must be between 2-50 characters long.')
];

const tagDataValid = [
  body('tag_name')
    .isString().withMessage('Tag Name must be a string')
    .notEmpty().withMessage('Tag Name must be a non-empty string')
    .isLength({ min: 2, max: 50 }).withMessage('Tag Name must be between 2-50 characters long.')
];


const shootDataValid = [
  body('shoot_date')
    .isString().withMessage('Shoot date must be a string')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Shoot date must be in YYYY-MM-DD format'),
  body('photographer_ids')
    .isString().withMessage('Photographer IDs must be provided as a string')
    .isLength({ min: 1 }).withMessage('At least one photographer ID is required')
    .custom(ids => ids.split(',').every(id => /^\d+$/.test(id.trim()))).withMessage('Each photographer ID must be a number'),
  body('model_ids')
    .isString().withMessage('Model IDs must be provided as a string')
    .isLength({ min: 1 }).withMessage('At least one model ID is required')
    .custom(ids => ids.split(',').every(id => /^\d+$/.test(id.trim()))).withMessage('Each model ID must be a number')
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


module.exports = {
  paramsIsNumber,
  emailAndPasswordAreValid, 
  validContactFormData,
  photographerDataValid,
  modelDataValid,
  tagDataValid,
  shootDataValid,
  shootsOrderDataValid,
  photoOrderDataValid
};