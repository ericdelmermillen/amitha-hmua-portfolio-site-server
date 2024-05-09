const dotenv = require('dotenv');
const aws = require('aws-sdk');
// const crypto = require('crypto');
const uuid = require("uuid").v4;
const { promisify } = require('util');

dotenv.config();

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})


module.exports.generateUploadURL = async function () {
  // const randomBytes = promisify(crypto.randomBytes);
  // const rawBytes = await randomBytes(16)
  // const imageName = rawBytes.toString('hex')

  const params = {
    Bucket: bucketName,
    // Key: imageName,
    Key: `images/${uuid()}.jpeg`,
    Expires: 60
  }
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL;
};