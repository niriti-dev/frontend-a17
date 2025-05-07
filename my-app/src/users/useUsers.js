// src/users/useUsers.js
import { useState, useEffect, useCallback } from 'react';
import {
  fetchUsers,
  updateUser as apiUpdate,
  deleteUser as apiDelete,
} from './usersApi.js';

export default function useUsers() {
  /* ------------ state ------------ */
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  /* ------------ fetch helper (memoised so we can reuse) ------------ */
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setUsers(await fetchUsers());
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* initial load */
  useEffect(() => { load(); }, [load]);

  /* ------------ CRUD wrappers that refresh list afterward ------------ */
  const updateUser  = async (email, data) => {
    await apiUpdate(email, data);
    await load();
  };

  const deleteUser  = async (email) => {
    await apiDelete(email);
    await load();
  };

  const addUser = () => {
    console.warn('addUser() not implemented yet');
  };

  /* ------------ public API ------------ */
  return { users, loading, error, addUser, updateUser, deleteUser };
}
