// src/pages/Register/Register.js
import React, { useState } from "react";
import { api } from "../../api/api";
import "./Register.css";

export default function Register() {
  const [orgName, setOrgName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await api.auth.register({ orgName, name, email, password });
      if (data.token) {
        alert("Registered — now login");
        window.location.href = "/login";
      } else {
        alert("Register failed");
      }
    } catch (err) {
      alert(err.message || "Register error");
    }
  }

  return (
    <div className="auth-wrap">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Create organisation</h2>
        <input placeholder="Organisation name" value={orgName} onChange={e=>setOrgName(e.target.value)} />
        <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
