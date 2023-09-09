const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/inviteController");

router.post( "/create-invite", inviteController.createInvite );
router.get( "/invitations/:inviteeId", inviteController.getInvitations );
router.post("/accept/:inviteeId", inviteController.acceptInvitation);
router.post("/decline/:inviteeId", inviteController.declineInvitation);

module.exports = router;
