const Community = require("../models/communityModel");

const createCommunity = async (req, res) => {
  try {
    const { fname, email, username, expLevel, aboutMe } = req.body;

    if (!fname || !email || !username) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const existingUser = await Community.findOne({ username: username });

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken." });
    }

    const community = new Community({
      fullName: fname,
      email,
      username,
      experienceLevel: expLevel,
      aboutMe,
    });

    await community.save();

    res
      .status(201)
      .json({ message: "Community user created successfully", community });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getCommunityUser = async (req, res) => {
  try {
    const username = req.params.username;

    const communities = await Community.find({ username: username });

    res.json({ communities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createCommunity,
  getCommunityUser,
};
