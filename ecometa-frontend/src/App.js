import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RecyclerDashboard from './components/RecyclerDashboard';
import Navbar from './components/Navbar';
import Register from './components/Register'; // Import the Register component

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user-home" element={<Dashboard />} />
        <Route path="/recycler-home" element={<RecyclerDashboard />} />
        <Route path="/register" element={<Register />} /> {/* Add the /register route */}
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}

export default App;
