const { query, body, param, validationResult, matchedData } = require('express-validator');

const paramsIsNumber = [
  param('id').isInt().withMessage('ID must be a number')
];


// need: email and password present and valid validation schema


// need: validTokenPresent validation schema

// need: validContactFormData validation schema

// need: modelDataValid validation schema

// need: photographerDataValid validation schema

// need: shootDataValid validation schema

// need: shootsOrderDataValid validation schema

module.exports = {
  paramsIsNumber
}