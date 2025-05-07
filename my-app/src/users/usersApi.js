import axios from 'axios';
import { API_BASE } from '../App.js';   

export async function fetchUsers() {
  const res = await axios.get(`${API_BASE}/people`);
  return Object.values(res.data).map(p => ({
    ...p,
    roles: p.roles.join(', '),
  }));
}

export async function updateUser(email, payload) {
  return axios.put(`${API_BASE}/people/${encodeURIComponent(email)}`, payload);
}

export async function deleteUser(email) {
  return axios.delete(`${API_BASE}/people/${encodeURIComponent(email)}`);
}
