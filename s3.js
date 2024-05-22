const dotenv = require('dotenv');
const aws = require('aws-sdk');
const uuid = require("uuid").v4;

dotenv.config();

const s3 = new aws.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4'
});

module.exports.generateUploadURL = async function () {

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `images/${uuid()}.jpeg`,
    Expires: 60
  }
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
};