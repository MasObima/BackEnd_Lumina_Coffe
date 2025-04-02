const express = require('express')
const path = require("path");
const multer = require('multer')
const {uploadFiles} = require('../controller/FileController')

const uploadPath = path.join(__dirname, "uploads"); // ✅ Path relatif
const upload = multer({dest: uploadPath})

const router =  express.Router()

router.post('/upload', upload.single('file'), uploadFiles)


module.exports = router