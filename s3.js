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
const generateUploadURL = async function (dirname) {

  const awsDirname = dirname;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    // Key: `images/${uuid()}.jpeg`
    Key: `${awsDirname}/${uuid()}.jpeg`
  });


  const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return uploadURL;
};

// Delete multiple files function using SDK v3
const deleteFiles = async (fileNames) => {
  try {
    const deletePromises = fileNames.map(async (fileName) => {
      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName
      };
      const response = await s3Client.send(new DeleteObjectCommand(deleteParams));
      return response;
    });

    const responses = await Promise.all(deletePromises);
    return responses;
  } catch (error) {
    console.error('Error deleting files:', error);
    throw error; 
  }
};


module.exports = {
  generateUploadURL,
  deleteFiles
};
