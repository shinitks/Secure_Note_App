import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginPage.css';
import Cookies from 'js-cookie';

function LoginPage({ hideModal }) {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    Cookies.remove('jwt'); 
    Cookies.remove('csrfToken'); 
    localStorage.clear(); 
    console.log('Session data cleared');
  }, []);

  async function onCreateUser(event) {
    event.preventDefault();

    const csrfToken = Cookies.get('csrfToken');

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post('http://localhost:8000/mynotes/user/login', user, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      console.log('Login successful:', response.data);
      navigate('/dashboard',{ replace: true }); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      console.error('Login error:', errorMessage);
      setError(errorMessage);
    }
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <form onSubmit={onCreateUser}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              ref={emailRef}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Enter Your Password"
                ref={passwordRef}
              />
              <span
                className="input-group-text toggle-button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
              </span>
            </div>
          </div>
          {error && <p className="text-danger">{error}</p>} 
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
