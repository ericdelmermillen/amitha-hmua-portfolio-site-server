import pool from "../dbClient.mjs";
import { dateFormatOptions } from '../utils/utils.mjs';
import { deleteFiles } from "../s3.mjs";

const BUCKET_PATH = process.env.BUCKET_PATH;
const SHOOTS_DIRNAME = process.env.SHOOTS_DIRNAME;


// get shoots with pagination
const getShootSummaries = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tag_id = req.query.tag_id;

    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;

    // Base query parts
    let query = `
      SELECT 
        shoots.id AS shoot_id,
        shoots.shoot_date,
        shoots.display_order,
        GROUP_CONCAT(DISTINCT photographers.photographer_name) AS photographers,
        GROUP_CONCAT(DISTINCT models.model_name) AS models,
        GROUP_CONCAT(DISTINCT tags.tag_name) AS tags,
        SUBSTRING_INDEX(
          GROUP_CONCAT(DISTINCT photos.photo_url ORDER BY photos.display_order ASC),
          ',', 1
        ) AS photo_url
      FROM shoots
      LEFT JOIN shoot_photographers 
        ON shoots.id = shoot_photographers.shoot_id
      LEFT JOIN photographers 
        ON shoot_photographers.photographer_id = photographers.id
      LEFT JOIN shoot_models 
        ON shoots.id = shoot_models.shoot_id
      LEFT JOIN models 
        ON shoot_models.model_id = models.id
      LEFT JOIN photos 
        ON shoots.id = photos.shoot_id
      LEFT JOIN shoot_tags 
        ON shoots.id = shoot_tags.shoot_id
      LEFT JOIN tags 
        ON shoot_tags.tag_id = tags.id
    `;

    const params = [];

    // Optional tag filter
    if (tag_id !== undefined) {
      query += `
        WHERE EXISTS (
          SELECT 1 
          FROM shoot_tags 
          WHERE shoot_tags.shoot_id = shoots.id
          AND shoot_tags.tag_id = ?
        )
      `;
      params.push(tag_id);
    }

    query += `
      GROUP BY shoots.id, shoots.shoot_date, shoots.display_order
      ORDER BY shoots.display_order
      LIMIT ? OFFSET ?
    `;

    params.push(limitInt, offset);

    // Execute query
    const [rows] = await pool.query(query, params);

    const shootSummaries = rows.map((shoot) => ({
      shoot_id: shoot.shoot_id,
      display_order: shoot.display_order,
      shoot_date: new Date(shoot.shoot_date)
        .toISOString()
        .split("T")[0],
      tags: shoot.tags ? shoot.tags.split(",") : [],
      photographers: shoot.photographers ? shoot.photographers.split(",") : [],
      models: shoot.models ? shoot.models.split(",") : [],
      thumbnail_url: shoot.photo_url?.includes("http")
        ? shoot.photo_url
        : `${process.env.BUCKET_PATH}${process.env.SHOOTS_DIRNAME}/${shoot.photo_url}`
    }));

    return res.json({
      shootSummaries,
      isFinalPage: rows.length === 0
    });

  } catch (error) {
    console.error("Error fetching shoot summaries:", error);
    return res.status(500).send("Error fetching shoot summaries");
  }
};


