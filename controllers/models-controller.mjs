import pool from '../dbClient.mjs';


// get all models for create shoot modal model selector
const getAllModels = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name FROM models`
    );

    console.log(rows)

    return res.json({
      success: true,
      message: "Models fetched successfully",
      models: rows
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch models" });
  };
};


// models/add route
const addModel = async (req, res) => {
  try {
    const { model_name } = req.body;

    if (!model_name) {
      return res.status(400).json({
        success: false,
        message: "model_name is required"
      });
    };

    // check exists
    const [existing] = await pool.query(
      `SELECT id FROM models WHERE model_name = ? LIMIT 1`,
      [model_name]
    );

    if (existing.length) {
      return res.status(409).json({
        success: false,
        message: "A model with that name already exists"
      });
    };

    // insert
    await pool.query(
      `INSERT INTO models (model_name) VALUES (?)`,
      [model_name]
    );

    // return updated list
    const [rows] = await pool.query(
      `SELECT id, model_name FROM models`
    );

    return res.json({
      success: true,
      message: "Model added successfully",
      models: rows
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add model" });
  };
};


// edit model by id
const editModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const { model_name } = req.body;

    // 1. Check model exists
    const [existing] = await pool.query(
      `SELECT id FROM models WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({
        message: `Model with ID ${id} does not exist`
      });
    }

    // 2. Prevent duplicate names (excluding current record)
    const [duplicate] = await pool.query(
      `SELECT id FROM models WHERE model_name = ? AND id != ? LIMIT 1`,
      [model_name, id]
    );

    if (duplicate.length) {
      return res.status(409).json({
        success: false,
        message: `Model name "${model_name}" already exists`
      });
    }

    // 3. Update
    await pool.query(
      `UPDATE models SET model_name = ? WHERE id = ?`,
      [model_name, id]
    );

    // 4. Return updated row
    const [updatedRows] = await pool.query(
      `SELECT id, model_name FROM models WHERE id = ? LIMIT 1`,
      [id]
    );

    return res.status(200).json({
      message: `Model with ID ${id} updated successfully`,
      updatedModel: updatedRows[0]
    });

  } catch (error) {
    console.error("Error updating model:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete model by id
const deleteModelByID = async (req, res) => {
  try {
    const id = req.params.id;

    // check if model is used in shoots
    const [shootLinks] = await pool.query(
      `SELECT shoot_id FROM shoot_models WHERE model_id = ?`,
      [id]
    );

    if (shootLinks.length) {
      const modelShoots = shootLinks.map(s => ({
        shoot_id: s.shoot_id
      }));

      return res.status(409).json({
        success: false,
        message: 'Model can not be deleted because they appear in existing shoot(s)',
        modelShoots
      });
    };

    // check model exists
    const [existing] = await pool.query(
      `SELECT id FROM models WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: `Model number ${id} does not exist`
      });
    };

    const [result] = await pool.query(
      `DELETE FROM models WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({
        success: false,
        message: `Model number ${id} not deleted`
      });
    };

    const [rows] = await pool.query(
      `SELECT id, model_name FROM models`
    );

    return res.json({
      success: true,
      message: "Model deleted successfully",
      models: rows
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete model" });
  };
};


export {
  getAllModels,
  addModel,
  editModelById,
  deleteModelByID
};