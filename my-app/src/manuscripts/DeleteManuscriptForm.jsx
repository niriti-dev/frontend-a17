import React, { useState } from 'react';

function DeleteManuscriptForm({ onDelete }) {
  const [titleToDelete, setTitleToDelete] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(titleToDelete);
    setTitleToDelete('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Delete Manuscript</h3>
      <input placeholder="Title to delete" value={titleToDelete} onChange={(e) => setTitleToDelete(e.target.value)} />
      <button type="submit">Delete</button>
    </form>
  );
}

export default DeleteManuscriptForm;
