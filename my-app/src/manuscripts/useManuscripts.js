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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  /* CRUD wrappers */
  const addManuscript    = async data       => { await apiAdd(data);            await load(); };
  const updateManuscript = async (id, data) => { await apiUpdate(id, data);     await load(); };
  const deleteManuscript = async id         => { await apiDelete(id);           await load(); };

  return { manuscripts, loading, error, addManuscript, updateManuscript, deleteManuscript };
}
