const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    snapshotImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;