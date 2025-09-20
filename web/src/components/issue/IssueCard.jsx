import React from 'react';

// Basic styling for the card
const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const statusStyle = {
  padding: '4px 8px',
  borderRadius: '12px',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '12px',
};

// Function to get a color based on the status
const getStatusColor = (status) => {
  switch (status) {
    case 'Submitted':
      return '#007bff'; // Blue
    case 'Acknowledged':
      return '#ffc107'; // Yellow
    case 'In Progress':
      return '#fd7e14'; // Orange
    case 'Resolved':
      return '#28a745'; // Green
    case 'Verified Resolved':
      return '#17a2b8'; // Teal
    default:
      return '#6c757d'; // Gray
  }
};

const IssueCard = ({ issue }) => {
  return (
    <div style={cardStyle}>
      <h3>{issue.title}</h3>
      <p style={{ color: '#555', marginTop: '8px' }}>{issue.description}</p>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...statusStyle, backgroundColor: getStatusColor(issue.status) }}>
          {issue.status}
        </span>
        <span style={{ color: '#888', fontSize: '14px' }}>
          Reported on: {new Date(issue.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default IssueCard;