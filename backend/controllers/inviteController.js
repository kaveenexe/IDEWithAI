const Invite = require("../models/inviteModel");

const getInvitationBySender = async (req, res) => {
  try {
    const sender = req.params.sender;

    const invitation = await Invite.findOne({ sender: sender });

    if (!invitation) {
      return res.status(404).json({ error: "Invitation not found" });
    }

    res.json({ invitation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getInvitationBySender,
};