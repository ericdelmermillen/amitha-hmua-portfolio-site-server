const authController = require('../controllers/auth-controller.js');
const authRouter = require('express').Router();
const { emailAndPasswordAreValid } = require('../utils/validationSchemas.js');
const { validateToken, validateRequest } = require("./middleware/middleware.js");


// auth create user
authRouter.route("/createuser")
  .post(validateRequest(emailAndPasswordAreValid), authController.createUser);


// auth login
authRouter.route('/login')
  .post(validateRequest(emailAndPasswordAreValid), authController.userLogin);


// auth refresh token
authRouter.route('/refresh')
  .post(authController.refreshToken);


// get signed AWS URL
authRouter.route('/getsignedURL')
  .get(validateToken, authController.getSignedURL);
  

// auth logout
authRouter.route('/logout')
  .post(authController.logout);


module.exports = authRouter;