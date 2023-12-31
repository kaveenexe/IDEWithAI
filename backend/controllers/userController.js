const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// create token for 3 days
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email } = req.body.email;
  const { fname } = req.body.email;
  const { lname } = req.body.email;
  const { password } = req.body.email;

//   console.log("User Controller:", email);

  try {
    const user = await User.signup(email, fname, lname, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user); // Return the user data
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  const userEmail = req.params.email;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user); // Return the user data
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user by first name
const getUserByFname = async (req, res) => {
  const userFname = req.params.fname;

  try {
    const user = await User.findOne({ fname: userFname });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user); // Return the user data
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// // Get user's first name by email
// const getUserFirstNameByEmail = async (req, res) => {
//   const userEmail = req.params.email;

//   try {
//     const user = await User.findOne({ email: userEmail });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Return only the fname
//     res.status(200).json({ fname: user.fname });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // Return an array of all users
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// =================== CRUD ===================

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, email, password, confirmPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user fields
    if (fname) user.fname = fname;
    if (lname) user.lname = lname;
    if (email) user.email = email;

    // Update password if provided and validate confirmPassword
    if (password) {
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete User 
const deleteAccount = async (req, res) => {
  const userId = req.params.id; // Assuming you have user data in the request

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Optionally, you can perform additional cleanup, like deleting user-related data

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getUserById,
  getUserByEmail,
  getUserByFname,
  // getUserFirstNameByEmail,
  getAllUsers,
  updateUser,
  deleteAccount
};
