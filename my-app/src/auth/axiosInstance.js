import axios from 'axios';
import { API_BASE } from '../App.js';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(cfg => {
  const t = localStorage.getItem('token');
  if (t) cfg.headers.Authorization = 'Bearer ' + t;
  return cfg;
});

export default api;
