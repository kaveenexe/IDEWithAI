const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./dbConnect");
const { config } = require("dotenv");

const userRoutes = require("./routes/user");
const fileRoutes = require("./routes/fileRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const codeRoutes = require( "./routes/codeRoutes" );
const feedbackRoutes = require( "./routes/feedbackRoutes" );
const inviteRoutes = require("./routes/inviteRoutes");

const communityRoutes = require("./routes/communityRoutes");

app.use(cors());
app.use(express.json());

//allows us access environment variables like dotenv files
config();

dbConnect();

//User 
app.use("/api/user", userRoutes);
app.use("/api/mentor", mentorRoutes);

//IDE
app.use( "/api/ide", codeRoutes );

//Feedback
app.use("/api/feedback", feedbackRoutes);

//Invitation
app.use("/api/invitation", inviteRoutes);

app.use( "/api/files", fileRoutes );

//Community
app.use("/api/community", communityRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});

