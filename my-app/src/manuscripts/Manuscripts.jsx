import React from 'react';
import useManuscripts from './useManuscripts';  
import AddManuscriptForm    from './AddManuscriptForm';
import DeleteManuscriptForm from './DeleteManuscriptForm';

export default function Manuscripts() {
  const {
    manuscripts,
    loading,
    error,
    addManuscript,
    deleteManuscript
  } = useManuscripts();

  if (loading) return <p>Loading…</p>;
  if (error)   return <p style={{ color: 'red' }}>Error loading manuscripts</p>;

  return (
    <section className="table-section">
      <h3>Manuscripts</h3>

      <table>
        <thead>
          <tr><th>Author</th><th>Title</th></tr>
        </thead>
        <tbody>
          {manuscripts.map(m => (
            <tr key={m.id}>
              <td>{m.author}</td>
              <td>{m.latest_version.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr/>

      <AddManuscriptForm onAdd={addManuscript} />
      <DeleteManuscriptForm onDelete={deleteManuscript} />
    </section>
  );
}
