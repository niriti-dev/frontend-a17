import React, { useState, useEffect } from 'react';
import './Users.css';
import AddUserForm from './AddUserForm';
import DeleteUserForm from './DeleteUserForm';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://tinostinostinos.pythonanywhere.com/people");
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

  console.log(users);
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
      <AddUserForm onAdd={(user) => setUsers([...users, user])} />
      <DeleteUserForm onDelete={(email) => setUsers(users.filter(user => user.email !== email))} />
    </div>
  );
}

export default Users;