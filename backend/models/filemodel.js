// models/file.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  // Add other properties as needed
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
