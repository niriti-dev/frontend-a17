import { useState, useEffect } from 'react';
import { fetchUsers } from './usersApi.js'; 

export default function useUsers() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchUsers();
        if (alive) setUsers(data);
      } catch (err) {
        if (alive) setError(err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // stub so your destructuring in Users.jsx doesn't break
  const addUser = () => {
    console.warn('addUser() not implemented yet');
  };

  return { users, loading, error, addUser };
}
