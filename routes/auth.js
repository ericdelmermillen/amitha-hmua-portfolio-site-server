const authController = require('../controllers/auth-controller.js');
const authRouter = require('express').Router();

// *** import express validator to validate requests
// import { query, body, validationResult, matchedData } from 'express-validator';

// import validationSchemas necessary for each route

// need:
// 1) email and password present and valid schema, 
// 2) paramsIsNumber validation schema


// auth create user
authRouter.route('/createuser')
  .post(authController.createUser)


// auth login
authRouter.route('/login')
.post(authController.userLogin)


// auth logout
authRouter.route('/logout')
  .post(authController.logLogout)
  
  
module.exports = authRouter;