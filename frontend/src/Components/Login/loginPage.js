import React ,{useState} from "react";

import './loginPge.css'
import DashBoard from "../dashBoard/dashBoard";

function LoginPage({ hideModal }) {

  const handleGoBackClick = (e) => {
    e.preventDefault();
    hideModal(); // Close modal when "Go back" is clicked
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log("Login form submitted!");
    hideModal();
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className="btn btn-outline-success"
              onClick={handleGoBackClick}
            >
              Go back
            </button>
            <button
              className="btn btn-outline-success"
              onClick={handleSubmitClick}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
