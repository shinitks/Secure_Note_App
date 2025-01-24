import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./EditNotePage.css";

function EditNotePage() {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const jwtToken = Cookies.get("jwt");
        const csrfToken = Cookies.get("csrfToken");

        const response = await axios.get(
          `http://localhost:8000/mynotes/notes/read/${noteId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "X-CSRF-Token": csrfToken,
            },
            withCredentials: true,
          }
        );

        const note = response.data.note;
        if (!note) {
          throw new Error("Note not found");
        }

        setTitle(note.title);
        setContent(note.content);
        setLoading(false);
      } catch (err) {
        handleError(err);
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
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );

      alert("Note updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    const message = err.response?.data?.message || "An error occurred";

    if (err.response?.status === 401) {
      alert(`${message}. Redirecting to the Login page.`);
      navigate("/login");
    } else {
      alert(message);
    }

    setError(message);
    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-note-container">
      <form
        className="edit-note-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
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
            rows="10"
          ></textarea>
        </div>
        <div className="button-container">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Go Back
          </button>
          <button
            type="submit"
            className="btn btn-success"
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
