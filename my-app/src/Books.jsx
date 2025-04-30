import React, { useState, useEffect } from 'react';

function Manuscripts() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://tinostinostinos.pythonanywhere.com/title'); // your actual endpoint
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="table-section">
    <h3>Titles</h3>
    {data ? (
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th>
            <th>Editor</th>
            <th>Date</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.Title}</td>
            <td>{data.Editor}</td>
            <td>{data.Date}</td>
            <td>{data.Publisher}</td>
          </tr>
        </tbody>
      </table>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}

export default Manuscripts;
