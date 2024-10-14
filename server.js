const express = require('express');
const path = require('path');
const uploadRoute = require('./routes/upload');  // Import upload route
const app = express();
const { PORT } = require('./config/config'); // Import configuration

// Middleware for serving static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to serve upload form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Use upload route for handling file uploads
app.use('/upload', uploadRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
