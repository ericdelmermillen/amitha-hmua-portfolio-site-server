const jwt = require('jsonwebtoken');
const knex = require("knex")(require("../knexfile.js"));
const { verifyToken, dateFormatOptions } = require('../utils/utils.js');


// get shoots with pagination
const getShootSummaries = async (req, res) => {

  try {
    const { page = 1, limit = 10 } = req.query; 

    // calling for page X therefore offset by X - 1
    const offset = (page - 1) * limit;

    const shoots = await knex('shoots')
      .select(
        'shoots.id as shoot_id',
        'shoots.shoot_date',
        'shoots.display_order',
        knex.raw('GROUP_CONCAT(DISTINCT photographers.photographer_name) AS photographers'),
        knex.raw('GROUP_CONCAT(DISTINCT models.model_name) AS models'),
        'shoots.shoot_title',
        'shoots.shoot_blurb',
        knex.raw('SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT photos.photo_url), ",", 1) AS photo_url')
      )
      .leftJoin('shoot_photographers', 'shoots.id', 'shoot_photographers.shoot_id')
      .leftJoin('photographers', 'shoot_photographers.photographer_id', 'photographers.id')
      .leftJoin('shoot_models', 'shoots.id', 'shoot_models.shoot_id')
      .leftJoin('models', 'shoot_models.model_id', 'models.id')
      .leftJoin('photos', 'shoots.id', 'photos.shoot_id')
      .groupBy('shoots.id', 'shoots.shoot_date', 'shoots.shoot_title', 'shoots.shoot_blurb')
      .orderBy('shoots.display_order')
      .limit(limit)
      .offset(offset);

    const shootsData = shoots.map(shoot => ({
      shoot_id: shoot.shoot_id,
      shoot_date: new Date(
        shoot.shoot_date).toISOString('en-US', dateFormatOptions
      ).split('T')[0],
      photographers: shoot.photographers.split(','),
      models: shoot.models.split(','),
      shoot_title: shoot.shoot_title,
      shoot_blurb: shoot.shoot_blurb,
      thumbnail_url: shoot.photo_url,
      display_order: shoot.display_order
    }));

  res.json(shootsData);

  } catch (error) {
    console.error('Error fetching shoot summaries:', error);
    res.status(500).send('Error fetching shoot summaries');
  }
}

