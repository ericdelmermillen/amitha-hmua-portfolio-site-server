import express from 'express';
import {
  // createUser,
  userLogin,
  refreshToken,
  getSignedURL,
  logout
} from '../controllers/auth-controller.mjs';
import { emailAndPasswordAreValid } from '../utils/validationSchemas.mjs';
import { validateToken, validateRequest } from '../middleware/middleware.mjs';

const authRouter = express.Router();


// auth create user
// authRouter.route("/createuser")
//   .post(validateRequest(emailAndPasswordAreValid), createUser);


// auth login
authRouter.route('/login')
  .post(validateRequest(emailAndPasswordAreValid), userLogin);


// auth refresh token
authRouter.route('/refresh')
  .post(refreshToken);


// get signed AWS URL
authRouter.route('/getsignedURL')
  .get(validateToken, getSignedURL);


// auth logout
authRouter.route('/logout')
  .post(logout);


export default authRouter;
