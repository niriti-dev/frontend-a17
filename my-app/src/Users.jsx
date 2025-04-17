import React, { useState } from 'react';
import './Users.css';
import AddUserForm from './AddUserForm';
import DeleteUserForm from './DeleteUserForm';


function Users() {
  // TODO: Replace with data fetched from the database
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com', affiliation: 'NYU', role: 'Student' },
    { id: 2, name: 'Bob', email: 'bob@example.com', affiliation: 'Columbia', role: 'Researcher' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', affiliation: 'MIT', role: 'Instructor' },
  ]);

  return (
    <div className="table-container">
      <h2>Users List</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Affiliation</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.affiliation}</td>
                <td>{user.role}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <hr/>
      <AddUserForm onAdd={(user) => setUsers([...users, user])} />
	  <DeleteUserForm onDelete={(email) => setUsers(users.filter(user => user.email !== email))} />

    </div>
  );
}

export default Users;