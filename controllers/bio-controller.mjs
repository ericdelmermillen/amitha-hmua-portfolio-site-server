import pool from '../dbClient.mjs';
import { deleteFiles } from '../s3.mjs';

const BUCKET_PATH = process.env.BUCKET_PATH;
const BIO_DIRNAME = process.env.BIO_DIRNAME;


// getBio to show bio page
const getBio = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM bio LIMIT 1`);
    const bioData = rows[0];

    if (!bioData) {
      return res.status(404).json({
        message: "Bio data not found or not set"
      });
    };

    const bioImgURL = bioData.bio_img_url
      ? `${BUCKET_PATH}${BIO_DIRNAME}/${bioData.bio_img_url}`
      : "";

    return res.json({
      bioName: bioData.bio_name,
      bioText: bioData.bio_text,
      bioImgURL,
      bioImageNotSet:
        bioImgURL === `${BUCKET_PATH}${BIO_DIRNAME}/` || !bioImgURL.length
    });

  } catch (error) {
    console.error("Error fetching bio data:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the Bio Page data"
    });
  };
};

// updateBio
const updateBio = async (req, res) => {
  const {
    bio_name,
    bio_img_url,
    bio_text,
    updated_Photo
  } = req.body;

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Check existing row
    const [existingRows] = await connection.query(
      `SELECT * FROM bio LIMIT 1`
    );

    const existingBioData = existingRows[0];

    // 2. INSERT if none exists
    if (!existingBioData) {
      await connection.query(
        `INSERT INTO bio (bio_name, bio_text, bio_img_url)
         VALUES (?, ?, ?)`,
        [bio_name, bio_text, bio_img_url]
      );

      await connection.commit();

      return res.json({
        message: "Bio inserted successfully",
        bioName: bio_name,
        bioText: bio_text,
        bioImgURL: `${BUCKET_PATH}${BIO_DIRNAME}/${bio_img_url}`
      });
    };

    const prevBioImgURL = existingBioData.bio_img_url;

    // 3. UPDATE bio
    await connection.query(
      `UPDATE bio
       SET bio_name = ?, bio_text = ?, bio_img_url = ?
       WHERE id = ?`,
      [bio_name, bio_text, bio_img_url, existingBioData.id]
    );

    await connection.commit();

    // 4. AWS cleanup (only after DB success)
    if (updated_Photo && prevBioImgURL) {
      try {
        await deleteFiles([`${BIO_DIRNAME}/${prevBioImgURL}`]);
      } catch (deleteError) {
        console.error("Error deleting files from AWS:", deleteError);
      };
    };

    const [updatedRows] = await pool.query(`SELECT * FROM bio LIMIT 1`);
    const updatedBioData = updatedRows[0];

    return res.json({
      message: "Bio updated successfully",
      bioName: updatedBioData.bio_name,
      bioText: updatedBioData.bio_text,
      bioImgURL: `${BUCKET_PATH}${BIO_DIRNAME}/${updatedBioData.bio_img_url}`
    });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    };

    console.error("Error updating Bio page:", error);

    // best-effort cleanup for failed upload
    try {
      if (bio_img_url) {
        await deleteFiles([`${BIO_DIRNAME}/${bio_img_url}`]);
      };
      
    } catch (deleteError) {
      console.error("Error deleting file from AWS:", deleteError);
      return res.status(500).send("Error deleting files from AWS");
    };

    return res.status(500).send("Error updating Bio page");

  } finally {
    if (connection) connection.release();
  };
};

export {
  getBio,
  updateBio
};