import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

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
        setError(err.response?.data?.message || "Failed to fetch note details");
        setLoading(false); 
      }
    };

    fetchNote(); 
  }, [noteId]);

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
        <h2
          className="mb-4"
          style={{
            position: "sticky",
            top: "0",
            backgroundColor: "#ffeef4",
            zIndex: 10,
            paddingBottom: "10px",
          }}
        >
          {note.title}
        </h2>
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
