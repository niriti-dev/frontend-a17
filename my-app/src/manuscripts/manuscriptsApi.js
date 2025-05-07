// src/manuscripts/manuscriptsApi.js
import axios from 'axios';
import { API_BASE } from '../App.js';

export async function fetchManuscripts() {
  const res = await axios.get(`${API_BASE}/manuscripts`);
  return Object.values(res.data);
}

export async function addManuscript(data) {
  await axios.post(`${API_BASE}/manuscripts`, data);
}

export async function updateManuscript(id, payload) {
  await axios.put(`${API_BASE}/manuscripts/${encodeURIComponent(id)}`, payload);
}

export async function deleteManuscript(id) {
  await axios.delete(`${API_BASE}/manuscripts/${encodeURIComponent(id)}`);
}
