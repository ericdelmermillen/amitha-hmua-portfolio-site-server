const authController = require('../controllers/auth-controller.js');
const authRouter = require('express').Router();
const { validationResult } = require('express-validator');
const { emailAndPasswordAreValid } = require('../utils/validationSchemas.js');


// auth create user
authRouter.route('/createuser')
  .post(emailAndPasswordAreValid, (req, res, next) => {
    const errors = validationResult(req);
    const errorMsgs = errors.array().map(error => error.msg);
      
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    
    next();
  }, authController.createUser);


// auth login
authRouter.route('/login')
  .post(emailAndPasswordAreValid, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
  
  next();
}, authController.userLogin);


// auth refresh token
authRouter.route('/refresh')
  .post(authController.refreshToken);


// get signed AWS URL
authRouter.route('/getsignedURL')
  .get((req, res, next) => {
  next();
}, authController.getSignedURL);
  
  
// auth logout
authRouter.route('/logout')
  .post(authController.logout);


module.exports = authRouter;