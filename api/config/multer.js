const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Konfigurasi penyimpanan file
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/products'); // Folder penyimpanan
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//     } else {
//         cb(new Error('File harus berupa gambar!'), false);
//     }
// };

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'product', 
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  });


const upload = multer({ storage, fileFilter });

module.exports = upload;
