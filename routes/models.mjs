import express from 'express';
import { 
  getAllModels, 
  addModel, 
  editModelById, 
  deleteModelByID 
} from '../controllers/models-controller.mjs';
import { paramsIsNumber, modelDataValid } from '../utils/validationSchemas.mjs';
import { validateToken, validateRequest } from '../middleware/middleware.mjs';

const modelsRouter = express.Router();

modelsRouter.route('/all')
  .get(getAllModels)

modelsRouter.route('/add')
  .post(validateToken, validateRequest(modelDataValid), addModel);

modelsRouter.route('/:id')
  .put(validateToken, validateRequest(paramsIsNumber, modelDataValid), editModelById)

modelsRouter.route('/delete/:id')
  .delete(validateToken, validateRequest(paramsIsNumber), deleteModelByID);

modelsRouter.route('/edit/:id')
  .put(validateToken, validateRequest(paramsIsNumber, modelDataValid), editModelById)

export default modelsRouter;
