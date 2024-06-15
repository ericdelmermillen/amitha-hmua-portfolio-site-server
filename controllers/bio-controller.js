const knex = require("knex")(require("../knexfile.js"));

const { deleteFiles } = require("../s3.js");

const AWS_BUCKET_PATH = process.env.AWS_BUCKET_PATH;
const AWS_BIO_DIRNAME = process.env.AWS_BIO_DIRNAME;

// getBio to show bio page
const getBio = async (req, res) => {

  try {
    const bioData = await knex('bio').first(); 

    if(bioData) {
      const { 
        bio_name: bioName, 
        bio_text: bioText 
      } = bioData;

      const bioImgURL = bioData.bio_img_url 
        ? `${AWS_BUCKET_PATH}${AWS_BIO_DIRNAME}/${bioData.bio_img_url}`
        : ""
        
      return res.json({
        bioName: bioName, 
        bioText: bioText,
        bioImgURL: bioImgURL,
        bioImageNotSet: bioImgURL === `${AWS_BUCKET_PATH}${AWS_BIO_DIRNAME}/` || !bioImgURL.length
      });
    } else {
      return res.status(404).json({message: "Bio data not found or not set"});
    }

  } catch(error) {
    console.error("Error fetching bio data:", error);
    return res.status(500).json({message: "An error occurred while fetching the Bio Page data"});
  }
}

// updateBio
const updateBio = async (req, res) => {

  const { 
    bio_name, 
    bio_img_url, 
    bio_text, 
    updated_Photo
  } = req.body;
  
  try {
    // Check if any data exists in the bio table
    const existingBioData = await knex('bio').first();
    if (!existingBioData) {
      // If no data exists, insert new data
      const insertedBio = await knex('bio').insert({
        bio_name,
        bio_text,
        bio_img_url
      });

      // Return success message
      return res.json({
        message: "Bio inserted successfully",
        bioName: bio_name,
        bioText: bio_text,
        bioImgURL: `${AWS_BUCKET_PATH}${AWS_BIO_DIRNAME}/${bio_img_url}`
      });
    }

    // Get existing bio data
    const prevBioImgURL = existingBioData.bio_img_url;

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

      if(updated_Photo) {
        // Delete old AWS objects on successful update
        try {
          await deleteFiles([`${AWS_BIO_DIRNAME}/${prevBioImgURL}`]);
        } catch (deleteError) {
          console.error('Error deleting files from AWS:', deleteError);
        }
      }
      
      return res.json({
        message: "Bio updated successfully",
        bioName: updatedBioName,
        bioText: updatedBioText,
        bioImgURL: `${AWS_BUCKET_PATH}${AWS_BIO_DIRNAME}/${updatedBioImgURL}`
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
};


module.exports = {
  getBio,
  updateBio
}