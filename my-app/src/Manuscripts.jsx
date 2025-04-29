import React, { useState, useEffect } from 'react';
import AddManuscriptForm from './AddManuscriptForm';
import DeleteManuscriptForm from './DeleteManuscriptForm';
import './Manuscripts.css';
import { API_BASE } from './App';
import axios from 'axios';

function Manuscripts() {
  // Dummy data for manuscripts
  const [manuscripts, setManuscripts] = useState([]);

  useEffect(()=>{
    const fetchManuscripts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/manuscripts`);
        const data = res.data;
        console.log(data);
        setManuscripts(data);
      }
      catch (err){
        console.log(err);
      }
    };
    fetchManuscripts();
  }, []);

  // console.log(manuscripts);
  return (
    <div className="table-container">
      <h2>Manuscripts</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {
            manuscripts.map((manu) => (
              <tr key={manu.id}>
                <td>{manu.author}</td>
                <td>{manu.latest_version.title}</td>
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
