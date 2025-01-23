import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function EditNotePage() {
  const { noteId } = useParams(); 
  const navigate = useNavigate();
  console.log("EditNotePage rendered, noteId:", noteId);

  const [title, setTitle] = useState(""); 
  const [content, setContent] = useState(""); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchNote = async () => {
      try {
        console.log("fetchNote called");

        const jwtToken = Cookies.get("jwt");
        const csrfToken = Cookies.get("csrfToken");
        console.log("JWT Token:", jwtToken);
        console.log("CSRF Token:", csrfToken);

        const response = await axios.get(
          `http://localhost:8000/mynotes/notes/read/${noteId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "X-csrf-token": csrfToken, 
            },
            withCredentials: true, 
          }
        );

        console.log("Response:", response.data);

        const note = response.data.note; 
        if (!note) {
          throw new Error("Note not found");
        }

        setTitle(note.title); 
        setContent(note.content); 
        setLoading(false); 
      } catch (err) {
        console.error("Error fetching note:", err.message); 
        setError(err.response?.data?.message || "Failed to fetch note details"); 
        setLoading(false); 
      }
    };

    fetchNote();
  }, [noteId]);

  const handleSave = async () => {
    try {
      const jwtToken = Cookies.get("jwt");
      const csrfToken = Cookies.get("csrfToken");

      const response = await axios.patch(
        `http://localhost:8000/mynotes/notes/update/${noteId}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "X-csrf-token": csrfToken,
          },
          withCredentials: true,
        }
      );

      console.log("Note updated successfully:", response.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating note:", err);
      setError(err.response?.data?.message || "Failed to update note");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">{error}</h2>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

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
          width: "900px",
          maxWidth: "1000px",
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            onClick={handleSave}
          >
            Save
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

export default EditNotePage;
