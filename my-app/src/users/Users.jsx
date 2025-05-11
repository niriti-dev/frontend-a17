import React, { useState } from 'react';
import useUsers from './useUsers.js';          // ← supplies CRUD helpers
import './users.css';

export default function Users() {

  const {
    users,
    loading,
    error,
    updateUser,   // PUT / PATCH
    deleteUser,   // DELETE
  } = useUsers();

  const [editingId, setEditingId] = useState(null);   
  const [formValues, setFormValues] = useState({});     


  const startEdit = user => {
    setEditingId(user.id);
    setFormValues({
      name: user.name,
      affiliation: user.affiliation,
      roles: user.roles,
      email: user.email,  // Include email in form values
    });
  };

  const handleChange = e =>
    setFormValues(f => ({ ...f, [e.target.name]: e.target.value }));

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async e => {
    e.preventDefault();
    await updateUser(editingId, {
      ...formValues,
      roles: formValues.roles.split(',').map(r => r.trim()),
    });
    setEditingId(null);
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      if (editingId === id) setEditingId(null);
    }
  };

  if (loading) return <p className="state">Loading…</p>;
  if (error)   return <p className="state error">Error: {error.message}</p>;

  return (
    <section className="table-section">
      <h3>Users</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Affiliation</th>
            <th>Roles</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <React.Fragment key={u.id}>
              <tr onDoubleClick={() => startEdit(u)}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.affiliation}</td>
                <td>{u.roles.join(', ')}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-delete" onClick={() => handleDelete(u.id)}>
                    ×
                  </button>
                </td>
              </tr>

              {editingId === u.id && (
                <tr>
                  <td colSpan="5">
                    <form onSubmit={saveEdit} className="edit-form">
                      <input
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                      />
                      <input
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
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
                        placeholder="Roles (comma-separated)"
                      />
                      <button type="submit" className="btn-save">Save</button>
                      <button type="button" className="btn-cancel" onClick={cancelEdit}>
                        Cancel
                      </button>
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
