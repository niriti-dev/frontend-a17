import axios from 'axios';
import { API_BASE } from '../config';

// READ all users
export async function fetchUsers() {
  const res = await axios.get(`${API_BASE}/people`);
  return Object.values(res.data).map(p => ({
    ...p,
    roles: Array.isArray(p.roles) ? p.roles : p.roles.split(', ')
  }));
}

// READ single user
export async function getUser(id) {
  const res = await axios.get(`${API_BASE}/people/${encodeURIComponent(id)}`);
  return {
    ...res.data,
    roles: Array.isArray(res.data.roles) ? res.data.roles : res.data.roles.split(', ')
  };
}

// CREATE user
export async function createUser(userData) {
  const res = await axios.post(`${API_BASE}/people/create`, {
    ...userData,
    roles: Array.isArray(userData.roles) ? userData.roles : userData.roles.split(', ')
  });
  return res.data.person;
}

// UPDATE user
export async function updateUser(id, payload) {
  // Send the entire payload for a complete document replacement
  const res = await axios.put(`${API_BASE}/people/${id}`, payload);
  return res.data;
}

// DELETE user
export async function deleteUser(email) {
  const res = await axios.delete(`${API_BASE}/people/${encodeURIComponent(email)}`);
  return res.data;
}
