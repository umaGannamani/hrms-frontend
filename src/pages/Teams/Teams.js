// src/pages/Teams/Teams.js
import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import "./Teams.css";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [teamName, setTeamName] = useState("");

  async function load() {
    try {
      const t = await api.teams.list();
      setTeams(Array.isArray(t) ? t : []);
      const e = await api.employees.list();
      setEmployees(Array.isArray(e) ? e : []);
    } catch (err) {
      alert(err.message || "Load error");
    }
  }

  useEffect(() => { load(); }, []);

  async function createTeam(e) {
    e.preventDefault();
    if (!teamName.trim()) return;
    try {
      await api.teams.create({ name: teamName });
      setTeamName("");
      await load();
    } catch (err) { alert(err.message || "Create failed"); }
  }

  async function assign(teamId, employeeId) {
  if (!employeeId) return alert("Select employee");
  try {
    await api.teams.assign(teamId, Number(employeeId));
    await load();
  } catch (err) {
    alert(err.message);
  }
}


  async function unassign(teamId, employeeId) {
    try {
      await api.teams.unassign( teamId, employeeId );
      await load();
    } catch (err) { alert(err.message || "Unassign failed"); }
  }

  async function removeTeam(id) {
    if (!window.confirm("Delete team?")) return;
    try { await api.teams.remove(id); await load(); } catch (err) { alert(err.message || "Delete failed"); }
  }

  return (
    <div className="page-wrap">
      <h2>Teams</h2>

      <form className="team-form" onSubmit={createTeam}>
        <input placeholder="Team name" value={teamName} onChange={e=>setTeamName(e.target.value)} />
        <button type="submit">Create Team</button>
      </form>

      <div className="team-list">
        {teams.map(t => (
          <div className="team-card" key={t.id}>
            <div className="team-head">
              <div className="team-name">{t.name}</div>
              <div><button className="btn-danger" onClick={()=>removeTeam(t.id)}>Delete</button></div>
            </div>
            <div className="team-members">
              <strong>Members:</strong>
              <div className="members">
                {(t.Employees || []).map(m => (
                  <div className="member" key={m.id}>
                    {m.firstName} {m.lastName}
                    <button onClick={()=>unassign(t.id, m.id)} className="btn-small">Unassign</button>
                  </div>
                ))}
                {(!t.Employees || t.Employees.length===0) && <div className="muted">No members</div>}
              </div>
            </div>
            <div className="assign-row">
              <select id={`sel-${t.id}`}>
                <option value="">Select employee</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
              </select>
              <button onClick={() => { const sel = document.getElementById(`sel-${t.id}`); assign(t.id, sel.value); }}>Assign</button>
            </div>
          </div>
        ))}
        {teams.length === 0 && <div className="empty">No teams</div>}
      </div>
    </div>
  );
}
