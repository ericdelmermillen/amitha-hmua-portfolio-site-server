// --- setting up for migrations: commented out line works with original knexfile.js set up: new lines work with config setup
const knex = require("knex")(require("../knexfile.js"));
// const knexConfig = require('../knexfile.js');
// const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
// ---

// get all tags for add shoot/edit tags selector
const getAllTags = async (req, res) => {

  try {
    const tagsData = await knex('tags');

    const tags = tagsData.map(({ id, tag_name }) => ({ id, tag_name }));

    res.json({
      success: true,
      message: "Tags fetched successfully",
      tags: tags
    });

  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Failed to fetch tags"});
  }
};


// // tags/add route
const addTag = async (req, res) => {

  try {
    const { tag_name } = req.body;
    
    const newTag = { tag_name: tag_name };

    const tagExists = await knex('tags').where({ tag_name }).first();
    
    if(tagExists) {
      return res.status(409).json({
        success: false,
        message: "A tag with that name already exists",
      });
    }

    await knex('tags').insert(newTag);

    const tagsData = await knex('tags');

    const tags = tagsData.map(({ id, tag_name }) => ({ id, tag_name }));

    res.json({
      success: true,
      message: "Tag added successfully",
      tags: tags
    });
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Failed to add tag"});
  }
};


// edit tag by id
const editTagById = async (req, res) => {

  try {
    
    const { id } = req.params;
    const { tag_name } = req.body;

    // Check if the tag with the specified ID exists
    const existingTag = await knex('tags').where({ id }).first();
    if(!existingTag) {
      return res.status(404).json({ message: `Tag with ID ${id} does not exist` });
    }
    
    // Update the tag in the database
    await knex('tags')
      .where({ id })
      .update({ tag_name });

    // Fetch the updated tag from the database
    const updatedTag = await knex('tags').where({ id }).first();

    return res.status(200).json({ message: `Tag with ID ${id} updated successfully`, updatedTag});

  } catch(error) {
    console.error('Error updating tag:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// // delete tag by id
const deleteTagByID = async (req, res) => {

  try {
    const id = req.params.id;
    
    const tagExistsInShootTags = await knex('shoot_tags').where({ tag_id: id });
    
    if(tagExistsInShootTags.length) {
      const shootIds = tagExistsInShootTags.map(shoot => shoot.shoot_id);
      
      try {
        const tagShootsData = await Promise.all(shootIds.map(async (shootId) => {
          const shoot = await knex('shoots').where({ id: shootId }).first();
          return shoot;
        }));

        const tagShoots = tagShootsData.map(shoot => ({
          shoot_id: shoot.id
      }));

        return res.status(409).json({
          success: false,
          message: 'Tag can not be deleted because they appear in existing shoot(s)',
          tagShoots: tagShoots
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve shoots" });
    }
  }
    
  const tagExists = await knex('tags').where({ id }).first();
    
    if(!tagExists) {
      return res.status(409).json({
        success: false,
        message: `Tag number ${id} does not exist`
      });
    }

    const deleted = await knex('tags').where({ id }).del();

    if(!deleted) {
      return res.status(500).json({
        success: false,
        message: `Tag number ${id} not deleted`
      });
    }

    const tagsData = await knex('tags');

    const tags = tagsData.map((tag) => ({ id: tag.id, tag_name: tag.tag_name }));

    res.json({
      success: true,
      message: `Tag deleted successfully`,
      tags: tags
    });
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "Failed to delete tag"});
  }
};


module.exports = {
  getAllTags,
  addTag,
  editTagById,
  deleteTagByID
};