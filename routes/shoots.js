const shootsController = require('../controllers/shoots-controller.js');
const shootsRouter = require('express').Router();
const { query, body, validationResult, matchedData } = require('express-validator');
const { paramsIsNumber, shootDataValid } = require('../utils/validationSchemas.js');

// need:
// 3) shootsOrderDataValid validation schema



// GET shoots 
shootsRouter.route('/all')
  .get(shootsController.getShootSummaries);


// GET shoot by id
shootsRouter.route('/shoot/:id')
  .get(paramsIsNumber, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, shootsController.getShootByID);
  

// POST /shoots/add
// client needs to be able to compress then send uploaded photo(s) to AWS abd receive the urls back to be able to add them to the db
shootsRouter.route('/add')
  .post(shootDataValid, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, shootsController.addShoot);


// edit shoot by id
shootsRouter.route('/edit/:id')
  .put(paramsIsNumber, shootDataValid, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, shootsController.editShootByID);



// // updateshootphotoorder by id
shootsRouter.patch('/updateshootphotoorder/:id', (req, res) => {
  // res.send({msg: "from editPhotoOrderByShootID"})
}, shootsController.editPhotoOrderByShootID)



// delete shoot
shootsRouter.route('/delete/:id')
  .delete(paramsIsNumber, (req, res, next) => {
    const errors = validationResult(req);

    const errorMsgs = errors.array().map(error => error.msg);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errorMsgs });
    }
    next();
  }, shootsController.deleteShootByID);
  
// edit shoots order
shootsRouter.route('/updateorder')
  .patch(shootsController.updateShootOrder);


module.exports = shootsRouter;