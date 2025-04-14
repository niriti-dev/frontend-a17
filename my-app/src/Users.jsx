import React from 'react';
import './Users.css';

function Users() {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', affiliation: 'NYU', role: 'Student' },
    { id: 2, name: 'Bob', email: 'bob@example.com', affiliation: 'Columbia', role: 'Researcher' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', affiliation: 'MIT', role: 'Instructor' },
  ];

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
            users.map(function(user) {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.affiliation}</td>
                  <td>{user.role}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Users;