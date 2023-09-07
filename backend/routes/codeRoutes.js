const express = require("express");
const router = express.Router();
const codeController = require("../controllers/codeController");

router.post("/save-code", codeController.saveCode);

module.exports = router;