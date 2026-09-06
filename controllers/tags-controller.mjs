import pool from '../dbClient.mjs';


// get all tags for add shoot/edit tags selector
const getAllTags = async (req, res) => {
  try {
    const [ rows ] = await pool.query(
      `SELECT id, name FROM tags`
    );

    return res.json({
      success: true,
      message: "Tags fetched successfully",
      tags: rows
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch tags" });
  }
};


// // tags/add route
const addTag = async (req, res) => {
  try {
    const { tag_name } = req.body;

    if (!tag_name) {
      return res.status(400).json({
        success: false,
        message: "tag_name is required"
      });
    }

    // check exists
    const [existing] = await pool.query(
      `SELECT id FROM tags WHERE name = ? LIMIT 1`,
      [tag_name]
    );

    if (existing.length) {
      return res.status(409).json({
        success: false,
        message: "A tag with that name already exists"
      });
    }

    await pool.query(
      `INSERT INTO tags (name) VALUES (?)`,
      [tag_name]
    );

    const [rows] = await pool.query(
      `SELECT id, name FROM tags`
    );

    return res.json({
      success: true,
      message: "Tag added successfully",
      tags: rows
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add tag" });
  }
};


// edit tag by id
const editTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag_name } = req.body;

    // 1. Ensure tag exists
    const [existing] = await pool.query(
      `SELECT id FROM tags WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({
        message: `Tag with ID ${id} does not exist`
      });
    }

    // 2. Prevent duplicate tag names (excluding current tag)
    const [duplicate] = await pool.query(
      `SELECT id FROM tags WHERE name = ? AND id != ? LIMIT 1`,
      [tag_name, id]
    );

    if (duplicate.length) {
      return res.status(409).json({
        success: false,
        message: `Tag name "${tag_name}" already exists`
      });
    }

    // 3. Update
    await pool.query(
      `UPDATE tags SET name = ? WHERE id = ?`,
      [tag_name, id]
    );

    // 4. Return updated record
    const [updated] = await pool.query(
      `SELECT id, name FROM tags WHERE id = ? LIMIT 1`,
      [id]
    );

    return res.status(200).json({
      message: `Tag with ID ${id} updated successfully`,
      updatedTag: updated[0]
    });

  } catch (error) {
    console.error("Error updating tag:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// // delete tag by id
const deleteTagByID = async (req, res) => {
  try {
    const id = req.params.id;

    // check usage in shoots
    const [links] = await pool.query(
      `SELECT shoot_id FROM shoot_tags WHERE tag_id = ?`,
      [id]
    );

    if (links.length) {
      const shootIds = links.map(r => r.shoot_id);

      const [shootRows] = await pool.query(
        `SELECT id FROM shoots WHERE id IN (?)`,
        [shootIds]
      );

      const tagShoots = shootRows.map(s => ({
        shoot_id: s.id
      }));

      return res.status(409).json({
        success: false,
        message: "Tag can not be deleted because they appear in existing shoot(s)",
        tagShoots
      });
    }

    const [existing] = await pool.query(
      `SELECT id FROM tags WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: `Tag number ${id} does not exist`
      });
    }

    const [result] = await pool.query(
      `DELETE FROM tags WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({
        success: false,
        message: `Tag number ${id} not deleted`
      });
    }

    const [rows] = await pool.query(
      `SELECT id, name FROM tags`
    );

    return res.json({
      success: true,
      message: "Tag deleted successfully",
      tags: rows
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete tag" });
  }
};

export {
  getAllTags,
  addTag,
  editTagById,
  deleteTagByID
};