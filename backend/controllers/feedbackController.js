const Feedback = require("../models/feedbackModel");

const getFeedbackByAuthorEmail = async (req, res) => {
  try {
    const author = req.params.author;

    const feedback = await Feedback.findOne({ author: author });

    res.json({ feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteFeedbackById = async (req, res) => {
  try {
    const feedbackId = req.params.id;

    const deletedFeedback = await Feedback.findByIdAndRemove(feedbackId);

    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get feedback by author email
const getFeedbackByreciever = async (req, res) => {
  try {
    const reciever = req.params.reciever;

    const feedback = await Feedback.findOne({ reciever: reciever });
    res.json({ feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update feedback
const updateFeedbackByAuthor = async (req, res) => {
  try {
    const author = req.params.author;
    const { feedbackText } = req.body;

    const feedback = await Feedback.findOneAndUpdate(
      { author: author },
      { feedbackText: feedbackText },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json("Feedback not found");
    }

    res.json(feedback);
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getFeedbackByAuthorEmail,
  deleteFeedbackById,
  getFeedbackByreciever,
  updateFeedbackByAuthor,
};