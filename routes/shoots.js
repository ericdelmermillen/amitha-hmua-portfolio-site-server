const shootsRouter = require('express').Router();
const shootsController = require('../controllers/shoots-controller.js');

// GET shoots 
shootsRouter.route('/all')
  .get(shootsController.getShootSummaries);


// GET shoot by id
shootsRouter.route('/shoot/:id')
  .get(shootsController.getShootByID);
  

// POST /shoots/add
// client needs to be able to compress then send uploaded photo(s) to AWS abd receive the urls back to be able to add them to the db
shootsRouter.route('/add')
  .post(shootsController.addShoot);


// edit shoot by id
shootsRouter.route('/edit/:id')
  .put(shootsController.editShootByID);


// delete shoot
shootsRouter.route('/delete/:id')
  .delete(shootsController.deleteShootByID);
  
// edit shoots order
shootsRouter.route('/updateorder')
  .patch(shootsController.updateShootOrder);


module.exports = shootsRouter;