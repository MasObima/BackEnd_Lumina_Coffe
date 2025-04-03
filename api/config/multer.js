const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'product', 
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  });

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('File harus berupa gambar!'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
