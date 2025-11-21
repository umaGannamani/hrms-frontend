// src/api/api.js
export const API_BASE = "http://localhost:5000";

async function request(path, { method = "GET", body = null, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }

  if (!res.ok) {
    const err = (data && data.message) || res.statusText || "Request failed";
    throw new Error(err);
  }
  return data;
}

export const api = {
  auth: {
    register: (payload) => request("/auth/register", { method: "POST", body: payload, auth: false }),
    login: (payload) => request("/auth/login", { method: "POST", body: payload, auth: false }),
  },
  employees: {
    list: () => request("/employees", { method: "GET" }),
    create: (body) => request("/employees", { method: "POST", body }),
    update: (id, body) => request(`/employees/${id}`, { method: "PUT", body }),
    remove: (id) => request(`/employees/${id}`, { method: "DELETE" }),
  },
  teams: {
    list: () => request("/teams", { method: "GET" }),
    create: (body) => request("/teams", { method: "POST", body }),
    update: (id, body) => request(`/teams/${id}`, { method: "PUT", body }),
    remove: (id) => request(`/teams/${id}`, { method: "DELETE" }),
    assign: (payload) => request("/teams/assign", { method: "POST", body: payload }),
    unassign: (payload) => request("/teams/unassign", { method: "POST", body: payload }),
},

  logs: {
    list: () => request("/logs", { method: "GET" }),
    create: (body) => request("/logs/create", { method: "POST", body }),
  },
};
