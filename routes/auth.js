const authController = require('../controllers/auth-controller.js');
const authRouter = require('express').Router();


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