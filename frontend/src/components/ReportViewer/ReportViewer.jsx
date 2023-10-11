import React from 'react';

const ReportViewer = ({ report }) => {
  return (
    <div>
      <h2>Generated Report</h2>
      <p>File Name: {report.name}</p>
      <p>File Content: {report.content}</p>
      <p>Created Date: {report.createdDate}</p>
      <p>Last Modified Date: {report.lastModifiedDate}</p>
      <p>File Size: {report.size} bytes</p>
      <p>File Type/Extension: {report.extension}</p>
      
    </div>
  );
};

export default ReportViewer;
