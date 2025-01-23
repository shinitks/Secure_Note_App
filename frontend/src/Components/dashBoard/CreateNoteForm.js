import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';


function NoteForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
   const jwtToken = Cookies.get('jwt');
          const csrfToken = Cookies.get('csrfToken');
          console.log('JWT Token:', jwtToken);
          console.log('CSRF Token:', csrfToken);
          console.log(`Bearer ${jwtToken}`);
          const st=`Bearer ${jwtToken}`;
          console.log(st);

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/mynotes/notes/create",
        { title, content },
        {
          withCredentials: true, 
          headers: {
            Authorization: st, 
            'X-CSRF-Token': csrfToken,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Note created successfully:", response.data);
      navigate("/dashboard"); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create note";
      console.error("Error creating note:", errorMessage);
      handleError(err);

    }
  };
  const handleError = (err) => {
    const message = err.response?.data?.message || "An error occurred";

    if (err.response?.status === 401) {
      // Session expired
      alert(`${message}. Redirecting to the Login page.`);
      navigate("/login");
    } else {
      // Other errors
      alert(message);
    }

    setError(message);
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#ffffff",
        margin: "0",
      }}
    >
      <form
        className="p-4 rounded shadow"
        style={{
          backgroundColor: "#ffeef4",
          width: "100%",
          maxWidth: "900px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            placeholder="Enter content"
            rows="15"
            style={{
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        {error && <p className="text-danger mt-3">{error}</p>} {/* Display error */}
        <div className="mt-4 d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-success me-3"
          >
            Create
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
