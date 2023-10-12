const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    reciever: {
      type: String,
      required: true,
    },
    feedbackText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
