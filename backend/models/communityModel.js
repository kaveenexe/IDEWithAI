const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  experienceLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  aboutMe: {
    type: String,
  },
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
