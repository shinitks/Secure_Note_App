import React from "react";

function NoteForm() {
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
            rows="15" // Makes the content box big
            style={{
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for separation
            }}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
