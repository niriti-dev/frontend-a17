// src/manuscripts/Manuscripts.jsx
import React, { useState } from 'react';
import useManuscripts from './useManuscripts';
import { useAuth } from '../auth/AuthContext';
import './manuscripts.css';

export default function Manuscripts() {
  const { manuscripts, loading, error: initialError,
          updateManuscript, deleteManuscript } = useManuscripts();
  const { logout } = useAuth();

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ author: '', title: '', text: '' });
  const [error, setError] = useState(initialError);

  const handleError = (err) => {
    console.error('Operation failed:', err);
    if (err.response) {
      switch (err.response.status) {
        case 401:
          logout();
          window.location.href = '/login';
          break;
        case 404:
          setError('Manuscript not found');
          break;
        default:
          setError(err.response.data?.message || 'Operation failed');
      }
    } else if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
      logout();
      window.location.href = '/login';
    } else {
      setError('An unexpected error occurred');
    }
  };

  const startEdit = (m) => {
    setEditingId(m._id);
    setForm({ 
      author: m.author, 
      title: m.latest_version.title,
      text: m.latest_version.text 
    });
  };

  const saveEdit = async e => {
    e.preventDefault();
    try {
      await updateManuscript(editingId, {
        author: form.author,
        latest_version: { 
          title: form.title,
          text: form.text 
        },
      });
      setEditingId(null);
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this manuscript?')) {
      try {
        await deleteManuscript(id);
        if (editingId === id) setEditingId(null);
      } catch (err) {
        handleError(err);
      }
    }
  };

  const handleRowClick = (m) => {
    console.log('Manuscript ID:', m._id);
  };

  if (loading) return <p className="state">Loading...</p>;
  if (error) return <p className="state error">{error}</p>;

  return (
    <section className="table-section">
      <div className="section-header">
        <h3>Manuscripts</h3>
      </div>

      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Text Preview</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {manuscripts.map((m) => (
            <React.Fragment key={m._id}>
              <tr onClick={() => handleRowClick(m)}
                  onDoubleClick={() => startEdit(m)}
                  style={{ cursor:'pointer' }}>
                <td>{m.author}</td>
                <td>{m.latest_version.title}</td>
                <td>{m.latest_version.text?.substring(0, 100)}...</td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(m._id);
                    }}
                  >
                    ×
                  </button>
                </td>
              </tr>

              {editingId === m._id && (
                <tr className="edit-row">
                  <td colSpan="4">
                    <form onSubmit={saveEdit} className="edit-form">
                      <div className="edit-fields">
                        <input 
                          name="author" 
                          value={form.author}
                          onChange={e => setForm({...form, author: e.target.value})}
                          placeholder="Author" 
                          required 
                        />
                        <input 
                          name="title"  
                          value={form.title}
                          onChange={e => setForm({...form, title: e.target.value})}
                          placeholder="Title"  
                          required 
                        />
                        <textarea
                          name="text"
                          value={form.text}
                          onChange={e => setForm({...form, text: e.target.value})}
                          placeholder="Manuscript text"
                          required
                        />
                      </div>
                      <div className="inline-buttons">
                        <button 
                          type="button"
                          className="btn-save"
                          onClick={(e) => {
                            e.preventDefault();
                            saveEdit(e);
                          }}
                        >
                          Save
                        </button>
                        <button 
                          type="button"
                          className="btn-cancel"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </div>
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
