const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/user");
app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await UserModel.create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
});

app.post("/api/login", async (req, res) => {
  
    const user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
        return res.json({ status: "ok", user: true });
    } else {
        return res.json({ status: "error", user: false });
    }
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
