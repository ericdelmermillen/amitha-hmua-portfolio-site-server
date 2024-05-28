const knex = require("knex")(require("../knexfile.js"));
// const { verifyToken } = require('../utils/utils.js');

// getBio to show bio page
const getBio = async (req, res) => {

  const bioData = await knex('bio').first(); 

  const bioName = bioData.bio_name;
  // will need to send this concatenated with the aws bucket url and folder name
  const bioImgURL = bioData.bio_img_url;
  
  const bioText = bioData.bio_text;
  
  return res.json({
    message: "Here's the bio", 
    bioName, 
    bioImgURL,
    bioText});
}

module.exports = {
  getBio
}