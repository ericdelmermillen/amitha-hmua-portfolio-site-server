import { Router } from 'express';
import {
  getShootSummaries,
  getShootByID,
  addShoot,
  editShootByID,
  deleteShootByID,
  updateShootOrder
} from '../controllers/shoots-controller.mjs';

import {
  paramsIsNumber,
  shootDataValid,
  shootsOrderDataValid
} from '../utils/validationSchemas.mjs';

import {
  validateToken,
  validateRequest
} from '../middleware/middleware.mjs';

const shootsRouter = Router();

// GET /shoots/all
shootsRouter.route('/all')
  .get(getShootSummaries);

// GET /shoots/shoot/:id
shootsRouter.route('/shoot/:id')
  .get(validateRequest(paramsIsNumber), getShootByID);

// POST /shoots/add
shootsRouter.route('/add')
  .post(validateToken, validateRequest(shootDataValid), addShoot);

// PUT /shoots/edit/:id
shootsRouter.route('/edit/:id')
  .put(validateToken, validateRequest(paramsIsNumber), editShootByID);

// DELETE /shoots/delete/:id
shootsRouter.route('/delete/:id')
  .delete(validateToken, validateRequest(paramsIsNumber), deleteShootByID);

// PATCH /shoots/updateorder
shootsRouter.route('/updateorder')
  .patch(validateToken, validateRequest(shootsOrderDataValid), updateShootOrder);

export default shootsRouter;
