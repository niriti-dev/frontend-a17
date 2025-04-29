import React, { useState, useEffect } from 'react';
import './Users.css';
import AddUserForm from './AddUserForm';
import DeleteUserForm from './DeleteUserForm';
import axios from 'axios';
import {API_BASE} from './App.js';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/people`);
        const arr = Object.values(res.data);
        arr.forEach(elem=>{
          elem.roles = elem.roles.join(", ");
        })
        setUsers(arr);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []); // run once on component mount

  return (
    <div className="table-container">
      <h2>Users List</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Affiliation</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.affiliation}</td>
              <td>{user.roles}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      {/* TODO: USE API server to update the database as well. */}
    </div>
  );
}

export default Users;