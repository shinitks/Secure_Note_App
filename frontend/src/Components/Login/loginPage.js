import React from "react";

function LoginPage() {
  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#ffffff", // Pastel background color
        margin: "0", // No margin
      }}
    >
      <form
        className="p-4 rounded shadow"
        style={{
          backgroundColor: "#ffeef4", // White background for the form
          width: "100%",
          maxWidth: "600px", // Restrict the form's width
        }}
      >
        <div className="mb-4">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            id="password"
            placeholder="Enter Your Password"
            style={{
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for separation
            }}
          ></input>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', marginRight: '30px' }}>
  <form className="d-flex">
    <button className="btn btn-outline-success" type="submit">Submit</button>
  </form>
</div>



      </form>
    </div>
  );
}

export default LoginPage;
