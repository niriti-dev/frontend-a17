import axios from 'axios';
import { API_BASE } from '../config';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(cfg => {
  const t = localStorage.getItem('token');
  if (t) cfg.headers.Authorization = 'Bearer ' + t;
  return cfg;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || 
        error.code === 'ERR_NETWORK' || 
        error.code === 'ECONNABORTED') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
