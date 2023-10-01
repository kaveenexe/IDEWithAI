const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");

router.post("/create-community", communityController.createCommunity);
router.get("/community/:username", communityController.getCommunityUser);

module.exports = router;
