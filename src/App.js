// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employees from "./pages/Employees/Employees";
import Teams from "./pages/Teams/Teams";
import Logs from "./pages/Logs/Logs";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        }/>

        <Route path="/employees" element={
          <ProtectedRoute><Employees /></ProtectedRoute>
        }/>

        <Route path="/teams" element={
          <ProtectedRoute><Teams /></ProtectedRoute>
        }/>

        <Route path="/logs" element={
          <ProtectedRoute><Logs /></ProtectedRoute>
        }/>

      </Routes>
    </>
  );
}

export default App;
