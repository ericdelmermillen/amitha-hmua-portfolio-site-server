const express = require('express');
const app = express();


// --- setting up for migrations: commented out line works with original knexfile.js set up: new lines work with config setup
// const knex = require("knex")(require("../knexfile.js"));
const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
// ---

const { dateFormatOptions } = require('../utils/utils.js');
const { deleteFiles } = require("../s3.js");

const AWS_BUCKET_PATH = process.env.AWS_BUCKET_PATH;
const AWS_SHOOTS_DIRNAME = process.env.AWS_SHOOTS_DIRNAME;


// get shoots with pagination
const getShootSummaries = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    // Get tag_id from query params
    const tag_id = req.query.tag_id;

    // Calling for page X therefore offset by X - 1
    const offset = (page - 1) * limit;

    // Build the query to select shoots
    const shootsQuery = knex('shoots')
      .select(
        'shoots.id as shoot_id',
        'shoots.shoot_date',
        'shoots.display_order',
        knex.raw('GROUP_CONCAT(DISTINCT photographers.photographer_name) AS photographers'),
        knex.raw('GROUP_CONCAT(DISTINCT models.model_name) AS models'),
        knex.raw('GROUP_CONCAT(DISTINCT tags.tag_name) AS tags'),
        knex.raw('SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT photos.photo_url ORDER BY photos.display_order ASC), ",", 1) AS photo_url')
      )
      .leftJoin('shoot_photographers', 'shoots.id', 'shoot_photographers.shoot_id')
      .leftJoin('photographers', 'shoot_photographers.photographer_id', 'photographers.id')
      .leftJoin('shoot_models', 'shoots.id', 'shoot_models.shoot_id')
      .leftJoin('models', 'shoot_models.model_id', 'models.id')
      .leftJoin('photos', 'shoots.id', 'photos.shoot_id')
      .leftJoin('shoot_tags', 'shoots.id', 'shoot_tags.shoot_id')
      .leftJoin('tags', 'shoot_tags.tag_id', 'tags.id') 
      .groupBy('shoots.id', 'shoots.shoot_date')
      .orderBy('shoots.display_order')
      .limit(limit)
      .offset(offset);

    // Apply tag_id filter if provided
    if(tag_id !== undefined) {
      shootsQuery.whereExists(function() {
        this.select(knex.raw(1))
          .from('shoot_tags')
          .whereRaw('shoot_tags.shoot_id = shoots.id')
          .where('shoot_tags.tag_id', tag_id);
      });
    }

    // Execute the query
    const shoots = await shootsQuery;

    // Format the shoot data
    const shootSummaries = shoots.map(shoot => ({
      shoot_id: shoot.shoot_id,
      display_order: shoot.display_order,
      shoot_date: new Date(shoot.shoot_date).toISOString('en-US', dateFormatOptions).split('T')[0],
      tags: shoot.tags.split(','),
      photographers: shoot.photographers.split(','),
      models: shoot.models.split(','),
      // for testing: photos stored as urls vs photos stored as S3 object names
      thumbnail_url: shoot.photo_url.includes("http") 
        ? shoot.photo_url
        : `${AWS_BUCKET_PATH}${AWS_SHOOTS_DIRNAME}/${shoot.photo_url}`
    }));

    const isFinalPage = shoots.length === 0;
    const responseData = {
      shootSummaries,
      isFinalPage
    };

    return res.json(responseData);
  } catch (error) {
    console.error('Error fetching shoot summaries:', error);
    return res.status(500).send('Error fetching shoot summaries');
  }
};


