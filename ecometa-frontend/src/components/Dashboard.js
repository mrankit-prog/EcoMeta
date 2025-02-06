import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../resources/css/Dashboard.css'

function Dashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Ensure userId is stored in localStorage

        const response = await axios.get(`http://localhost:8080/ewaste/user/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            {submission.type} - {submission.condition} - {submission.quantity} - {submission.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;