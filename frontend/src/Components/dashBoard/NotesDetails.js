import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Example notes (replace with your dynamic notes or fetch from API)
const notes = [
  { title: "NOTE1", content: "This is the full content of NOTE1. This can be long text that is hidden initially." },
  { title: "NOTE2", content: "This is the full content of NOTE2. It might also be a bit long to show fully upfront." },
  { title: "NOTE3", content: "NOTE3 content is here. When clicked, this content will be fully visible." },
  { title: "NOTE4", content: "NOTE4 has full content as well. Clicking the note shows the full details." },
  { title: "NOTE5", content: "NOTE5 full content. Clicking the note reveals the full description of it." },
];

function NoteDetails() {
  const { noteId } = useParams(); // Get the note ID from the URL
  const navigate = useNavigate();
  const note = notes[parseInt(noteId, 10)];

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
        backgroundColor: "#ffffff", // Pastel background color
        margin: "0",
      }}
    >
      <div
        className="p-4 rounded shadow-lg text-center"
        style={{
          backgroundColor: "#ffeef4", // White background for the card
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <h2 className="mb-4">{note.title}</h2>
        <p className="text-justify">{note.content}</p>
      </div>
    </div>
  );
}

export default NoteDetails;
