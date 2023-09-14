const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  invitee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  message: String,
});

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;