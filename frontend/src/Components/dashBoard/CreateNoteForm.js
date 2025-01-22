import React from "react";
import { useParams, useNavigate } from 'react-router-dom';

function NoteForm() {
  const navigate = useNavigate();

  const handleCreate = () => {
    
    navigate('/dashboard'); 
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
          ></textarea>
        </div>
        <div className="mt-4 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-success me-3"
            onClick={handleCreate}
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
