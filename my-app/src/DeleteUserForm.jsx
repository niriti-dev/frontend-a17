import React, { useState } from 'react';

function DeleteUserForm({ onDelete, users }) {
  const [selectedEmail, setSelectedEmail] = useState('');

  const handleDelete = () => {
    if (!selectedEmail) return;
    onDelete(selectedEmail);
    setSelectedEmail('');
  };

  return (
    <div>
      <h3>Delete User</h3>
      <select
        value={selectedEmail}
        onChange={(e) => setSelectedEmail(e.target.value)}
      >
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user.email} value={user.email}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>
      <button onClick={handleDelete} disabled={!selectedEmail}>Delete</button>
    </div>
  );
}

export default DeleteUserForm;