const knex = require("knex")(require("../knexfile.js"));
// const { verifyToken } = require('../utils/utils.js');

// getBio to show bio page
const getBio = async (req, res) => {

  try {
    const bioData = await knex('bio').first(); 

    if(bioData) {
      const { 
        bio_name: bioName, 
        bio_text: bioText 
      } = bioData;

      // will need to send this concatenated with the aws bucket url and folder name
      const bioImgURL = bioData.bio_img_url;
      
      return res.json({
        bioName, 
        bioImgURL,
        bioText});
    } else {
      console.log("No bio data found in database");
      return res.status(404).json({message: "Bio data not found"});
    }

  } catch(error) {
    console.error("Error fetching bio data:", error);
    return res.status(500).json({message: "An error occurred while fetching the Bio Page data"});
  }
}

module.exports = {
  getBio
}