import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import './Signup.css';

function SignUpPage({ hideModal }) {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function onCreateUser(event) {
    event.preventDefault();

    const csrfToken = Cookies.get('csrfToken'); 

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    try {
      const response = await axios.post('http://localhost:8000/mynotes/user/signup', user, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      console.log('Sign-up successful:', response.data);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Sign-up failed';
      console.error('Sign-up error:', errorMessage);
      setError(errorMessage); 
    }
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <form onSubmit={onCreateUser}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
              ref={nameRef}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
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
          <div className="mb-4">
            <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control"
                id="confirmpassword"
                placeholder="Confirm Your Password"
                ref={confirmPasswordRef}
              />
              <span
                className="input-group-text toggle-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: 'pointer' }}
              >
                <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
              </span>
            </div>
          </div>
          {error && <p className="text-danger">{error}</p>} {/* Display error message */}
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
