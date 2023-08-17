import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register&Login/register";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>

      {/* Navbar Hear */}

        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
