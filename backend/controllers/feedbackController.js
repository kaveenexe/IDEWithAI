const Feedback = require("../models/feedbackModel");

const submitFeedback = async (req, res) => {
  try {
    const { authorId, recieverId, feedbackText } = req.body;

    const feedback = new Feedback({
      author: authorId,
      reciever: recieverId,
      feedbackText,
    });

    await feedback.save();

    res.status(201).json({ feedback });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFeedbackByReciever = async (req, res) => {
  try {
    const recieverId = req.params.recieverId;

    const feedback = await Feedback.find({ reciever: recieverId });

    res.json({ feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFeedbackByAuthor = async (req, res) => {
  try {
    const authorId = req.params.authorId;

    const feedback = await Feedback.find({ author: authorId });

    res.json({ feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { submitFeedback, getFeedbackByReciever, getFeedbackByAuthor };
