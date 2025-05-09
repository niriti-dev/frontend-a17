// src/users/useUsers.js
import { useState, useEffect, useCallback } from 'react';
import {
  fetchUsers,
  updateUser as apiUpdate,
  deleteUser as apiDelete,
} from './usersApi.js';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => { load(); }, [load]);

  const updateUser = async (id, data) => {
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

  const deleteUser = async (id) => {
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

  const addUser = () => {
    console.warn('addUser() not implemented yet');
  };

  return { users, loading, error, addUser, updateUser, deleteUser };
}
