// controllers/fileController.js
const File = require('../model/filemodel');

// Create a new file
exports.createFile = async (req, res) => {
  try {
    const { name, content } = req.body;
    const file = new File({ name, content });
    await file.save();
    res.status(201).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create file' });
  }
};

// Get all files
exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch files' });
  }
};

// Update a file by ID
exports.updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content } = req.body;

    const file = await File.findByIdAndUpdate(id, { name, content }, { new: true });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not update file' });
  }
};

// Delete a file by ID
exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findByIdAndRemove(id);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not delete file' });
  }
};
