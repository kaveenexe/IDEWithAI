import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register&Login/register";
import Login from "./pages/Register&Login/login";
import Navbar from "./components/Navbar/Navbar";
import Filemanager from "./components/Filemanager/Filemanager";
import Home from "./pages/Home/home";
import IDE from "./pages/IDE/CodeEditor";
import UserDB from "./pages/UserDB/Dashboard"
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>

      {/* Navbar Hear */}
        <Navbar/>
        <Filemanager/>
        {/* Routes Hear */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/code-editor" element={<IDE />} />
          <Route path="/dashboard" element={<UserDB />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
