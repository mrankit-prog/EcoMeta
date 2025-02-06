import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../resources/css/RecyclerDashboard.css';

function RecyclerDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ewaste/recycler', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSubmissions(response.data);
      } catch (error) {
        setError('Failed to fetch submissions. Please try again later.');
        console.error(error);
      }
    };
    fetchSubmissions();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:8080/ewaste/accept/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Submission accepted!');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Failed to accept the submission.');
    }
  };

  return (
    <div className="recycler-dashboard">
      <h1>Recycler Dashboard</h1>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id} className="submission-item">
            {submission.type} - {submission.condition} - {submission.quantity}
            <button
              className="accept-button"
              onClick={() => handleAccept(submission.id)}
            >
              Accept
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecyclerDashboard;