// get shoot by id with all photos (max 10)
const getShootByID = async (req, res) => {
  try {
    const id = req.params.id;

    // 1. Check existence
    const [existsRows] = await pool.query(
      `SELECT id FROM shoots WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!existsRows.length) {
      return res.status(404).json({ error: "Shoot not found" });
    };

    // 2. Increase GROUP_CONCAT limit (session-level)
    await pool.query(`SET SESSION group_concat_max_len = 2560`);

    // 3. Main query
    const [rows] = await pool.query(
      `
      SELECT 
        shoots.id AS shoot_id,
        shoots.shoot_date,

        GROUP_CONCAT(DISTINCT photographers.id) AS photographer_ids,
        GROUP_CONCAT(DISTINCT photographers.photographer_name) AS photographers,

        GROUP_CONCAT(DISTINCT models.id) AS model_ids,
        GROUP_CONCAT(DISTINCT models.model_name) AS models,

        GROUP_CONCAT(DISTINCT tags.id) AS tag_ids,
        GROUP_CONCAT(DISTINCT tags.tag_name) AS tags,

        GROUP_CONCAT(DISTINCT photos.display_order ORDER BY photos.display_order ASC) AS display_orders,
        GROUP_CONCAT(DISTINCT photos.photo_url ORDER BY photos.display_order ASC) AS photo_urls,
        GROUP_CONCAT(DISTINCT photos.id ORDER BY photos.display_order ASC) AS photo_ids

      FROM shoots
      LEFT JOIN shoot_photographers 
        ON shoots.id = shoot_photographers.shoot_id
      LEFT JOIN photographers 
        ON shoot_photographers.photographer_id = photographers.id
      LEFT JOIN shoot_models 
        ON shoots.id = shoot_models.shoot_id
      LEFT JOIN models 
        ON shoot_models.model_id = models.id
      LEFT JOIN photos 
        ON shoots.id = photos.shoot_id
      LEFT JOIN shoot_tags 
        ON shoots.id = shoot_tags.shoot_id
      LEFT JOIN tags 
        ON shoot_tags.tag_id = tags.id

      WHERE shoots.id = ?
      GROUP BY shoots.id, shoots.shoot_date
      `,
      [id]
    );

    const shoot = rows[0];

    // 4. Shape response
    const shootData = {
      shoot_id: shoot.shoot_id,
      shoot_date: new Date(shoot.shoot_date)
        .toISOString()
        .split("T")[0],

      tag_ids: shoot.tag_ids ? shoot.tag_ids.split(",") : [],
      tags: shoot.tags ? shoot.tags.split(",") : [],

      photographer_ids: shoot.photographer_ids
        ? shoot.photographer_ids.split(",")
        : [],
      photographers: shoot.photographers
        ? shoot.photographers.split(",")
        : [],

      model_ids: shoot.model_ids ? shoot.model_ids.split(",") : [],
      models: shoot.models ? shoot.models.split(",") : [],
    };

    // 5. Build photo array with deduplication
    const displayOrders = shoot.display_orders
      ? shoot.display_orders.split(",")
      : [];

    const photoUrls = shoot.photo_urls
      ? shoot.photo_urls.split(",")
      : [];

    const photoIds = shoot.photo_ids
      ? shoot.photo_ids.split(",")
      : [];

    const photo_urls = [];
    const seenIds = new Set();

    displayOrders.forEach((order, idx) => {
      const photoId = parseInt(photoIds[idx], 10);

      if (!seenIds.has(photoId)) {
        const rawUrl = photoUrls[idx];

        photo_urls.push({
          id: photoId,
          display_order: parseInt(order, 10),
          photo_url: rawUrl?.includes("http")
            ? rawUrl
            : `${process.env.BUCKET_PATH}${process.env.SHOOTS_DIRNAME}/${rawUrl}`,
        });

        seenIds.add(photoId);
      }
    });

    shootData.photo_urls = photo_urls;

    return res.json(shootData);
  } catch (error) {
    console.error("getShootByID error:", error);
    return res.status(500).json({ error: "Internal server error" });
  };
};


// add shoot 
const addShoot = async (req, res) => {
  let connection;

  let {
    shoot_date,
    tag_ids,
    photographer_ids,
    model_ids,
    photo_urls,
    dirname
  } = req.body;

  if (!photo_urls || !photo_urls.length) {
    return res.status(400).json({ message: "Photos not added" });
  }

  shoot_date = new Date(shoot_date).toISOString().slice(0, 10);

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Shift display order
    await connection.query(
      `UPDATE shoots SET display_order = display_order + 1`
    );

    // 2. Insert shoot
    const [shootResult] = await connection.query(
      `INSERT INTO shoots (shoot_date, display_order) VALUES (?, ?)`,
      [shoot_date, 1]
    );

    const shootId = shootResult.insertId;

    // 3. Link tags
    for (const tagId of tag_ids) {
      const [tagRows] = await connection.query(
        `SELECT id FROM tags WHERE id = ? LIMIT 1`,
        [tagId]
      );

      if (!tagRows.length) {
        throw new Error(`Tag with ID ${tagId} not found`);
      }

      await connection.query(
        `INSERT INTO shoot_tags (shoot_id, tag_id) VALUES (?, ?)`,
        [shootId, tagId]
      );
    }

    // 4. Link photographers
    for (const photographerId of photographer_ids) {
      const [rows] = await connection.query(
        `SELECT id FROM photographers WHERE id = ? LIMIT 1`,
        [photographerId]
      );

      if (!rows.length) {
        throw new Error(`Photographer with ID ${photographerId} not found`);
      }

      await connection.query(
        `INSERT INTO shoot_photographers (shoot_id, photographer_id) VALUES (?, ?)`,
        [shootId, photographerId]
      );
    }

    // 5. Link models
    for (const modelId of model_ids) {
      const [rows] = await connection.query(
        `SELECT id FROM models WHERE id = ? LIMIT 1`,
        [modelId]
      );

      if (!rows.length) {
        throw new Error(`Model with ID ${modelId} not found`);
      }

      await connection.query(
        `INSERT INTO shoot_models (shoot_id, model_id) VALUES (?, ?)`,
        [shootId, modelId]
      );
    }

    // 6. Insert photos
    for (const [idx, photoUrl] of photo_urls.entries()) {
      await connection.query(
        `INSERT INTO photos (shoot_id, display_order, photo_url)
         VALUES (?, ?, ?)`,
        [shootId, idx + 1, photoUrl]
      );
    }

    await connection.commit();

    return res.status(201).json({
      message: "Shoot added successfully"
    });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    // AWS cleanup (unchanged logic)
    try {
      const objKeys = photo_urls.map(
        (url) => `${process.env.SHOOTS_DIRNAME}/${url}`
      );
      await deleteFiles(objKeys);
    } catch (deleteError) {
      console.error("Error deleting files from AWS:", deleteError);
    }

    console.error(error);

    return res.status(500).json({
      message: error.message || "Internal server error"
    });

  } finally {
    if (connection) connection.release();
  }
};


// edit shoot
const editShootByID = async (req, res) => {
  const { id } = req.params;

  let connection;

  try {
    // 1. Check existence
    const [existing] = await pool.query(
      `SELECT id FROM shoots WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({ message: "Shoot not found" });
    }

    let {
      shoot_date,
      tag_ids,
      photographer_ids,
      model_ids,
      photo_urls
    } = req.body;

    if (!photo_urls || !photo_urls.length) {
      return res.status(400).json({ message: "Photos not added" });
    }

    shoot_date = new Date(shoot_date).toISOString().slice(0, 10);

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 2. Get existing photos for cleanup logic
    const [photoRows] = await connection.query(
      `SELECT photo_url FROM photos WHERE shoot_id = ?`,
      [id]
    );

    // 3. Update shoot
    await connection.query(
      `UPDATE shoots SET shoot_date = ? WHERE id = ?`,
      [shoot_date, id]
    );

    // 4. Delete relations
    await connection.query(`DELETE FROM shoot_photographers WHERE shoot_id = ?`, [id]);
    await connection.query(`DELETE FROM shoot_models WHERE shoot_id = ?`, [id]);
    await connection.query(`DELETE FROM shoot_tags WHERE shoot_id = ?`, [id]);
    await connection.query(`DELETE FROM photos WHERE shoot_id = ?`, [id]);

    // 5. AWS cleanup list (same logic as before)
    const objKeys = [];

    for (const obj of photoRows) {
      if (
        !obj.photo_url.includes("http") &&
        !photo_urls.includes(obj.photo_url)
      ) {
        objKeys.push(`${process.env.SHOOTS_DIRNAME}/${obj.photo_url}`);
      }
    }

    // IMPORTANT: AWS deletion happens OUTSIDE SQL transaction safety boundary
    // (good practice: don’t hold DB transaction open during network calls)
    try {
      const deleteResponse = await deleteFiles(objKeys);
      if (!deleteResponse) {
        throw new Error("Error deleting files from AWS");
      }
    } catch (error) {
      console.error("Error deleting file from AWS:", error);
      throw error; // force rollback
    }

    // 6. Reinsert relations

    for (const photographerId of photographer_ids) {
      const [rows] = await connection.query(
        `SELECT id FROM photographers WHERE id = ? LIMIT 1`,
        [photographerId]
      );
      if (!rows.length) {
        throw new Error(`Photographer with ID ${photographerId} not found`);
      }

      await connection.query(
        `INSERT INTO shoot_photographers (shoot_id, photographer_id) VALUES (?, ?)`,
        [id, photographerId]
      );
    }

    for (const modelId of model_ids) {
      const [rows] = await connection.query(
        `SELECT id FROM models WHERE id = ? LIMIT 1`,
        [modelId]
      );
      if (!rows.length) {
        throw new Error(`Model with ID ${modelId} not found`);
      }

      await connection.query(
        `INSERT INTO shoot_models (shoot_id, model_id) VALUES (?, ?)`,
        [id, modelId]
      );
    }

    for (const tagId of tag_ids) {
      const [rows] = await connection.query(
        `SELECT id FROM tags WHERE id = ? LIMIT 1`,
        [tagId]
      );
      if (!rows.length) {
        throw new Error(`Tag with ID ${tagId} not found`);
      }

      await connection.query(
        `INSERT INTO shoot_tags (shoot_id, tag_id) VALUES (?, ?)`,
        [id, tagId]
      );
    }

    for (const [idx, photoUrl] of photo_urls.entries()) {
      await connection.query(
        `INSERT INTO photos (shoot_id, display_order, photo_url)
         VALUES (?, ?, ?)`,
        [id, idx + 1, photoUrl]
      );
    }

    await connection.commit();

    return res.status(200).json({
      message: "Shoot updated successfully"
    });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error(error);

    return res.status(500).json({
      message: error.message || "Internal server error"
    });

  } finally {
    if (connection) connection.release();
  }
};

