// src/components/EmployeeCard/EmployeeCard.js
import React from "react";
import "./EmployeeCard.css";

export default function EmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <div className="emp-card">
      <div className="emp-main">
        <div className="emp-name">{employee.firstName} {employee.lastName}</div>
        <div className="emp-email">{employee.email}</div>
      </div>
      <div className="emp-meta">
        <button onClick={() => onEdit(employee)} className="btn-small">Edit</button>
        <button onClick={() => onDelete(employee.id)} className="btn-small btn-danger">Delete</button>
      </div>
    </div>
  );
}
