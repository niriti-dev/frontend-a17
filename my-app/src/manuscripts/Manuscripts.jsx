// src/manuscripts/Manuscripts.jsx
import React, { useState } from 'react';
import useManuscripts from './useManuscripts';
export default function Manuscripts() {
  const { manuscripts, loading, error,
          updateManuscript, deleteManuscript } = useManuscripts();

  const [editingKey, setEditingKey] = useState(null);   // ← renamed
  const [form,       setForm]       = useState({ author:'', title:'' });

  /* -------- open  -------- */
  const startEdit = (m, key) => {
    setEditingKey(key);
    setForm({ author: m.author, title: m.latest_version.title });
  };

  /* -------- save -------- */
  const saveEdit = async e => {
    e.preventDefault();
    await updateManuscript(editingKey.realId, {
      author: form.author,
      latest_version: { title: form.title },
    });
    setEditingKey(null);
  };

  /* -------- delete -------- */
  const handleDelete = async key => {
    await deleteManuscript(key.realId);
    if (editingKey?.row === key.row) setEditingKey(null);
  };

  /* -------- render -------- */
  return (
    <section className="table-section">
      <h3>Manuscripts</h3>

      <table>
        <thead>
          <tr><th>Author</th><th>Title</th><th/></tr>
        </thead>
        <tbody>
          {manuscripts.map((m, i) => {
            const key = { row: i, realId: m.id ?? m._id };

            return (
              <React.Fragment key={i}>
                {/* display row */}
                <tr onDoubleClick={() => startEdit(m, key)}
                    style={{ cursor:'pointer' }}>
                  <td>{m.author}</td>
                  <td>{m.latest_version.title}</td>
                  <td>
                    <button className="btn-delete"
                            onClick={() => handleDelete(key)}>Delete</button>
                  </td>
                </tr>

                {editingKey?.row === i && (
                  <tr className="edit-row">
                    <td colSpan="3">
                      <form onSubmit={saveEdit} className="edit-form">
                        <input name="author" value={form.author}
                               onChange={e=>setForm({...form,author:e.target.value})}
                               placeholder="Author" required />
                        <input name="title"  value={form.title}
                               onChange={e=>setForm({...form,title:e.target.value})}
                               placeholder="Title"  required />
                        <button type="submit"  className="btn-save">Save</button>
                        <button type="button" className="btn-cancel"
                                onClick={()=>setEditingKey(null)}>
                          Cancel
                        </button>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
