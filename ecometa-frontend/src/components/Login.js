import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../resources/css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(null); // State to handle error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    setError(null); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:8080/users/login', { email, password });
      
      // Store the token and role in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      alert('Login successful!');
      
      // Redirect to the respective home page based on the user role
      if (response.data.role === 'recycler') {
        navigate('/recycler-home'); // Redirect to Recycler dashboard
      } else {
        navigate('/user-home'); // Redirect to User dashboard
      }
    } catch (error) {
      console.error(error);
      setError('Invalid credentials or something went wrong!');
    } finally {
      setLoading(false); // Hide loader after request completes
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
