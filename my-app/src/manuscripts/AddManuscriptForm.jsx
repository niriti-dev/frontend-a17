import React, { useState } from 'react';

function AddManuscriptForm({ onAdd }) {
  const [author_name, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: Date.now(), author_name, title, text });
    setAuthorName('');
    setTitle('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Manuscript</h3>
      <input placeholder="Author Name" value={author_name} onChange={(e) => setAuthorName(e.target.value)} required />
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Text" value={text} onChange={(e) => setText(e.target.value)} required />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddManuscriptForm;
