const express = require("express");
const router = express.Router();
const Invitation = require( "../models/inviteModel" );
const inviteController = require( "../controllers/inviteController" );
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../frontend/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Get all invitations
router.get("/", (req, res) => {
  Invitation.find()
    .then((invitation) => res.json(invitation))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Add new invitation
router.post("/create-invite", upload.single("snapshotImage"), (req, res) => {
  const invitation = new Invitation({
    sender: req.body.sender,
    email: req.body.email,
    message: req.body.message,
    snapshotImage: req.file.originalname,
  });

  invitation
    .save()
    .then(() => res.json("Invitation Send Successfully!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Find invitation by email
router.get("/:email", (req, res) => {
  const email = req.params.email;

  Invitation.find({ email: email })
    .then((invitation) => {
      if (!invitation || invitation.length === 0) {
        res.status(404).json("Invitation not found");
      } else {
        res.json(invitation);
      }
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Delete invitation by id
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  
  Invitation.findByIdAndRemove(id)
  .then(() => res.json({ message: "Invitation deleted successfully" }))
  .catch((err) => res.status(400).json(`Error: ${err}`));
} );

// Find invitation by sender
router.get("/get-invitation/:sender", inviteController.getInvitationBySender);

module.exports = router;
