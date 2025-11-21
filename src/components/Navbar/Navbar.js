// src/components/Navbar/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">Evallo HRMS</Link>
      </div>
      <div className="nav-right">
        {token ? (
          <>
            <Link to="/employees">Employees</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/logs">Logs</Link>
            <button className="btn-logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
