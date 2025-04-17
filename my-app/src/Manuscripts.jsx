import React, { useState } from 'react';
import AddManuscriptForm from './AddManuscriptForm';
import DeleteManuscriptForm from './DeleteManuscriptForm';
import './Manuscripts.css';

function Manuscripts() {
  // Dummy data for manuscripts
  const [manuscripts, setManuscripts] = useState([
    { id: 1, author_name: 'Test Author', title: 'Test Manuscript', text: 'This is a test manuscript.' },
    { id: 2, author_name: 'Jane Doe', title: 'Quantum Theory', text: 'Exploring quantum fields in detail...' },
    { id: 3, author_name: 'John Smith', title: 'AI in Healthcare', text: 'Using ML to improve diagnostics...' },
  ]);

  return (
    <div className="table-container">
      <h2>Manuscripts</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {
            manuscripts.map((manu) => (
              <tr key={manu.id}>
                <td>{manu.author_name}</td>
                <td>{manu.title}</td>
                <td>{manu.text}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <hr/>
      <AddManuscriptForm onAdd={(manu) => setManuscripts([...manuscripts, manu])} />
      <DeleteManuscriptForm onDelete={(title) => setManuscripts(manuscripts.filter(m => m.title !== title))} />
  
    </div>
  );
}

export default Manuscripts;
