import React, { useState } from 'react';
import useUsers from './useUsers.js';

export default function Users() {
  const { users, loading, error } = useUsers();

  const [editingEmail, setEditingEmail] = useState(null);
  const [formValues, setFormValues] = useState({});

  if (loading) return <p>Loading…</p>;
  if (error)   return <p style={{ color: 'red' }}>Error loading users</p>;

  function handleRowDoubleClick(u) {
    setEditingEmail(u.email);
    setFormValues({
      name: u.name,
      email: u.email,
      affiliation: u.affiliation,
      roles: u.roles
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues(v => ({ ...v, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditingEmail(null);
  }

  function handleCancel() {
    setEditingEmail(null);
  }

  return (
    <section className="table-section">
      <h3>Users List </h3>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Affiliation</th><th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <React.Fragment key={u.email}>
              <tr
                onDoubleClick={() => handleRowDoubleClick(u)}
                style={{ cursor: 'pointer' }}
              >
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.affiliation}</td>
                <td>{u.roles}</td>
              </tr>

              {editingEmail === u.email && (
                <tr className="edit-row">
                  <td colSpan="4">
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
                      <input
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        placeholder="Name"
                      />
                      <input
                        name="affiliation"
                        value={formValues.affiliation}
                        onChange={handleChange}
                        placeholder="Affiliation"
                      />
                      <input
                        name="roles"
                        value={formValues.roles}
                        onChange={handleChange}
                        placeholder="Roles"
                      />
                      <button type="submit">Save</button>
                      <button type="button" onClick={handleCancel}>Cancel</button>
                    </form>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
}
