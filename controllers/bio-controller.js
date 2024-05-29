const knex = require("knex")(require("../knexfile.js"));
const { verifyToken } = require('../utils/utils.js');
const { deleteFiles } = require("../s3.js");

const AWS_BUCKET_PATH = process.env.AWS_BUCKET_PATH;

// getBio to show bio page
const getBio = async (req, res) => {

  try {
    const bioData = await knex('bio').first(); 

    if(bioData) {
      const { 
        bio_name: bioName, 
        bio_text: bioText 
      } = bioData;

      const bioImgURL = `${AWS_BUCKET_PATH}bio/${bioData.bio_img_url}`;
      
      return res.json({
        bioName, 
        bioText,
        bioImgURL});
    } else {
      console.log("No bio data found in database");
      return res.status(404).json({message: "Bio data not found"});
    }

  } catch(error) {
    console.error("Error fetching bio data:", error);
    return res.status(500).json({message: "An error occurred while fetching the Bio Page data"});
  }
}

// updateBio
// add validation schema for bio data
const updateBio = async (req, res) => {
  const token = req.headers.authorization; 

  // if(!verifyToken(token)) {
  //   return res.status(401).send({ message: "unauthorized" });
  // }

  const { 
    bio_name, 
    bio_img_url, 
    bio_text 
  } = req.body;

  // Validate request data
  if (!bio_name || !bio_img_url || !bio_text) {
    return res.status(400).json({ message: "Incomplete Bio update data sent" });
  }
  
  try {
    // Get existing bio data
    const bioData = await knex('bio').first(); 
    const prevBioImgURL = bioData.bio_img_url;

    // Update bio data
    const updatedBio = await knex('bio')
      .where('id', 1)
      .update({
        bio_name,
        bio_text,
        bio_img_url
      });

    if(updatedBio) {
      // Fetch the updated bio data
      const updatedBioData = await knex('bio').first(); 
      
      const {      
        bio_name: updatedBioName,
        bio_text: updatedBioText,
        bio_img_url: updatedBioImgURL
      } = updatedBioData;
      
      // Delete old AWS objects on successful update
      try {
        await deleteFiles([`bio/${prevBioImgURL}`]);
      } catch (deleteError) {
        console.error('Error deleting files from AWS:', deleteError);
      }
      
      return res.json({
        message: "Bio updated successfully",
        bioName: updatedBioName,
        bioText: updatedBioText,
        bioImgURL: updatedBioImgURL
      });
    }

  } catch (error) {
    console.error('Error updating Bio page:', error);

    // If updating bio fails, delete the AWS object added by the client
    try {
      console.log("Update failed: deleting new photo from AWS");
      const deleteResponse = await deleteFiles([`bio/${bio_img_url}`]);

      if(!deleteResponse) {
        throw new Error("Error deleting files from AWS");
      }

    } catch(deleteError) {
      // Handle errors in AWS object deletion
      console.error("Error deleting file from AWS:", deleteError);
      return res.status(500).send("Error deleting files from AWS");
    }
    
    return res.status(500).send("Error updating Bio page");
  }
}



module.exports = {
  getBio,
  updateBio
}