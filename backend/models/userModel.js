const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
