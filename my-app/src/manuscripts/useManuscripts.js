import { useState, useEffect, useCallback } from 'react';
import {
  fetchManuscripts,
  createManuscript,
  deleteManuscript as apiDelete
} from './manuscriptsApi';       

export default function useManuscripts() {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  // initial load
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchManuscripts();
        if (alive) setManuscripts(data);
      } catch (err) {
        if (alive) setError(err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const addManuscript = useCallback(async formData => {
    const saved = await createManuscript(formData);
    setManuscripts(prev => [...prev, saved]);
  }, []);

  const deleteManuscript = useCallback(async id => {
    await apiDelete(id);
    setManuscripts(prev => prev.filter(m => m.id !== id));
  }, []);

  return { manuscripts, loading, error, addManuscript, deleteManuscript };
}