// get shoot by id with all photos (max 10)
const getShootByID = async (req, res) => {
  try {
    const id = req.params.id;

    const shootExists = await knex('shoots').where({ id }).first();
    if (!shootExists) {
      return res.status(404).json({ error: 'Shoot not found' });
    }

    await knex.raw('SET SESSION group_concat_max_len = 2560');

    const shoot = await knex('shoots')
      .select(
        'shoots.id as shoot_id',
        'shoots.shoot_date',
        knex.raw('GROUP_CONCAT(DISTINCT photographers.photographer_name) AS photographers'),
        knex.raw('GROUP_CONCAT(DISTINCT models.model_name) AS models'),
        'shoots.shoot_title',
        'shoots.shoot_blurb',
        knex.raw('GROUP_CONCAT(DISTINCT photos.photo_url ORDER BY photos.id ASC SEPARATOR ",") AS photo_urls')
      )
      .leftJoin('shoot_photographers', 'shoots.id', 'shoot_photographers.shoot_id')
      .leftJoin('photographers', 'shoot_photographers.photographer_id', 'photographers.id')
      .leftJoin('shoot_models', 'shoots.id', 'shoot_models.shoot_id')
      .leftJoin('models', 'shoot_models.model_id', 'models.id')
      .leftJoin('photos', 'shoots.id', 'photos.shoot_id')
      .where('shoots.id', id)
      .groupBy('shoots.id', 'shoots.shoot_date', 'shoots.shoot_title', 'shoots.shoot_blurb');

      const shootData = {};
      shootData.shoot_id = shoot[0].shoot_id;
      shootData.shoot_date = new Date(
        shoot[0].shoot_date).toISOString('en-US', dateFormatOptions).split('T')[0];
      shootData.photographers = [];
      shootData.models = [];
      shootData.shoot_title = shoot[0].shoot_title;
      shootData.shoot_blurb = shoot[0].shoot_blurb;
      shootData.photo_urls = shoot[0].photo_urls.split(',');

    // Add values to each photographer object
    const photographers = shoot[0].photographers.split(',');
    
    for(const photographerName of photographers) {
      const photographer = await knex('photographers').where('photographer_name', photographerName).first();
      shootData.photographers.push(photographer);
    }

    // Add values to each model object
    const models = shoot[0].models.split(',');

    for(const modelName of models) {
      const model = await knex('models').where('model_name', modelName).first();
      shootData.models.push(model);
    }
    
    res.json(shootData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// add shoot 
// change so that the display order is set relative to the newly inserted shoots id: 1) insert shoot, 2) get max id of shoots table, 3) set display_order to be id
const addShoot = async (req, res) => {
  try {
    // const token = req.headers.authorization; 
    
    // if(!token) {
    //   return res.status(401).json({ message: 'Token Missing' });
    // }

    // verifyToken(token);

  } catch(error) {
    if (error.message === 'Token expired') {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error.message === 'Invalid token') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  const { 
    shoot_title, 
    shoot_blurb, 
    photographer_ids, 
    model_ids, 
    photo_urls
  } = req.body;

  let { shoot_date } = req.body;

  if(!shoot_date || !shoot_title || !shoot_blurb || !photographer_ids || !model_ids || !photo_urls) {
    return res.status(400).json({ message: 'Incomplete shoot submitted' });
  }

  // Convert shoot_date to SQL DATE format
  shoot_date = new Date(shoot_date).toISOString().slice(0, 10);
  
  try {
    // Start transaction
    await knex.transaction(async (trx) => {
      // const maxDisplayOrder = await trx('shoots').max('display_order').first();
      // const displayOrder = maxDisplayOrder.display_order || 0; // Default to 0 if no existing shoots

      const maxDisplayOrderResult = await trx('shoots').max('display_order as maxDisplayOrder').first();
      let maxDisplayOrder = maxDisplayOrderResult.maxDisplayOrder || 0;

      // Insert shoot
      const [ shootId ] = await trx('shoots').insert({
        shoot_date,
        shoot_title,
        shoot_blurb,
        display_order: maxDisplayOrder +1
      });

      // Check if all photographers exist
      for(const photographerId of photographer_ids) {
        const [existingPhotographer] = await trx('photographers').where('id', photographerId);
        if(!existingPhotographer) {
          throw new Error(`Photographer with ID ${photographerId} not found`);
        }
        // Link photographer to shoot
        await trx('shoot_photographers').insert({
          shoot_id: shootId,
          photographer_id: photographerId
        });
      }

      // Check if all models exist
      for(const modelId of model_ids) {
        const [existingModel] = await trx('models').where('id', modelId);
        if(!existingModel) {
          throw new Error(`Model with ID ${modelId} not found`);
        }
        // Link model to shoot
        await trx('shoot_models').insert({
          shoot_id: shootId,
          model_id: modelId
        });
      }

      // Insert photos
      for(const photoUrl of photo_urls) {
        await trx('photos').insert({
          shoot_id: shootId,
          photo_url: photoUrl
        });
      }
    });

    res.status(201).json({ message: 'Shoot added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};


// edit shoot by id
const editShootByID = async (req, res) => {
  // if(!token) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

// Verify the token
  // try {
  //   jwt.verify(token, process.env.JWT_SECRET);
  // } catch (err) {
  //   if(err.name === 'TokenExpiredError') {
  //     return res.status(401).json({ message: 'Token expired' });
  //   }
  // }
  
  const shootID = req.params.id;
  const { shoot_date, shoot_title, shoot_blurb, photographers, models, photo_urls } = req.body;

  try {
    await knex.transaction(async (trx) => {
      // Update shoot details in the shoots table
      await trx('shoots')
        .where({ id: shootID })
        .update({ shoot_date, shoot_title, shoot_blurb });

      // Update photographers for the shoot
      await trx('shoot_photographers')
        .where({ shoot_id: shootID })
        .del(); // Delete existing entries

      // Insert new photographer entries
      await trx('shoot_photographers').insert(
        photographers.map((photographer_id) => ({
          shoot_id: shootID,
          photographer_id,
        }))
      );

      // Update models for the shoot
      await trx('shoot_models').where({ shoot_id: shootID }).del(); // Delete existing entries

      // Insert new model entries
      await trx('shoot_models').insert(
        models.map((model_id) => ({
          shoot_id: shootID,
          model_id,
        }))
      );

      // Delete entries in the photo table where id is equal to shootID
      await trx('photos').where({ shoot_id: shootID }).del();

      await trx('photos').insert(
        photo_urls.map((photo_url) => ({
          shoot_id: shootID,
          photo_url,
        }))
      );
    });

    res.status(200).json({ message: 'Shoot updated successfully' });
  } catch (error) {
    console.error('Error editing shoot:', error);
    res.status(500).json({ message: 'Error editing shoot' });
  }
};


// delete shoots
const deleteShootByID = async (req, res) => {
  const token = req.headers.authorization; 

  // if(!token) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

// Verify the token
  // try {
  //   jwt.verify(token, process.env.JWT_SECRET);
  // } catch (err) {
  //   if(err.name === 'TokenExpiredError') {
  //     return res.status(401).json({ message: 'Token expired' });
  //   }
  // }

  try {
    const id = req.params.id;
    
    const shootExists = await knex('shoots').where({ id }).first();
    
    if(!shootExists) {
      return res.status(409).json({
        success: false,
        message: `Shoot number ${id} does not exist`,
      });
    }

    const deleted = await knex('shoots').where({ id }).del();

    if(!deleted) {
      return res.status(500).json({
        success: false,
        message: `Shoot number ${id} not deleted`,
      });
    }

    res.json({
      success: true,
      message: `Shoot number ${id} deleted successfully`,
    });
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Failed to delete shoot"});
  }
  console.log("shoot, photos, shoot_models, shoot_photographers entries deleted");
};


// route for updating shoots order: will need to either update the display order of all the shoots or overwrite/update all the shoots
const updateShootOrder = async (req, res) => {
  const token = req.headers.authorization; 
  if(!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

// Verify the token
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if(err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
  }
  
  const newShootsOrder = req.body;

  try {
    await Promise.all(
      newShootsOrder.map(async (update) => {
        const { shoot_id, display_order } = update;
        // Update the shoot record in the database with the new display_order
        await knex('shoots')
          .where({ id: shoot_id })
          .update({ display_order });
      })
    );

    res.status(200).json({ message: 'Shoots display order updated successfully' });
  } catch (error) {
    console.error('Error updating shoot display order:', error);
    res.status(500).json({ message: 'Error updating shoot display order' });
  }
};


// need to export all functions
module.exports = {
  getShootSummaries,
  getShootByID,
  addShoot,
  deleteShootByID,
  editShootByID,
  updateShootOrder
};