import React, { useState, useEffect, useRef } from 'react';
import { fetchUsers, updateUser, deleteUser } from './users/usersApi';
import { useAuth } from './auth/AuthContext';
import DeleteUserForm from './DeleteUserForm';
import './users.css';

// Role definitions matching the backend
const ROLES = {
  'ED': 'Editor',
  'ME': 'Managing Editor',
  'CE': 'Consulting Editor',
  'AU': 'Author',
  'RE': 'Referee'
};

function RolesDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleRole = (roleCode) => {
    const newRoles = value.includes(roleCode)
      ? value.filter(r => r !== roleCode)
      : [...value, roleCode];
    onChange(newRoles);
  };

  return (
    <div className="roles-dropdown" ref={dropdownRef}>
      <div 
        className="roles-display" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length > 0 
          ? value.map(code => ROLES[code]).join(', ')
          : 'Select roles...'}
        <span className="dropdown-arrow">▼</span>
      </div>
      {isOpen && (
        <div className="roles-options">
          {Object.entries(ROLES).map(([code, label]) => (
            <div
              key={code}
              className={`role-option ${value.includes(code) ? 'selected' : ''}`}
              onClick={() => toggleRole(code)}
            >
              <span className="checkbox">
                {value.includes(code) ? '✓' : ''}
              </span>
              {label} ({code})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formValues, setFormValues] = useState({});
  const { logout } = useAuth();

  const handleError = (err) => {
    console.error('Operation failed:', err);
    if (err.response) {
      switch (err.response.status) {
        case 401:
          logout();
          window.location.href = '/login';
          break;
        case 404:
          setError('User not found');
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

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userList = await fetchUsers();
      setUsers(userList);
      setError(null);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const startEdit = (user) => {
    setEditingId(user._id);
    setFormValues({
      name: user.name,
      email: user.email,
      affiliation: user.affiliation,
      roles: Array.isArray(user.roles) ? user.roles : user.roles.split(', ')
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (newRoles) => {
    setFormValues(prev => ({
      ...prev,
      roles: newRoles
    }));
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await updateUser(editingId, formValues);
      
      // Reload the full users list
      await loadUsers();
      
      setEditingId(null);
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async (user) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setError(null);
        await deleteUser(user._id);
        setUsers(users.filter(u => u._id !== user._id));
        if (editingId === user._id) {
          setEditingId(null);
        }
      } catch (err) {
        handleError(err);
      }
    }
  };

  const handleRowClick = (user) => {
    console.log('User ID:', user._id);
  };

  if (loading) return <p className="state">Loading...</p>;
  if (error) return <p className="state error">{error}</p>;

  return (
    <section className="table-section">
      <div className="section-header">
        <h3>Users</h3>
      </div>

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
          {users.map(user => (
            <React.Fragment key={user._id}>
              <tr onClick={() => handleRowClick(user)}
                  onDoubleClick={() => startEdit(user)}
                  style={{ cursor:'pointer' }}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.affiliation}</td>
              <td>{Array.isArray(user.roles) ? user.roles.join(', ') : user.roles}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-delete"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            handleDelete(user); 
                          }}>×</button>
                </td>
              </tr>

              {editingId === user._id && (
                <tr className="edit-row">
                  <td colSpan="5">
                    <form onSubmit={saveEdit} className="edit-form">
                      <div className="edit-fields">
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
                          required
                        />
                        <RolesDropdown
                          value={formValues.roles}
                          onChange={handleRoleChange}
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

export default Users;