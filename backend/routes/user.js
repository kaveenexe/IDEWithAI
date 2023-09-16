const express = require("express");
const router = express.Router();

//controller functions
const {
  loginUser,
  signupUser,
  getUserByEmail,
  getUserByFname,
  // getUserFirstNameByEmail,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");

//login route
router.post("/login", loginUser)

//signup route
router.post( "/signup", signupUser ) 

// Get user by email
router.get("/email/:email", getUserByEmail);

// Get user by first name
router.get("/fname/:fname", getUserByFname);

// // getUserFirstNameByEmail
// router.get("/fname/email/:email", getUserFirstNameByEmail);

// Get all users
router.get("/", getAllUsers);

// ==================== CRUD ====================

// update user
router.put('/update/:id', updateUser);

module.exports = router;