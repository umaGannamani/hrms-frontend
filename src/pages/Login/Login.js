// src/pages/Login/Login.js
import React, { useState, useContext } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await api.auth.login({ email, password });
      if (data.token) {
        login(data.token);
        window.location.href = "/";
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert(err.message || "Login error");
    }
  }

  return (
    <div className="auth-wrap">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <div className="small-links">
          <a href="/register">Create account</a>
        </div>
      </form>
    </div>
  );
}
