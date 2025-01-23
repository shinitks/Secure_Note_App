import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "@fortawesome/fontawesome-free/css/all.min.css"; 

function NoteDetails() {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const jwtToken = Cookies.get("jwt");
        const csrfToken = Cookies.get("csrfToken");

        const response = await axios.get(`http://localhost:8000/mynotes/notes/read/${noteId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        });

        setNote(response.data.note);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching note details:", err);
        handleError(err);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this note?");
    if (!isConfirmed) {
      return; 
    }

    try {
      const jwtToken = Cookies.get("jwt");
      const csrfToken = Cookies.get("csrfToken");

      await axios.delete(`http://localhost:8000/mynotes/notes/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      });

      alert("Note deleted successfully.");
      navigate("/dashboard"); 
    } catch (err) {
      console.error("Error deleting note:", err);
      handleError(err);
    }
  };

  const handleEdit = () => {
    navigate(`/note/edit/${noteId}`);
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
    return (
      <div
        className="container-fluid vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="container-fluid vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="text-center">
          <h2 className="text-danger">{error}</h2>
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div
        className="container-fluid vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="text-center">
          <h2 className="text-danger">Note Not Found</h2>
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
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
      <div
        className="p-4 rounded shadow-lg"
        style={{
          backgroundColor: "#ffeef4",
          width: "100%",
          maxWidth: "800px",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginBottom: "20px" }}
        >
          <h2>{note.title}</h2>
          <div>
            <button
              className="btn btn-outline-primary me-2"
              title="Edit"
              onClick={handleEdit}
            >
              <i className="fas fa-pencil-alt"></i> {/* Pencil icon */}
            </button>
            <button
              className="btn btn-outline-danger"
              title="Delete"
              onClick={handleDelete}
            >
              <i className="fas fa-trash"></i> {/* Bin icon */}
            </button>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#ffffff",
          }}
        >
          <p className="text-justify">{note.content}</p>
        </div>
        <button
          className="btn btn-secondary mt-4"
          style={{ alignSelf: "flex-end" }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NoteDetails;
