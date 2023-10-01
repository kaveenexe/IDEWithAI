const Invite = require("../models/inviteModel");

const createInvite = async (req, res) => {
  try {
    const { senderId, email, message, image } = req.body;

    const invitation = new Invite({
      sender: senderId,
      email: email,
      message: message,
      snapshot: image,
    });

    await invitation.save();

    res.status(201).json({ invitation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInvitations = async (req, res) => {
  try {
    const email = req.params.email;

    const invitations = await Invite.find({ invitee: email });

    res.json({ invitations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createInvite,
  getInvitations,
};