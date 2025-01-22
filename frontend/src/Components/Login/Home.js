import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

function Home() {
  return (
    <div className="homepage">
      <div className="bubbles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

      <div >
  <h1 className="mynotes-title">MyNotes</h1>
  <p className="tagline">
    <span className="line1">My thoughts.</span><br />
    <span className="line2">My reflections.</span><br />
    <span className="line3">My journey.</span>
  </p>
</div>

      <div className="buttons">
        <div>
        <label className="signup-label">Don't have an account?</label>
        <br></br>
        <button className="btn btn-primar signup-btn">Sign Up</button>
        </div>
        <div>
            <label className="login-label">Already have an account?</label>
            <br></br>
        <button className="btn btn-dark login-btn">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
