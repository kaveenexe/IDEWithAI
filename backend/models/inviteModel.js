const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  snapshot: {
    type: String,
  }
});

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;