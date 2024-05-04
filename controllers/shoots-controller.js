const knex = require("knex")(require("../knexfile.js"));
const { verifyToken, dateFormatOptions } = require('../utils/utils.js');
const { s3Uploadv3 } = require("../s3Service.js");
const AWS_BUCKET_BASE_URL = process.env.AWS_BUCKET_BASE_URL;

// get shoots with pagination
const getShootSummaries = async (req, res) => {
  // need to plan for filter shoots by tag: do I need to use url params?
  // should the shoots component display the "Other __ shoots"?

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
        knex.raw('SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT photos.photo_url ORDER BY photos.display_order ASC), ",", 1) AS photo_url')
      )
      .leftJoin('shoot_photographers', 'shoots.id', 'shoot_photographers.shoot_id')
      .leftJoin('photographers', 'shoot_photographers.photographer_id', 'photographers.id')
      .leftJoin('shoot_models', 'shoots.id', 'shoot_models.shoot_id')
      .leftJoin('models', 'shoot_models.model_id', 'models.id')
      .leftJoin('photos', 'shoots.id', 'photos.shoot_id')
      .groupBy('shoots.id', 'shoots.shoot_date')
      .orderBy('shoots.display_order')
      .limit(limit)
      .offset(offset);

    const shootsData = shoots.map(shoot => ({
      shoot_id: shoot.shoot_id,
      display_order: shoot.display_order,
      shoot_date: new Date(
        shoot.shoot_date).toISOString('en-US', dateFormatOptions
      ).split('T')[0],
      photographers: shoot.photographers.split(','),
      models: shoot.models.split(','),
      thumbnail_url: shoot.photo_url
    }));

  res.json(shootsData);

  } catch (error) {
    console.error('Error fetching shoot summaries:', error);
    res.status(500).send('Error fetching shoot summaries');
  }
}

