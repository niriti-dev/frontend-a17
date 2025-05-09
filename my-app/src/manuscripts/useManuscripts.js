// src/manuscripts/useManuscripts.js
import { useState, useEffect, useCallback } from 'react';
import {
  fetchManuscripts,
  createManuscript,
  updateManuscript as apiUpdate,
  deleteManuscript as apiDelete,
  processManuscriptAction
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
      if (err.response?.status === 401) {
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
      await createManuscript(data);
      await load();
    } catch (err) {
      if (err.response?.status === 401) {
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
      if (err.response?.status === 401) {
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
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw err;
    }
  };

  const processAction = async (id, action, comment) => {
    try {
      await processManuscriptAction(id, action, comment);
      await load();
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw err;
    }
  };

  return { manuscripts, loading, error, addManuscript, updateManuscript, deleteManuscript, processAction };
}
