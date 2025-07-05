import express from 'express';
import { getAllTags, addTag, editTagById, deleteTagByID } from '../controllers/tags-controller.mjs';
import { paramsIsNumber, tagDataValid } from '../utils/validationSchemas.mjs';
import { validateToken, validateRequest } from '../middleware/middleware.mjs';

const tagsRouter = express.Router();

tagsRouter.route('/all')
  .get(getAllTags);

tagsRouter.route('/add')
  .post(validateToken, validateRequest(tagDataValid), addTag);

tagsRouter.route('/edit/:id')
  .put(validateToken, validateRequest(paramsIsNumber, tagDataValid), editTagById);

tagsRouter.route('/delete/:id')
  .delete(validateToken, validateRequest(paramsIsNumber), deleteTagByID);

export default tagsRouter;
