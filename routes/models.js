const modelsController = require('../controllers/models-controller.js');
const modelsRouter = require('express').Router();
const { paramsIsNumber, modelDataValid } = require('../utils/validationSchemas.js');
const { validateToken } = require("./middleware/middleware.js");
const { validateRequest } = require("./middleware/middleware.js");


// get models route
modelsRouter.route('/all')
  .get(modelsController.getAllModels);


// add model route  
modelsRouter.route('/add')
  .post(validateToken, validateRequest(modelDataValid), modelsController.addModel);
  
  
// edit model by id route  
modelsRouter.route('/edit/:id')
  .put(validateToken, validateRequest(paramsIsNumber, modelDataValid), modelsController.editModelById);

  
// delete model route
modelsRouter.route('/delete/:id')
  .delete(validateToken, validateRequest(paramsIsNumber), modelsController.deleteModelByID);


module.exports = modelsRouter;