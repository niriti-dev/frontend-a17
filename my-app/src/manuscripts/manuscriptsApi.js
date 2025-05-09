// src/manuscripts/manuscriptsApi.js
import axios from 'axios';
import { API_BASE } from '../config'

export async function fetchManuscripts() {
  const res = await axios.get(`${API_BASE}/manuscripts`);
  return Object.values(res.data);
}

export async function getManuscript(id) {
  const res = await axios.get(`${API_BASE}/manuscripts/${encodeURIComponent(id)}`);
  return res.data;
}

export async function getManuscriptsByAuthor(authorName) {
  const res = await axios.get(`${API_BASE}/manuscripts/author/${encodeURIComponent(authorName)}`);
  return res.data;
}

export async function createManuscript(data) {
  const res = await axios.post(`${API_BASE}/manuscripts/create`, {
    author: data.author.trim(),
    title: data.title.trim(),
    text: data.text.trim()
  });
  return res.data;
}

export async function updateManuscript(id, data) {
  const res = await axios.put(`${API_BASE}/manuscripts/update`, {
    id: id,
    title: data.title.trim(),
    text: data.text.trim()
  });
  return res.data;
}

export async function deleteManuscript(id) {
  const res = await axios.delete(`${API_BASE}/manuscripts/${encodeURIComponent(id)}`);
  return res.data;
}

export async function processManuscriptAction(id, action, comment = '') {
  const res = await axios.put(`${API_BASE}/manuscripts/receive_action`, {
    id: id,
    action: action.toLowerCase(),
    comment: comment.trim()
  });
  return res.data;
}
