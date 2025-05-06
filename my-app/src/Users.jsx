import React, { useState, useEffect } from 'react';
import './Users.css';
import axios from 'axios';
import {API_BASE} from './App.js';

function Users() {
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUser = (email) => {
    console.log("Update clicked for:", email);
  };

  const deleteUser = async (email) => {
    try{
      await axios.delete(`${API_BASE}/people/${email}`);
      await fetchUsers();
    } catch (error) {
      console.error('An error occurred when trying to delete the user', error);
    }
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.affiliation}</td>
              <td>{user.roles}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-update"
                    onClick={() => updateUser(user.email)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteUser(user.email)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </div>
  );
}

export default Users;