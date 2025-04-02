const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan file
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/products'); // Folder penyimpanan
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// Filter tipe file yang boleh diunggah
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('File harus berupa gambar!'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
