import express from 'express';
import { getAllModels, addModel, editModelById, deleteModelByID } from '../controllers/models-controller.mjs';
import { paramsIsNumber, modelDataValid } from '../utils/validationSchemas.mjs';
import { validateToken, validateRequest } from '../middleware/middleware.mjs';

const modelsRouter = express.Router();

modelsRouter.route('/')
  .get(getAllModels)
  .post(validateToken, validateRequest(modelDataValid), addModel);

modelsRouter.route('/:id')
  .put(validateToken, validateRequest(paramsIsNumber, modelDataValid), editModelById)
  .delete(validateToken, validateRequest(paramsIsNumber), deleteModelByID);

export default modelsRouter;
