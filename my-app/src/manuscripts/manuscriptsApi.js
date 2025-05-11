// src/manuscripts/manuscriptsApi.js
import api from '../auth/axiosInstance';

export async function fetchManuscripts() {
  const res = await api.get('/manuscripts');
  return Object.values(res.data);
}

export async function createManuscript(data) {
  const res = await api.post('/manuscripts/create', {
    author: data.author.trim(),
    title: data.title.trim(),
    text: data.text.trim()
  });
  return res.data;
}

export async function updateManuscript(id, data) {
  const res = await api.put('/manuscripts/update', {
    id: id,
    title: data.title.trim(),
    text: data.text.trim()
  });
  return res.data;
}

export async function deleteManuscript(id) {
  const res = await api.delete(`/manuscripts/${encodeURIComponent(id)}`);
  return res.data;
}

export async function processManuscriptAction(id, action, comment = '') {
  const res = await api.put('/manuscripts/receive_action', {
    id: id,
    action: action.toLowerCase(),
    comment: comment.trim()
  });
  return res.data;
}
