const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'Upload-Img',
  allowedFormats: ['jpg', 'png', 'gif', 'mp4'],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploader = multer({ storage });
module.exports = uploader;