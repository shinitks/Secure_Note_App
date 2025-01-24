import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

import SignUpPage from './SignUp';
import LoginPage from './loginPage';

function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const displaySignup = () => {
    setShowSignUpModal(true);
  };

  const hideSignupModal = () => {
    setShowSignUpModal(false);
  };

  const displayLogin = () => {
    setShowLoginModal(true);
  };

  const hideLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="homepage">
      <div className="bubbles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

      <div>
        <h1 className="mynotes-title">MyNotes</h1>
        <p className="tagline">
          <span className="line1">My thoughts.</span>
          <br />
          <span className="line2">My reflections.</span>
          <br />
          <span className="line3">My journey.</span>
        </p>
      </div>

      <div className="buttons">
        <div className="signup-container">
          <label className="signup-label">Don't have an account?</label>
          <br />
          <button className="btn signup-btn" onClick={displaySignup}>
            Sign Up
          </button>
        </div>
        <div className="login-container">
          <label className="login-label">Already have an account?</label>
          <br />
          <button className="btn login-btn" onClick={displayLogin}>
            Login
          </button>
        </div>
      </div>

      {showSignUpModal && <SignUpPage hideModal={hideSignupModal} />}
      {showLoginModal && <LoginPage hideModal={hideLoginModal} />}
    </div>
  );
}

export default Home;
