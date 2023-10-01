const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/inviteController");

router.post( "/create-invite", inviteController.createInvite );
router.get( "/invitations/:email", inviteController.getInvitations );

module.exports = router;
