const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/submit-feedback", feedbackController.submitFeedback);
router.get(
  "/feedback/by-reciever/:recieverId",
  feedbackController.getFeedbackByReciever
);
router.get(
  "/feedback/by-author/:authorId",
  feedbackController.getFeedbackByAuthor
);

module.exports = router;
