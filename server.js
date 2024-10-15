const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/uploads')); // Save files to public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique name for each file
  }
});

const upload = multer({ storage });

// Middleware for serving static assets
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to serve the upload form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Handle file upload
app.post('/upload', upload.single('musicFile'), (req, res) => {
  const { songName, author, description } = req.body;
  const fileUrl = `/uploads/${req.file.filename}`;
  
  // For now, just send back the metadata and file URL
  res.send(`
    <h1>Upload successful!</h1>
    <p>Song Name: ${songName}</p>
    <p>Author: ${author}</p>
    <p>Description: ${description}</p>
    <p>File URL: <a href="${fileUrl}">${fileUrl}</a></p>
    <a href="/">Upload another file</a>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
