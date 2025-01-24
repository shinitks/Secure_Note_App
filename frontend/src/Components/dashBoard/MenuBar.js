import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // For managing cookies
import 'bootstrap/dist/css/bootstrap.css';
import './MenuBar.css';

function MenuBar() {
  const navigate = useNavigate(); 

  const handleCreate = () => {
    console.log('Create button clicked');
    navigate('/note/create'); 
  };

  const handleLogout = () => {
    console.log('Logout button clicked');

    // Clear authentication tokens
    Cookies.remove('jwt');
    Cookies.remove('csrfToken');
    localStorage.clear(); // Clear any stored session data

    // Redirect to login page
    navigate('/login', { replace: true }); // Prevent back navigation
  };

  return (
    <div>
      <nav className="navbar navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <a className="navbar-brand mb-0 h1">MyNotes</a>
            <button
              className="btn btn-outline-success ms-3"
              type="button"
              style={{ border: 'none' }}
              onClick={handleCreate} 
            >
              Create
            </button>
          </div>
          <form className="d-flex">
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleLogout} 
            >
              Log out
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default MenuBar;
