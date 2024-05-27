const dotenv = require('dotenv');
dotenv.config();

const { v4: uuid } = require('uuid');
const { 
  S3Client, 
  PutObjectCommand,
  DeleteObjectCommand 
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Initialize S3 client with SDK v3
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION
});

// Generate upload URL function using SDK v3
const generateUploadURL = async function () {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `images/${uuid()}.jpeg`
  });

  const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  return uploadURL;
};

// Delete file function using SDK v3
const deleteFile = async (fileName) => {
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
};

module.exports = {
  generateUploadURL,
  deleteFile
};
