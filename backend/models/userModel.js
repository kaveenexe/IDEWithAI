const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique:true
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  }
);

// static signup method
userSchema.statics.signup = async function(email, fname, lname, password) {

  //validation
  if (!email || !fname || !lname || !password) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password must be at least 8 characters long, contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol");
  }


  const exists = await this.findOne({ email})

  if (exists) {
    throw Error("User already exists");
  } 

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, fname, lname, password: hash });

  return user
}

module.exports = mongoose.model("User", userSchema);
