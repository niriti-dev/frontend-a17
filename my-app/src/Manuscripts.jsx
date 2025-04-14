import React from "react";
import './Users.css';

function Manuscripts() {
  const manuscripts = [
    { id: 1, author: "Alice Johnson", title: "Arctic Adaptations in Reindeer", text: "This manuscript explores genomic changes supporting cold-weather survival."},
    { id: 2, author: "Brian Lee", title: "Fibroblast Regeneration Dynamics", text: "A comparative RNA-seq study of regenerative vs. fibrotic healing."},
    { id: 3, author: "Carmen Nguyen", title: "Urban Algae Systems", text: "Designs for algae infrastructure in climate-resilient cities."},
    { id: 4, author: "Daniel Smith", title: "CRISPR and Bioethics", text: "Analyzing public perception of gene editing in organ donor animals."}
  ];

  return (
    <div className="table-container">
      <h2>Manuscripts List</h2>
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
            manuscripts.map(function(manuscript) {
              return (
                <tr key={manuscript.id}>
                  <td>{manuscript.author}</td>
                  <td>{manuscript.title}</td>
                  <td>{manuscript.text}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Manuscripts;
