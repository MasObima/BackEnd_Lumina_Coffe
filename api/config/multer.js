const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Konfigurasi penyimpanan menggunakan Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product', // Nama folder di Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Format gambar yang diizinkan
  },
});

// Middleware multer untuk menangani upload
const upload = multer({ storage });

module.exports = upload;