// delete shoot
const deleteShootByID = async (req, res) => {
  const { id } = req.params;

  let connection;
  let photoObjKeys = [];

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Get photo URLs
    const [photoRows] = await connection.query(
      `SELECT photo_url FROM photos WHERE shoot_id = ?`,
      [id]
    );

    photoObjKeys = photoRows;

    // 2. Delete child tables first
    await connection.query(
      `DELETE FROM photos WHERE shoot_id = ?`,
      [id]
    );

    await connection.query(
      `DELETE FROM shoot_models WHERE shoot_id = ?`,
      [id]
    );

    await connection.query(
      `DELETE FROM shoot_photographers WHERE shoot_id = ?`,
      [id]
    );

    await connection.query(
      `DELETE FROM shoot_tags WHERE shoot_id = ?`,
      [id]
    );

    // 3. Delete shoot itself
    const [result] = await connection.query(
      `DELETE FROM shoots WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error(`Shoot number ${id} not deleted`);
    }

    await connection.commit();

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error(error);

    return res.status(500).json({
      error: "Failed to delete shoot"
    });

  } finally {
    if (connection) connection.release();
  }

  // 4. AWS cleanup AFTER DB success
  try {
    const objKeys = [];

    for (const obj of photoObjKeys) {
      if (!obj.photo_url.includes("http")) {
        objKeys.push(
          `${process.env.SHOOTS_DIRNAME}/${obj.photo_url}`
        );
      }
    }

    const deleteResponse = await deleteFiles(objKeys);

    if (!deleteResponse) {
      throw new Error("Error deleting files from AWS");
    }

    return res.json({
      success: true,
      message: `Shoot number ${id} and associated files deleted successfully`
    });

  } catch (error) {
    console.error("Error deleting file from AWS:", error);
    return res.status(500).send("Error deleting files from AWS");
  }
};

// route for updating shoots order: update the display order of all the shoots
const updateShootOrder = async (req, res) => {
  const newShootsOrder = req.body.new_shoot_order;

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    await Promise.all(
      newShootsOrder.map(async ({ shoot_id, display_order }) => {
        await connection.query(
          `UPDATE shoots SET display_order = ? WHERE id = ?`,
          [display_order, shoot_id]
        );
      })
    );

    await connection.commit();

    return res.status(200).json({
      message: "Shoots display order updated successfully"
    });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("Error updating shoot display order:", error);

    return res.status(500).json({
      message: "Error updating shoot display order"
    });

  } finally {
    if (connection) connection.release();
  }
};

export {
  getShootSummaries,
  getShootByID,
  addShoot,
  deleteShootByID,
  editShootByID,
  updateShootOrder
};