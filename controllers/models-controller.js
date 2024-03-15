const jwt = require('jsonwebtoken');
const knex = require("knex")(require("../knexfile.js"));
const { verifyToken } = require('../utils/utils.js');


// get all models for create shoot modal model selector
const getAllModels = async (req, res) => {
  try {
    const token = req.headers.authorization; 

    if(!token) {
      return res.status(401).json({ message: 'Token Missing' });
    }
    
    verifyToken(token);

  } catch(error) {
    if(error.message === 'Token expired') {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error.message === 'Invalid token') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  try {
    const modelsData = await knex('models');

    const models = modelsData.map(({ id, model_name }) => ({ id, model_name }));

    res.json({
      success: true,
      message: "Models fetched successfully",
      models: models
    });

  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Failed to fetch models"});
  }
};


// get model by id 
const getModelByID = async (req, res) => {
  try {
    const token = req.headers.authorization; 
    
    if(!token) {
      return res.status(401).json({ message: 'Token Missing' });
    }

    verifyToken(token);

  } catch(error) {
    if(error.message === 'Token expired') {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error.message === 'Invalid token') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  try {
        
    const id = req.params.id;

    const modelExists = await knex('models').where({ id }).first();
    
    if(!modelExists) {
      return res.status(409).json({
        success: false,
        message: `Model number ${id} does not exist`,
      });
    }

    res.json({
      success: true,
      message: `Model number ${id} fetched successfully`,
      model: modelExists,
    });
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Failed to fetch model"});
  }
};


// models/add route
const addModel = async (req, res) => {
  try {
  //   const token = req.headers.authorization; 
    
  //   if(!token) {
  //     return res.status(401).json({ message: 'Token Missing' });
  //   }

  //   verifyToken(token);

  } catch(error) {
    if(error.message === 'Token expired') {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error.message === 'Invalid token') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  try {
    const { model_name, agency, agencyURL } = req.body;
    
    const newModel = {
      model_name: model_name,
      agency: agency || null,
      agencyUrl: agencyURL || null
    };


    const modelExists = await knex('models').where({ model_name }).first();
    
    if(modelExists) {
      return res.status(409).json({
        success: false,
        message: "A model with that name already exists",
      });
    }

    await knex('models').insert(newModel);

    const modelsData = await knex('models');

    const models = modelsData.map(({ id, model_name }) => ({ id, model_name }));

    res.json({
      success: true,
      message: "Model added successfully",
      models: models,
    });
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Failed to add model"});
  }
};


// edit model by id
const editModelById = async (req, res) => {
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

  try {
    
  const { id } = req.params;
  const { model_name, agency, agencyURL } = req.body;

  // Check if the model with the specified ID exists
  const existingModel = await knex('models').where({ id }).first();
  if (!existingModel) {
    return res.status(404).json({ message: `Model with ID ${id} does not exist` });
  }
  
  // Update the model in the database
  await knex('models')
    .where({ id })
    .update({ model_name, agency, agencyURL });

  // Fetch the updated model from the database
  const updatedModel = await knex('models').where({ id }).first();

  return res.status(200).json({ message: `Model with ID ${id} updated successfully`, updatedModel});

  } catch(error) {
    console.error('Error updating model:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// delete model by id
const deleteModelByID = async (req, res) => {
  // try {
  //   const token = req.headers.authorization; 
    
  //   if(!token) {
  //     return res.status(401).json({ message: 'Token Missing' });
  //   }

  //   verifyToken(token);

  // } catch(error) {
  //   if (error.message === 'Token expired') {
  //     return res.status(401).json({ message: 'Token expired' });
  //   } else if (error.message === 'Invalid token') {
  //     return res.status(401).json({ message: 'Invalid token' });
  //   } else {
  //     return res.status(401).json({ message: 'Unauthorized' });
  //   }
  // }

  try {
    const id = req.params.id;

    const modelExistsInShootModels = await knex('shoot_models').where({ model_id: id });

    if(modelExistsInShootModels.length) {
      const shootIds = modelExistsInShootModels.map(shoot => shoot.shoot_id)

      try {
        const modelShootsData = await Promise.all(shootIds.map(async (shootId) => {
          const shoot = await knex('shoots').where({ id: shootId }).first();
          return shoot;
        }));

        const modelShoots = modelShootsData.map(shoot => ({
          shoot_id: shoot.id,
          shoot_title: shoot.shoot_title
      }));

        return res.status(409).json({
          success: false,
          message: 'Model can not be deleted because they appear in existing shoots',
          modelShoots: modelShoots
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve shoots" });
    }
  }
    
  const modelExists = await knex('models').where({ id }).first();
    
    if(!modelExists) {
      return res.status(409).json({
        success: false,
        message: `Model number ${id} does not exist`,
      });
    }

    const deleted = await knex('models').where({ id }).del();

    if(!deleted) {
      return res.status(500).json({
        success: false,
        message: `Model number ${id} not deleted`,
      });
    }

    const modelsData = await knex('models');

    const models = modelsData.map((model) => ({ id: model.id, model_name: model.model_name }));

    res.json({
      success: true,
      message: `Model deleted successfully`,
      models: models,
    });
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Failed to delete model"});
  }
};


module.exports = {
  getModelByID,
  getAllModels,
  addModel,
  editModelById,
  deleteModelByID
};