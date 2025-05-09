// src/manuscripts/Manuscripts.jsx
import React, { useState } from 'react';
import useManuscripts from './useManuscripts';
import { useAuth } from '../auth/AuthContext';
import './manuscripts.css';

const ACTIONS = {
  ACCEPT: 'accept',
  REJECT: 'reject',
  REVISE: 'revise'
};

export default function Manuscripts() {
  const { manuscripts, loading, error: initialError,
          updateManuscript, deleteManuscript, processAction } = useManuscripts();
  const { logout } = useAuth();

  const [editingId, setEditingId] = useState(null);
  const [actionId, setActionId] = useState(null);
  const [comment, setComment] = useState('');
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
    setActionId(null);
  };

  const startAction = (m) => {
    setActionId(m._id);
    setComment('');
    setEditingId(null);
  };

  const saveEdit = async e => {
    e.preventDefault();
    try {
      await updateManuscript(editingId, {
        title: form.title,
        text: form.text 
      });
      setEditingId(null);
    } catch (err) {
      handleError(err);
    }
  };

  const handleAction = async (action) => {
    try {
      await processAction(actionId, action, comment);
      setActionId(null);
      setComment('');
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this manuscript?')) {
      try {
        await deleteManuscript(id);
        if (editingId === id) setEditingId(null);
        if (actionId === id) setActionId(null);
      } catch (err) {
        handleError(err);
      }
    }
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {manuscripts.map((m) => (
            <React.Fragment key={m._id}>
              <tr onDoubleClick={() => startEdit(m)}
                    style={{ cursor:'pointer' }}>
                  <td>{m.author}</td>
                  <td>{m.latest_version.title}</td>
                <td>{m.latest_version.text?.substring(0, 100)}...</td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="btn-action"
                    onClick={(e) => {
                      e.stopPropagation();
                      startAction(m);
                    }}
                  >
                    ⚡
                  </button>
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
                  <td colSpan="5">
                      <form onSubmit={saveEdit} className="edit-form">
                      <div className="edit-fields">
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

              {actionId === m._id && (
                <tr className="edit-row">
                  <td colSpan="5">
                    <div className="action-form">
                      <div className="action-fields">
                        <textarea
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                          placeholder="Add a comment (optional)"
                          className="action-comment"
                        />
                      </div>
                      <div className="action-buttons">
                        <button 
                          type="button"
                          className="btn-action accept"
                          onClick={() => handleAction(ACTIONS.ACCEPT)}
                        >
                          Accept
                        </button>
                        <button 
                          type="button"
                          className="btn-action revise"
                          onClick={() => handleAction(ACTIONS.REVISE)}
                        >
                          Revise
                        </button>
                        <button 
                          type="button"
                          className="btn-action reject"
                          onClick={() => handleAction(ACTIONS.REJECT)}
                        >
                          Reject
                        </button>
                        <button 
                          type="button"
                          className="btn-cancel"
                          onClick={() => setActionId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
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