// get shoot by id with all photos (max 10)
const getShootByID = async (req, res) => {
  try {
    const id = req.params.id;

    const shootExists = await knex('shoots').where({ id }).first();

    if(!shootExists) {
      return res.status(404).json({ error: 'Shoot not found' });
    }

    // will this be an issue when posting the db to aws? ---
    await knex.raw('SET SESSION group_concat_max_len = 2560');
    // --

    const shoot = await knex('shoots')
      .select(
        'shoots.id as shoot_id',
        'shoots.shoot_date',
        knex.raw('GROUP_CONCAT(DISTINCT photographers.id) AS photographer_ids'),
        knex.raw('GROUP_CONCAT(DISTINCT photographers.photographer_name) AS photographers'),
        knex.raw('GROUP_CONCAT(DISTINCT models.id) AS model_ids'), 
        knex.raw('GROUP_CONCAT(DISTINCT models.model_name) AS models'),
        knex.raw('GROUP_CONCAT(DISTINCT tags.id) AS tag_ids'), 
        knex.raw('GROUP_CONCAT(DISTINCT tags.tag_name) AS tags'),
        knex.raw('GROUP_CONCAT(DISTINCT photos.display_order ORDER BY photos.display_order ASC) AS display_orders'),
        knex.raw('GROUP_CONCAT(DISTINCT photos.photo_url ORDER BY photos.display_order ASC) AS photo_urls'),
        knex.raw('GROUP_CONCAT(DISTINCT photos.id ORDER BY photos.display_order ASC) AS photo_ids')
      )
      .leftJoin('shoot_photographers', 'shoots.id', 'shoot_photographers.shoot_id')
      .leftJoin('photographers', 'shoot_photographers.photographer_id', 'photographers.id')
      .leftJoin('shoot_models', 'shoots.id', 'shoot_models.shoot_id')
      .leftJoin('models', 'shoot_models.model_id', 'models.id')
      .leftJoin('photos', 'shoots.id', 'photos.shoot_id')
      .leftJoin('shoot_tags', 'shoots.id', 'shoot_tags.shoot_id')
      .leftJoin('tags', 'shoot_tags.tag_id', 'tags.id')
      .where('shoots.id', id)
      .groupBy('shoots.id', 'shoots.shoot_date');
    
    const shootData = {};
    shootData.shoot_id = shoot[0].shoot_id;
    shootData.shoot_date = new Date(shoot[0].shoot_date).toISOString('en-US', dateFormatOptions).split('T')[0];
    shootData.tag_ids = shoot[0].tag_ids.split(',');
    shootData.tags = shoot[0].tags.split(',');
    shootData.photographer_ids = shoot[0].photographer_ids.split(',');
    shootData.photographers = shoot[0].photographers.split(',');
    shootData.model_ids = shoot[0].model_ids.split(',');
    shootData.models = shoot[0].models.split(',');

    // Create an array of distinct photo objects with id, photo_url, and display_order properties
    const displayOrders = shoot[0].display_orders.split(',');
    const photoUrls = shoot[0].photo_urls.split(',');
    const photoIds = shoot[0].photo_ids.split(','); 
    const photo_urls = [];
    const seenIds = new Set(); // Keep track of seen photo ids to ensure uniqueness
    displayOrders.forEach((order, idx) => {
      const id = parseInt(photoIds[idx]);
      if(!seenIds.has(id)) {
        photo_urls.push({
          id,
          display_order: parseInt(order),
          // for testing: photos stored as urls vs photos stored as S3 object names
          photo_url: photoUrls[idx].includes("http")
            ? photoUrls[idx]
            : `${AWS_BUCKET_PATH}${AWS_SHOOTS_DIRNAME}/${photoUrls[idx]}`
        });
        seenIds.add(id);
      }
    });

    shootData.tag_ids = shoot[0].tag_ids.split(',');
    shootData.tags = shoot[0].tags.split(',');
    shootData.photo_urls = photo_urls;

    return res.json(shootData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// add shoot 
const addShoot = async (req, res) => {

  let {
    shoot_date,
    tag_ids,
    photographer_ids,
    model_ids,
    photo_urls,
    dirname
  } = req.body;

    // Check for required fields
  if(!photo_urls || !photo_urls.length) {
    return res.status(400).json({ message: 'Photos not added' });
  }

  shoot_date = new Date(req.body.shoot_date).toISOString().slice(0, 10);
  
  try {
    // Start transaction
    await knex.transaction(async (trx) => {
      // Increment the display_order for existing shoots
      await trx('shoots').update('display_order', trx.raw('display_order + 1'));

      // Insert the new shoot
      const [ shootId ] = await trx('shoots').insert({
        shoot_date,
        display_order: 1
      });

      // Link tags to the shoot
      for(const tagId of tag_ids) {
        const [ existingTag ] = await trx('tags').where('id', tagId);
        if(!existingTag) {
          throw new Error(`Tag with ID ${tagId} not found`);
        }
        // Link model to shoot
        await trx('shoot_tags').insert({
          shoot_id: shootId,
          tag_id: tagId
        });
      }

      // Link photographers to the shoot
      for(const photographerId of photographer_ids) {
        const [ existingPhotographer ] = await trx('photographers').where('id', photographerId);
        if(!existingPhotographer) {
          throw new Error(`Photographer with ID ${photographerId} not found`);
        }
        // Link photographer to shoot
        await trx('shoot_photographers').insert({
          shoot_id: shootId,
          photographer_id: photographerId
        });
      }

      // Link models to the shoot
      for(const modelId of model_ids) {
        const [ existingModel ] = await trx('models').where('id', modelId);
        if(!existingModel) {
          throw new Error(`Model with ID ${modelId} not found`);
        }
        // Link model to shoot
        await trx('shoot_models').insert({
          shoot_id: shootId,
          model_id: modelId
        });
      }

      // Insert photo URLs
      for(const photoUrl of photo_urls) {
        // await trx('photos').insert({
        await trx('photos').insert({
          shoot_id: shootId,
          photo_url: photoUrl
        });
      }
    });

    return res.status(201).json({ message: 'Shoot added successfully' });
  } catch (error) {
    
    // delete aws objs on fail
    try {
      const objKeys = photo_urls.map(url => `${AWS_SHOOTS_DIRNAME}/${url}`);
      await deleteFiles(objKeys);
    } catch (deleteError) {
      console.error('Error deleting files from AWS:', deleteError);
    }
    
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// edit shoot
const editShootByID = async (req, res) => {

  const { id } = req.params;

  // Check if the shoot exists
  const existingShoot = await knex('shoots').where('id', id).first();

  if(!existingShoot) {
    return res.status(404).json({ message: 'Shoot not found' });
  }

  let {
    shoot_date,
    tag_ids,
    photographer_ids,
    model_ids,
    photo_urls
  } = req.body;
  
  // Check for required fields
  if(!photo_urls || !photo_urls.length) {
    return res.status(400).json({ message: 'Photos not added' });
  }

  shoot_date = new Date(req.body.shoot_date).toISOString().slice(0, 10);
  
  try {
    // Start transaction
    await knex.transaction(async (trx) => {
    
      // get the photo obj keys
      const photoObjKeys = await trx('photos')
        .select('photo_url')
        .where('shoot_id', id);
      
      // Update shoot details
      await trx('shoots')
        .where('id', id)
        .update({
          shoot_date
        });

      // Delete existing associations
      await trx('shoot_photographers').where('shoot_id', id).del();
      await trx('shoot_models').where('shoot_id', id).del();
      await trx('shoot_tags').where('shoot_id', id).del();
      await trx('photos').where('shoot_id', id).del();

      // Prepare AWS object keys for deletion
      const objKeys = [];

      for(const obj of photoObjKeys) {
        // get rid of dummy urls
        if(!obj.photo_url.includes("http") && !photo_urls.includes(obj.photo_url)) {
          objKeys.push(`${AWS_SHOOTS_DIRNAME}/${obj.photo_url}`);
        }
      }
      
      try {
        // Deleting AWS objects after successful deletion of shoot data
        const deleteResponse = await deleteFiles(objKeys);
        // Check if deletion was successful
        if(!deleteResponse) {
          throw new Error("Error deleting files from AWS");
        }
      } catch(error) {
        // Handle errors in AWS object deletion
        console.error("Error deleting file from AWS:", error);
        return res.status(500).send("Error deleting files from AWS");
      }

      // Link photographers to the shoot
      for(const photographerId of photographer_ids) {
        const [ existingPhotographer ] = await trx('photographers').where('id', photographerId);
        if(!existingPhotographer) {
          throw new Error(`Photographer with ID ${photographerId} not found`);
        }
        // Link photographer to shoot
        await trx('shoot_photographers').insert({
          shoot_id: id,
          photographer_id: photographerId
        });
      }
      
      // Link models to the shoot
      for(const modelId of model_ids) {
        const [ existingModel ] = await trx('models').where('id', modelId);
        if(!existingModel) {
          throw new Error(`Model with ID ${modelId} not found`);
        }
        // Link model to shoot
        await trx('shoot_models').insert({
          shoot_id: id,
          model_id: modelId
        });
      }

      // Link tags to the shoot
      for(const tagId of tag_ids) {
        const [ existingTag ] = await trx('tags').where('id', tagId);
        if(!existingTag) {
          throw new Error(`Tag with ID ${tagId} not found`);
        }
        // Link tag to shoot
        await trx('shoot_tags').insert({
          shoot_id: id,
          tag_id: tagId
        });
      }

      // Insert photo URLs
      for(const photoUrl of photo_urls) {
        await trx('photos').insert({
          shoot_id: id,
          photo_url: photoUrl
        });
      }
    });
    
    return res.status(200).json({ message: 'Shoot updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// delete shoot
const deleteShootByID = async (req, res) => {

  try {
    const { id } = req.params;

    let photoObjKeys;

    // Start a transaction
    await knex.transaction(async (trx) => {
      // get the photo obj keys
      photoObjKeys = await trx('photos')
        .select('photo_url')
        .where('shoot_id', id);
      
      // Delete photos
      await trx('photos').where('shoot_id', id).del();

      // Delete shoot_models
      await trx('shoot_models').where('shoot_id', id).del();

      // Delete shoot_photographers
      await trx('shoot_photographers').where('shoot_id', id).del();

      // Delete shoot_tags
      await trx('shoot_tags').where('shoot_id', id).del();

      // Delete the shoot itself
      const deleted = await trx('shoots').where('id', id).del();

      if(!deleted) {
        throw new Error(`Shoot number ${id} not deleted`);
      }
    });

    // Prepare AWS object keys for deletion
    const objKeys = [];

    for(const obj of photoObjKeys) {
      // get rid of dummy urls
      if(!obj.photo_url.includes("http")) {
        // objKeys.push(`images/${obj.photo_url}`);
        objKeys.push(`${AWS_SHOOTS_DIRNAME}/${obj.photo_url}`);
      }
    }

    // aws obj deleting ---
    try {
      // Deleting AWS objects after successful deletion of shoot data
      const deleteResponse = await deleteFiles(objKeys);
      // Check if deletion was successful
      if(deleteResponse) {
        return res.json({
          success: true,
          message: `Shoot number ${id} and associated files deleted successfully`
        });
      } else {
        throw new Error("Error deleting files from AWS");
      }
    } catch(error) {
      // Handle errors in AWS object deletion
      console.error("Error deleting file from AWS:", error);
      return res.status(500).send("Error deleting files from AWS");
    }
  } catch(error) {
    // Handle errors in shoot data deletion
    console.error(error);
    return res.status(500).json({ error: "Failed to delete shoot" });
  }
};


// route for updating shoots order: update the display order of all the shoots
const updateShootOrder = async (req, res) => {

  const newShootsOrder = req.body.new_shoot_order;

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

    return res.status(200).json({ message: 'Shoots display order updated successfully' });
  } catch (error) {
    console.error('Error updating shoot display order:', error);
    return res.status(500).json({ message: 'Error updating shoot display order' });
  }
};


module.exports = {
  getShootSummaries,
  getShootByID,
  addShoot,
  deleteShootByID,
  editShootByID,
  updateShootOrder
};