// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./Topbar";
import Dashboard from "./Dashboard";  
import Users from "./Users";

import "./App.css";
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Topbar />
        <main>
          <Routes>
            <Route path="*" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
