import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register&Login/Register";
import Login from "./pages/Register&Login/login";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>

      {/* Navbar Hear */}

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
