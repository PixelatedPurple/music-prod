const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// POST route for file uploads
router.post('/', uploadController.handleUpload);

module.exports = router;
