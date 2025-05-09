// src/manuscripts/useManuscripts.js
import { useState, useEffect, useCallback } from 'react';
import {
  fetchManuscripts,
  addManuscript as apiAdd,
  updateManuscript as apiUpdate,
  deleteManuscript as apiDelete,
} from './manuscriptsApi.js';

export default function useManuscripts() {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading,      setLoading]    = useState(true);
  const [error,        setError]      = useState(null);

  /* reload helper */
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setManuscripts(await fetchManuscripts());
      setError(null);
    } catch (err) {
      setError(err);
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  /* CRUD wrappers */
  const addManuscript    = async data       => {
    try {
      await apiAdd(data);
      await load();
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw err;
    }
  };
  const updateManuscript = async (id, data) => {
    try {
      await apiUpdate(id, data);
      await load();
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw err;
    }
  };
  const deleteManuscript = async id         => {
    try {
      await apiDelete(id);
      await load();
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw err;
    }
  };

  return { manuscripts, loading, error, addManuscript, updateManuscript, deleteManuscript };
}
