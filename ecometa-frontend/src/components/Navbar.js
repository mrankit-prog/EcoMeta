import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../resources/css/Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
      {token && role === 'user' && (
        <Link to="/user-home" className={location.pathname === '/user-home' ? 'active' : ''}>
          User Dashboard
        </Link>
      )}
      {token && role === 'recycler' && (
        <Link to="/recycler-home" className={location.pathname === '/recycler-home' ? 'active' : ''}>
          Recycler Dashboard
        </Link>
      )}
      {!token && (
        <>
          <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
          <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
        </>
      )}
      {token && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
}

export default Navbar;
