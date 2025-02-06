import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../resources/css/Register.css'; // Add your CSS file for the Register component
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/users/register', { name, email, password, role });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      setError('Registration failed! Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="RECYCLER">Recycler</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
