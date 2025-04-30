import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from './App.js';      

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res  = await axios.get(`${API_BASE}/people`);
        const data = Object.values(res.data).map(p => ({
          ...p,
          roles: p.roles.join(', '),
        }));
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    })();
  }, []);

  return (
    <section className="users">         
      <h2>Users List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Affiliation</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.email}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.affiliation}</td>
              <td>{u.roles}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </section>
  );
}

export default Users;
