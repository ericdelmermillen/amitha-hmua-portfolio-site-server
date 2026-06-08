import dotenv from 'dotenv';
dotenv.config();

import { v4 as uuid } from 'uuid';

import { 
  S3Client, 
  PutObjectCommand,
  DeleteObjectCommand 
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


// Initialize S3 client with SDK v3
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: process.env.REGION
});

// Generate upload URL function using SDK v3
const generateUploadURL = async function (dirname) {

  const awsDirname = dirname;

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
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
        Bucket: process.env.BUCKET_NAME,
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


export {
  generateUploadURL,
  deleteFiles
};
