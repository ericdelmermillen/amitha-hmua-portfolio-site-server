import pool from '../dbClient.mjs';


// get all photographers for addEdit shoot page photographer selector 
const getAllPhotographers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, photographer_name FROM photographers`
    );

    return res.json({
      success: true,
      message: "Photographers fetched successfully",
      photographers: rows
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch photographers" });
  };
};


// photographers/add route
const addPhotographer = async (req, res) => {
  try {
    const { photographer_name } = req.body;

    if (!photographer_name) {
      return res.status(400).json({
        success: false,
        message: "photographer_name is required"
      });
    };

    // check exists
    const [existing] = await pool.query(
      `SELECT id FROM photographers WHERE photographer_name = ? LIMIT 1`,
      [photographer_name]
    );

    if (existing.length) {
      return res.status(409).json({
        success: false,
        message: "A photographer with that name already exists"
      });
    };

    // insert
    await pool.query(
      `INSERT INTO photographers (photographer_name) VALUES (?)`,
      [photographer_name]
    );

    const [rows] = await pool.query(
      `SELECT id, photographer_name FROM photographers`
    );

    return res.json({
      success: true,
      message: "Photographer added successfully",
      photographers: rows
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add photographer" });
  };
};


// edit photographer by id
const editPhotographerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { photographer_name } = req.body;

    const [existing] = await pool.query(
      `SELECT id FROM photographers WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({
        message: `Photographer with ID ${id} does not exist`
      });
    };

    await pool.query(
      `UPDATE photographers SET photographer_name = ? WHERE id = ?`,
      [photographer_name, id]
    );

    const [updated] = await pool.query(
      `SELECT id, photographer_name FROM photographers WHERE id = ? LIMIT 1`,
      [id]
    );

    return res.status(200).json({
      message: `Photographer with ID ${id} updated successfully`,
      photographer: updated[0]
    });

  } catch (error) {
    console.error("Error updating photographer:", error);
    return res.status(500).json({ error: "Internal server error" });
  };
};


// delete photographer by id
const deletePhotographerByID = async (req, res) => {
  try {
    const id = req.params.id;

    // check usage in shoots
    const [links] = await pool.query(
      `SELECT shoot_id FROM shoot_photographers WHERE photographer_id = ?`,
      [id]
    );

    if (links.length) {
      const shootIds = links.map(r => r.shoot_id);

      const [shootRows] = await pool.query(
        `SELECT id FROM shoots WHERE id IN (?)`,
        [shootIds]
      );

      const photographerShoots = shootRows.map(s => ({
        shoot_id: s.id
      }));

      return res.status(409).json({
        success: false,
        message: "Photographer can not be deleted because they appear in existing shoot(s)",
        photographerShoots
      });
    };

    // check exists
    const [existing] = await pool.query(
      `SELECT id FROM photographers WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: `Photographer number ${id} does not exist`
      });
    };

    const [result] = await pool.query(
      `DELETE FROM photographers WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({
        success: false,
        message: `Photographer number ${id} not deleted`
      });
    };

    const [rows] = await pool.query(
      `SELECT id, photographer_name FROM photographers`
    );

    return res.json({
      success: true,
      message: `Photographer deleted successfully`,
      photographers: rows
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete photographer" });
  };
};


export {
  getAllPhotographers,
  addPhotographer,
  editPhotographerById,
  deletePhotographerByID
};