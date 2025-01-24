import React ,{useState}from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import 'bootstrap/dist/css/bootstrap.css';
import './MenuBar.css';

function MenuBar() {
  const navigate = useNavigate(); 
  const [showModal, setShowModal] = useState(false); 

  const handleCreate = () => {
    console.log('Create button clicked');
    navigate('/note/create'); 
  };

  const handleLogout = () => {
    console.log('Logout button clicked');

    
    Cookies.remove('jwt');
    Cookies.remove('csrfToken');
    localStorage.clear();

   
    navigate('/', { replace: true }); 
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
              onClick={() => setShowModal(true)}
            >
              Log out
            </button>
          </form>
        </div>
      </nav>
      {showModal && (
        <div
          className="modal d-flex align-items-center justify-content-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-content p-4"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <h5>Are you sure you want to delete this note?</h5>
            <div className="mt-4">
              <button className="btn btn-danger me-2" onClick={handleLogout}>
                Log Out
              </button>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuBar;
