const User = require("../models/userModel");
//login user
const loginUser = async (req, res) => {
    res.json({ message: "Login user" });
}

// signup user
const signupUser = async (req, res) => {
    const { email, fname, lname, password } = req.body;

    try {
        const user = await User.signup(email, fname, lname, password);
        res.status(200).json({ email, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser };