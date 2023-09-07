const Code = require("../models/codeModel");

const saveCode = async (req, res) => {
  try {
    const { code } = req.body;

    const newCode = new Code({ code });
    await newCode.save();

    res.status(201).json({ message: "Code saved successfully" });
  } catch (error) {
    console.error("Error saving code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { saveCode };
