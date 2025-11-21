// src/pages/Employees/Employees.js
import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import "./Employees.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [editing, setEditing] = useState(null);

  async function load() {
    try {
      const data = await api.employees.list();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      alert(err.message || "Error loading employees");
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      if (editing) {
        await api.employees.update(editing.id, form);
        setEditing(null);
      } else {
        await api.employees.create(form);
      }
      setForm({ firstName: "", lastName: "", email: "" });
      await load();
    } catch (err) {
      alert(err.message || "Save failed");
    }
  }

  function handleEdit(emp) {
    setEditing(emp);
    setForm({ firstName: emp.firstName || "", lastName: emp.lastName || "", email: emp.email || "" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete employee?")) return;
    try {
      await api.employees.remove(id);
      await load();
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  }

  return (
    <div className="page-wrap">
      <h2>Employees</h2>

      <form className="emp-form" onSubmit={handleCreate}>
        <input placeholder="First name" value={form.firstName} onChange={e=>setForm({...form, firstName: e.target.value})} />
        <input placeholder="Last name" value={form.lastName} onChange={e=>setForm({...form, lastName: e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
        <button type="submit">{editing ? "Update" : "Add Employee"}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ firstName:"", lastName:"", email:"" }); }}>Cancel</button>}
      </form>

      <div className="emp-list">
        {employees.map(emp => (
          <EmployeeCard key={emp.id} employee={emp} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
        {employees.length === 0 && <div className="empty">No employees</div>}
      </div>
    </div>
  );
}
