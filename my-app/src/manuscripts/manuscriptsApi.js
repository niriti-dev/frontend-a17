import axios from 'axios';
import { API_BASE } from '../App.js';    

export async function fetchManuscripts() {
  const res = await axios.get(`${API_BASE}/manuscripts`);
  return res.data;  
}

export async function createManuscript(payload) {
  const res = await axios.post(`${API_BASE}/manuscripts`, payload);
  return res.data;
}

export async function deleteManuscript(id) {
  await axios.delete(`${API_BASE}/manuscripts/${id}`);
  return id;
}
