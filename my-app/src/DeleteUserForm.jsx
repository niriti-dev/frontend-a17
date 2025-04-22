import React, { useState } from 'react';

function DeleteUserForm({ onDelete }) {
  const [email, setEmail] = useState('');

  const handleDelete = () => {
    if (!email) return;
    onDelete(email);
    setEmail('');
  };

  return (
    <div>
      <h3>Delete User by Email</h3>
      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteUserForm;