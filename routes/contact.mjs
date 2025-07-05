import express from 'express';
import { handleContactForm } from '../controllers/contact-controller.mjs';
import { validContactFormData } from '../utils/validationSchemas.mjs';
import { validateRequest } from '../middleware/middleware.mjs';

const contactRouter = express.Router();

contactRouter.route('/')
  .post(validateRequest(validContactFormData), handleContactForm);

export default contactRouter;
