const express = require("express");
const router = express.Router();

//controller functions
const {
  loginUser,
  signupUser,
  getUserByEmail,
  getUserByFname,
  getAllUsers,
} = require("../controllers/userController");

//login route
router.post("/login", loginUser)

//signup route
router.post( "/signup", signupUser ) 

// Get user by email
router.get("/email/:email", getUserByEmail);

// Get user by first name
router.get("/fname/:fname", getUserByFname);

// Get all users
router.get("/", getAllUsers);

module.exports = router;