// get shoot by id with all photos (max 10)
const getShootByID = async (req, res) => {
  // should the shootDetails page display the tags?
  try {
    const id = req.params.id;

    const shootExists = await knex('shoots').where({ id }).first();

    if(!shootExists) {
      return res.status(404).json({ error: 'Shoot not found' });
    }

    await knex.raw('SET SESSION group_concat_max_len = 2560');

    const shoot = await knex('shoots')
      .select(
        'shoots.id as shoot_id',
        'shoots.shoot_date',
        knex.raw('GROUP_CONCAT(DISTINCT photographers.photographer_name) AS photographers'),
        knex.raw('GROUP_CONCAT(DISTINCT models.model_name) AS models'),
        knex.raw('GROUP_CONCAT(DISTINCT photos.display_order ORDER BY photos.display_order ASC) AS display_orders'),
        knex.raw('GROUP_CONCAT(DISTINCT photos.photo_url ORDER BY photos.display_order ASC) AS photo_urls'),
        knex.raw('GROUP_CONCAT(DISTINCT photos.id ORDER BY photos.display_order ASC) AS photo_ids')
      )
      .leftJoin('shoot_photographers', 'shoots.id', 'shoot_photographers.shoot_id')
      .leftJoin('photographers', 'shoot_photographers.photographer_id', 'photographers.id')
      .leftJoin('shoot_models', 'shoots.id', 'shoot_models.shoot_id')
      .leftJoin('models', 'shoot_models.model_id', 'models.id')
      .leftJoin('photos', 'shoots.id', 'photos.shoot_id')
      .where('shoots.id', id)
      .groupBy('shoots.id', 'shoots.shoot_date');

    const shootData = {};
    shootData.shoot_id = shoot[0].shoot_id;
    shootData.shoot_date = new Date(shoot[0].shoot_date).toISOString('en-US', dateFormatOptions).split('T')[0];
    shootData.photographers = shoot[0].photographers.split(',');
    shootData.models = shoot[0].models.split(',');

    // Create an array of distinct photo objects with id, photo_url, and display_order properties
    const displayOrders = shoot[0].display_orders.split(',');
    const photoUrls = shoot[0].photo_urls.split(',');
    const photoIds = shoot[0].photo_ids.split(','); // Extract photo ids
    const photo_urls = [];
    const seenIds = new Set(); // Keep track of seen photo ids to ensure uniqueness
    displayOrders.forEach((order, idx) => {
      const id = parseInt(photoIds[idx]);
      if(!seenIds.has(id)) {
        photo_urls.push({
          id,
          display_order: parseInt(order),
          photo_url: photoUrls[idx]
        });
        seenIds.add(id);
      }
    });
    shootData.photo_urls = photo_urls;

    res.json(shootData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// add shoot 
const addShoot = async (req, res) => {
  const token = req.headers.authorization; 

  if(!verifyToken(token)) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  let {
    shoot_date,
    photographer_ids,
    model_ids
  } = req.body;


  // Check for required fields
  if(!shoot_date || !photographer_ids || !model_ids || !req.files.length) {
    return res.status(400).json({ message: 'Incomplete shoot submitted' });
  }
  
  const photo_urls = [];
  
  try {
    const results = await s3Uploadv3(req.files);
    results.forEach(result => photo_urls.push(AWS_BUCKET_BASE_URL.concat(result)));
  } catch(error) {
    console.log(error);
    return res.status(400).send({message: `Error posting files: ${error}`});
  }

  // // Check for required fields
  if(!photo_urls.length) {
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

      // Link photographers to the shoot
      for(const photographerId of photographer_ids.split(", ")) {
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
      for(const modelId of model_ids.split(", ")) {
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
// needs to delete existing photos and photo_urls from the shoot: call aws to delete the files then call aws to add the new photos then add the urls back to the database
const editShootByID = async (req, res) => {
  const token = req.headers.authorization; 

  if(!verifyToken(token)) {
    res.status(401).send({message: "unauthorized"})
    return;
  }
  
  const shootID = req.params.id;
  const { shoot_date, photographer_ids, model_ids, photo_urls } = req.body;

  try {
    await knex.transaction(async (trx) => {
      // Update shoot details in the shoots table
      await trx('shoots')
        .where({ id: shootID })
        .update({ shoot_date });

      // Update photographers for the shoot
      await trx('shoot_photographers')
        .where({ shoot_id: shootID })
        .del(); // Delete existing entries

      // Insert new photographer entries
      await trx('shoot_photographers').insert(
        photographer_ids.map((photographer_id) => ({
          shoot_id: shootID,
          photographer_id,
        }))
      );

      // Update models for the shoot
      await trx('shoot_models').where({ shoot_id: shootID }).del(); // Delete existing entries

      // Insert new model entries
      await trx('shoot_models').insert(
        model_ids.map((model_id) => ({
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


// editPhotoOrderByShootID
// might not need this since I will be overwriting the shoot when the user edits it via shoots/edit/:id
const editPhotoOrderByShootID = async (req, res) => {
  const token = req.headers.authorization; 

  if(!verifyToken(token)) {
    res.status(401).send({message: "unauthorized"})
    return;
  }
  
  const { id } = req.params;

  const newPhotoOrder = req.body.new_photo_order;

  try {
    // Start a transaction to ensure data integrity
    await knex.transaction(async (trx) => {
      // Iterate through each photo in the new order

      for(const photo of newPhotoOrder) {
        const { photo_id, display_order } = photo;
        
        // Update the display order of the photo in the database
        await trx('photos')
          .where({ id: photo_id, shoot_id: id })
          .update({ display_order: display_order });
      }
    });

    // Sending a success response
    res.status(200).json({ message: `Photo order for shoot ${id} updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// delete shoot
// needs to take the photo_urls and call aws to delete them as well as delete the urls from the server
const deleteShootByID = async (req, res) => {
  const token = req.headers.authorization; 

  if(!verifyToken(token)) {
    res.status(401).send({message: "unauthorized"})
    return;
  }

  try {
    const { id } = req.params;
    
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
};


// route for updating shoots order: update the display order of all the shoots
const updateShootOrder = async (req, res) => {
  const token = req.headers.authorization; 

  console.log("updateorder")

  // if(!verifyToken(token)) {
  //   res.status(401).send({message: "unauthorized"})
  //   return;
  // }

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

    res.status(200).json({ message: 'Shoots display order updated successfully' });
  } catch (error) {
    console.error('Error updating shoot display order:', error);
    res.status(500).json({ message: 'Error updating shoot display order' });
  }
};


module.exports = {
  getShootSummaries,
  getShootByID,
  addShoot,
  deleteShootByID,
  editShootByID,
  editPhotoOrderByShootID,
  updateShootOrder
};