const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for local file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

// Logic for handling file upload
exports.handleUpload = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).send('Error uploading file.');
    }

    const { songName, author, description } = req.body;
    const fileData = {
      songName,
      author,
      description,
      filePath: `/uploads/${req.file.filename}`
    };

    // Save metadata as a JSON file
    fs.writeFileSync(`./public/uploads/${req.file.filename}.json`, JSON.stringify(fileData, null, 2));

    res.json({
      message: 'File uploaded successfully!',
      link: fileData.filePath,
      metadata: fileData
    });
  });
};
