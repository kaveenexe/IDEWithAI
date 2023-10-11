import { React, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Register from "./pages/Register&Login/register";
import Login from "./pages/Register&Login/login";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/home";
import IDE from "./pages/IDE/CodeEditor";
import UserDB from "./pages/UserDB/Dashboard";
import Community from "./pages/Community/Community";
import { useAuthContext } from "./hooks/useAuthContext";
import ActivityTracker from "./components/UserActivity/ActivityTracker";
import "./App.css";

function App() {
  //Getting all the details of the user from his email he logged in with and saving it to local storage

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/email/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const userData = res.data;

        // Save user data to localStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        console.log(userData);
      } catch (err) {
        console.log("User not logged in");
      }
    };
    fetchUser();
  }, [user]);

  return (
    <div>
      <BrowserRouter>
        {/* Navbar Hear */}
        <Navbar />

        {/* Routes Hear */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/code-editor" element={<IDE />} />
          <Route path="/dashboard" element={<UserDB />} />
          <Route path="/community" element={<Community />} />
          <Route path="/user-activity" element={<ActivityTracker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
