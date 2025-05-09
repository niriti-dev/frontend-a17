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

  const [editingEmail, setEditingEmail] = useState(null);   
  const [formValues,   setFormValues]   = useState({});     


  const startEdit = user => {
    setEditingEmail(user.email);
    setFormValues({
      name:        user.name,
      affiliation: user.affiliation,
      roles:       user.roles,                
    });
  };

  const handleChange = e =>
    setFormValues(f => ({ ...f, [e.target.name]: e.target.value }));

  const cancelEdit = () => setEditingEmail(null);

  const saveEdit = async e => {
    e.preventDefault();
    await updateUser(editingEmail, {
      ...formValues,
      roles: formValues.roles.split(',').map(r => r.trim()),
    });
    setEditingEmail(null);
  };

  const handleDelete = async email => {
    if (window.confirm('Are you sure you want to delete this user?')) {
    await deleteUser(email);
    if (editingEmail === email) setEditingEmail(null);
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
            <React.Fragment key={u.email}>
              <tr onDoubleClick={() => startEdit(u)}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.affiliation}</td>
                <td>{u.roles.join(', ')}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-delete" onClick={() => handleDelete(u.email)}>
                    ×
                  </button>
                </td>
              </tr>

              {editingEmail === u.email && (
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
