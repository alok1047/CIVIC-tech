import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyIssues } from '../../api/issueApi'; // We already created this function
import IssueCard from '../../components/issue/IssueCard'; // Import the new component

const CitizenDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const response = await getMyIssues();
        setIssues(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []); // The empty dependency array means this runs once when the component mounts

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Reported Issues</h2>
        <Link to="/submit-report">
          <button>Report a New Issue</button>
        </Link>
      </div>

      <div style={{ marginTop: '30px' }}>
        {loading && <p>Loading your issues...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && issues.length === 0 && (
          <p>You have not reported any issues yet.</p>
        )}
        {issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default CitizenDashboard;