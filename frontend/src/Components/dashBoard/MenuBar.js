import React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';  // Importing necessary Bootstrap components
import 'bootstrap/dist/css/bootstrap.css';

function MenuBar() {
  const handleCreate = () => {
    console.log('Create button clicked');
    // Add your "create" logic here
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    // Add your "logout" logic here (e.g., clearing session, redirecting, etc.)
  };

  return (<div>
    <nav className="navbar navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
  <div className="container-fluid d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      <a className="navbar-brand mb-0 h1">MyNotes</a>
      <button 
        className="btn btn-outline-success ms-3" 
        type="submit" 
        style={{ border: 'none' }}
      >
        Create
      </button>
    </div>
    <form className="d-flex">
      <button className="btn btn-outline-success" type="submit">log out</button>
    </form>
  </div>
</nav>

</div>
  )
}

export default MenuBar;
