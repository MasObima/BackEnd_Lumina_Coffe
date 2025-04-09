const File = require('../models/File');

exports.uploadFiles = async (req, res) => {
  try {
    const file = new File({
      name: req.file.originalname,
      url: req.file.path,
      cloudinary: req.file.filename
    });

    await file.save();
    res.status(201).json(file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
