// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Create a new file
router.post('/', fileController.createFile);

// Get all files
router.get('/', fileController.getAllFiles);

// Update a file by ID
router.put('/:id', fileController.updateFile);

// Delete a file by ID
router.delete('/:id', fileController.deleteFile);

module.exports = router;
