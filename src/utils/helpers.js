// src/utils/helpers.js
export function formatDate(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  return d.toLocaleString();
}
