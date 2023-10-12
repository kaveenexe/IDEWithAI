const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const Feedback = require("../models/feedbackModel");

router.post("/submit-feedback", (req, res) => {
  const { author, reciever, feedbackText } = req.body;
  if (!feedbackText) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const feedback = new Feedback({
    author,
    reciever,
    feedbackText,
  });

  feedback
    .save()
    .then(() => res.json("Feedback Sent Successfully!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get("/by-author/:author", feedbackController.getFeedbackByAuthorEmail);
router.delete("/delete/:id", feedbackController.deleteFeedbackById);

// Find feedback by reciever email
router.get("/by-reciever/:reciever", (req, res) => {
  const reciever = req.params.reciever;

  Feedback.find({ reciever: reciever })
    .then((feedback) => {
      if (!feedback || feedback.length === 0) {
        res.status(404).json("Feedback not found");
      } else {
        res.json(feedback);
      }
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Find feedback by receiver email and get count
router.get("/count/by-receiver/:receiver", async (req, res) => {
  const receiver = req.params.receiver;

  try {
    const count = await Feedback.countDocuments({ receiver: receiver });
    res.json({ count });
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.get("/by-author/:reciever", feedbackController.getFeedbackByreciever); // Add this line
router.put("/by-author/:author", feedbackController.updateFeedbackByAuthor); // Add this line

module.exports = router;
