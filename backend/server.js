const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./dbConnect");
const { config } = require("dotenv");
const userRoutes = require("./routes/user");
const mentorRoutes = require("./routes/mentorRoutes");

app.use(cors());
app.use(express.json());

//allows us access environment variables like dotenv files
config();

dbConnect();

//routes
app.use("/api/user", userRoutes);
app.use("/api/mentor", mentorRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
