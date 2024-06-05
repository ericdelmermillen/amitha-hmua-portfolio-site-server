const shootsController = require('../controllers/shoots-controller.js');
const shootsRouter = require('express').Router();
const { paramsIsNumber, shootDataValid, shootsOrderDataValid } = require('../utils/validationSchemas.js');
const { validateToken, validateRequest } = require("../middleware/middleware.js");


// GET shoots 
shootsRouter.route('/all')
  .get(shootsController.getShootSummaries);


// GET shoot by id
shootsRouter.route('/shoot/:id')
  .get(validateRequest(paramsIsNumber), shootsController.getShootByID);
  

// POST /shoots/add
shootsRouter.route('/add')
  .post(validateToken, validateRequest(shootDataValid), shootsController.addShoot);


  // PUT /shoots/edit/:id
shootsRouter.route('/edit/:id')
  .put(validateToken, validateRequest(paramsIsNumber), shootsController.editShootByID);

// delete shoot
shootsRouter.route('/delete/:id')
  .delete(validateToken, validateRequest(paramsIsNumber), shootsController.deleteShootByID);
  

// edit shoots order
shootsRouter.route('/updateorder')
  .patch(validateToken, validateRequest(shootsOrderDataValid), shootsController.updateShootOrder);


module.exports = shootsRouter;