import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register&Login/Register";
import Login from "./pages/Register&Login/login";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/home";
import IDE from "./pages/IDE/CodeEditor";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>

      {/* Navbar Hear */}
        <Navbar/>

        {/* Routes Hear */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/code-editor" element={<IDE />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
