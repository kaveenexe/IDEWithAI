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

router.get('/:id/content', fileController.getFileContent);

router.put('/:id/content', fileController.updateFileContent);

router.get('/:id/details', fileController.getFileDetails);

// Extract file details
router.post('/extract-details', fileController.extractFileDetails);

//count 
router.get('/count', fileController.getCountOfFiles);

module.exports = router;
