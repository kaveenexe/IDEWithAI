const getAiChatResponse = require("../controllers/mentorController");

const router = require("express").Router();

router.post("/", getAiChatResponse);

module.exports = router;
