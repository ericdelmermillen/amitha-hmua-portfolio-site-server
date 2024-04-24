// const jwt = require('jsonwebtoken');
const knex = require("knex")(require("../knexfile.js"));
const { verifyToken } = require('../utils/utils.js');


// get all photographers for create shoot modal photographer selector 
const getAllPhotographers = async (req, res) => {
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
    const photographersData = await knex('photographers');

    const photographers = photographersData.map(({ id, photographer_name }) => ({ id, photographer_name }));

    res.json({
      success: true,
      message: "Photographers fetched successfully",
      photographers: photographers,
    });

  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Failed to fetch photographers"});
  }
};

// photographers/add route
const addPhotographer = async (req, res) => {
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
    const { 
      photographer_name
    } = req.body;

    const newPhotographer = {
      photographer_name: photographer_name
    };

    const photographerExists = await knex('photographers').where({ photographer_name }).first();
    
    if(photographerExists) {
      return res.status(409).json({
        success: false,
        message: "A photographer with that name already exists",
      });
    }

    await knex('photographers').insert(newPhotographer);

    const photographersData = await knex('photographers');

    const photographers = photographersData.map(({ id, photographer_name }) => ({ id, photographer_name }));

    res.json({
      success: true,
      message: "Photographer added successfully",
      photographers: photographers,
    });
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Failed to add photographer"});
  }
};


// edit photographer by id
const editPhotographerById = async (req, res) => {
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
    const { id } = req.params;
    const { photographer_name } = req.body;

    // Check if the photographer with the specified ID exists
    const existingPhotographer = await knex('photographers').where({ id }).first();
    if(!existingPhotographer) {
      return res.status(404).json({ message: `Photographer with ID ${id} does not exist` });
    }

    // Update the photographer in the database
    await knex('photographers')
      .where({ id })
      .update({
        photographer_name
      });

    const photographerExists = await knex('photographers').where({ id }).first();

    return res.status(200).json({ message: `Photographer with ID ${id} updated successfully`, photographer: photographerExists });
  } catch (error) {
    console.error('Error updating photographer:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


// delete photographer by id
const deletePhotographerByID = async (req, res) => {
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

    const photographerExistsInShootPhotographers = await knex('shoot_photographers').where({ photographer_id: id });

    if(photographerExistsInShootPhotographers.length) {

      const shootIds = photographerExistsInShootPhotographers.map(shoot => shoot.shoot_id)

      try {
        const photographerShootsData = await Promise.all(shootIds.map(async (shootId) => {
          const shoot = await knex('shoots').where({ id: shootId }).first();
          return shoot;
        }));

        const photographerShoots = photographerShootsData.map(shoot => ({
          shoot_id: shoot.id
        }));

        return res.status(409).json({
          success: false,
          message: 'Photographer can not be deleted because they appear in existing shoots',
          photographerShoots: photographerShoots
        });
      } catch(error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve shoots" });
      }
    }

  const photographerExists = await knex('photographers').where({ id }).first();
    
    if(!photographerExists) {
      return res.status(409).json({
        success: false,
        message: `Photographer number ${id} does not exist`,
      });
    }

    const deleted = await knex('photographers').where({ id }).del();

    if(!deleted) {
      return res.status(500).json({
        success: false,
        message: `Photographer number ${id} not deleted`,
      });
    }

    const photographersData = await knex('photographers');

    res.json({
      success: true,
      message: `Photographer number ${id} deleted successfully`,
      photographers: photographersData,
    });
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Failed to delete photographer"});
  }
};


module.exports = {
  getAllPhotographers,
  addPhotographer,
  editPhotographerById,
  deletePhotographerByID
};