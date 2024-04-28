// aws sdk v3
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require('multer');
const storage = multer.memoryStorage();
const uuid = require("uuid").v4;

// multer error config for file type
const fileFilter = (req, file, callBack) => {
  if(file.mimetype.split('/')[0] === 'image') {
    callBack(null, true)
  } else {
    callBack(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false)
  }
}

const upload = multer({ 
  storage, 
  fileFilter, 
  limits: {fileSize: 1000000, files: 10}
});

// exports.s3Uploadv3 = async (files) => {
const s3Uploadv3 = async (files) => {
  const s3client = new S3Client();
  const fileNames = [];
  
  const params = files.map(file => {
    const fileType = file.mimetype.split("/")[1];

    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `images/${uuid()}.${fileType}`,
      Body: file.buffer
    };
  });

  await Promise.all(
    params.map(param => {
      fileNames.push(param.Key)
      return s3client.send(new PutObjectCommand(param))
    })
  );

  return fileNames;
};

module.exports = {
  s3Uploadv3,
  fileFilter,
  upload
};