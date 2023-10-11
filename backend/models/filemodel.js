// models/file.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  content: { type: String},
  createdDate: { type: Date, default: Date.now },
  lastModifiedDate: { type: Date, default: Date.now },
  // Add other properties as needed
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
