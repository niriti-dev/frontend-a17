import React from 'react';


const submissions = [
    { submissionDate: '09/20/2023', author: 'John Doe', title: 'Impact of AI on Research', status: 'Draft', revisions: 2 },
    { submissionDate: '09/19/2023', author: 'Jane Smith', title: 'Climate Change and Policy', status: 'Under Review', revisions: 1 },
    { submissionDate: '09/18/2023', author: 'Emily Johnson', title: 'Economic Trends in 2023', status: 'Submitted', revisions: 0 },
    { submissionDate: '09/17/2023', author: 'Michael Brown', title: 'Revolutionizing Education', status: 'Accepted', revisions: 3 },
    { submissionDate: '09/16/2023', author: 'Sarah Davis', title: 'Exploring Quantum Computing', status: 'Draft', revisions: 1 },
  ];

  
function RecentSubmissionsTable() {
    return (
        <div className="table-section">
          <h3>Recent Manuscript Submissions</h3>
          <table>
            <thead>
              <tr>
                <th>Submission Date</th>
                <th>Author</th>
                <th>Title</th>
                <th>Status</th>
                <th>Revisions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index}>
                  <td>{submission.submissionDate}</td>
                  <td>{submission.author}</td>
                  <td>{submission.title}</td>
                  <td>{submission.status}</td>
                  <td>{submission.revisions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default RecentSubmissionsTable;