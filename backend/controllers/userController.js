const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET_KEY, {expiresIn: "3d"})
}

//login user
const loginUser = async (req, res) => {
    res.json({ message: "Login user" });
}

// signup user
const signupUser = async (req, res) => {
    const { email, fname, lname, password } = req.body;

    try {
        const user = await User.signup(email, fname, lname, password);

        //create a token
        const token = createToken(user._id);

        res.status(200).json({ email, token }); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser };