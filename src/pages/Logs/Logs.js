// src/pages/Logs/Logs.js
import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { formatDate } from "../../utils/helpers";
import "./Logs.css";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [creating, setCreating] = useState({ action: "", details: "" });

  async function load() {
    try {
      const data = await api.logs.list();
      setLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      alert(err.message || "Load failed");
    }
  }

  useEffect(() => { load(); }, []);

  async function createLog(e) {
    e.preventDefault();
    try {
      await api.logs.create(creating);
      setCreating({ action: "", details: "" });
      await load();
    } catch (err) { alert(err.message || "Create failed"); }
  }

  return (
    <div className="page-wrap">
      <h2>Audit Logs</h2>

      <form className="log-form" onSubmit={createLog}>
        <input placeholder="Action" value={creating.action} onChange={e=>setCreating({...creating, action: e.target.value})} />
        <input placeholder="Details" value={creating.details} onChange={e=>setCreating({...creating, details: e.target.value})} />
        <button type="submit">Create Log</button>
      </form>

      <div className="log-list">
        {logs.map(l => (
          <div className="log-row" key={l.id}>
            <div className="log-meta">
              <div className="log-action">{l.action}</div>
              <div className="log-time">{formatDate(l.timestamp || l.createdAt || l.created_at)}</div>
            </div>
            <div className="log-details">{l.details || JSON.stringify(l.meta || {})}</div>
          </div>
        ))}
        {logs.length === 0 && <div className="empty">No logs</div>}
      </div>
    </div>
  );
}