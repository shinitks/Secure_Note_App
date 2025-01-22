import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function SignUpPage({ hideModal }) {
  const navigate = useNavigate(); 

 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Sign-up form submitted!");
    navigate('/dashboard'); 
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmpassword"
              placeholder="Confirm Your Password"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={hideModal} 
            >
              Go back
            </button>
            <button
              className="btn btn-outline-success"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
