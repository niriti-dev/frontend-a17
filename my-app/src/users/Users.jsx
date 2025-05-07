// src/Users.jsx
import React, { useState } from 'react';
import useUsers from './useUsers.js';          // ← supplies CRUD helpers

export default function Users() {
  /* ------------------------------------------------------------------
     Data layer
  ------------------------------------------------------------------ */
  const {
    users,
    loading,
    error,
    updateUser,   // PUT / PATCH
    deleteUser,   // DELETE
  } = useUsers();

  /* ------------------------------------------------------------------
     Local UI state
  ------------------------------------------------------------------ */
  const [editingEmail, setEditingEmail] = useState(null);   // which row is open
  const [formValues,   setFormValues]   = useState({});     // live editor fields

  /* ------------------------------------------------------------------
     Handlers
  ------------------------------------------------------------------ */
  const startEdit = user => {
    setEditingEmail(user.email);
    setFormValues({
      name:        user.name,
      affiliation: user.affiliation,
      roles:       user.roles,                // already "role1, role2"
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
    await deleteUser(email);
    if (editingEmail === email) setEditingEmail(null);
  };

  /* ------------------------------------------------------------------
     Render logic
  ------------------------------------------------------------------ */
  if (loading) return <p className="state">Loading…</p>;
  if (error)   return <p className="state error">Error: {error.message}</p>;

  return (
    <section className="table-section">
      <h3>Users List</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Affiliation</th><th>Roles</th><th />
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <React.Fragment key={u.email}>
              {/* ───────── DISPLAY ROW ───────── */}
              <tr
                onDoubleClick={() => startEdit(u)}
                style={{ cursor: 'pointer' }}
              >
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.affiliation}</td>
                <td>{u.roles}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(u.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>

              {/* ───────── INLINE‑EDIT ROW (slides open) ───────── */}
              {editingEmail === u.email && (
                <tr className="edit-row">
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
                        placeholder="Roles (comma‑sep.)"
                      />

                      <button type="submit"  className="btn-save">Save</button>
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
