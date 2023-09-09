const Invite = require("../models/inviteModel");

const createInvite = async (req, res) => {
  try {
    const { senderId, inviteeId, projectId, message } = req.body;

    const invitation = new Invite({
      sender: senderId,
      invitee: inviteeId,
      project: projectId,
      message,
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
    const inviteeId = req.params.inviteeId;

    const invitations = await Invite.find({ invitee: inviteeId });

    res.json({ invitations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const acceptInvitation = async (req, res) => {
  try {
    const invitationId = req.params.invitationId;

    const invitation = await Invite.findByIdAndUpdate(
      invitationId,
      { status: "accepted" },
      { new: true }
    );

    res.json({ invitation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const declineInvitation = async (req, res) => {
  try {
    const invitationId = req.params.invitationId;

    const invitation = await Invite.findByIdAndUpdate(
      invitationId,
      { status: "declined" },
      { new: true }
    );

    res.json({ invitation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createInvite,
  getInvitations,
  acceptInvitation,
  declineInvitation,
};

