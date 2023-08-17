const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collation: "user-data" }
);

const UserModel = mongoose.model("UserData", User);
module.exports = UserModel;
