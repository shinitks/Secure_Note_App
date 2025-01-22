import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const notes = [
  { title: 'NOTE1', content: 'This is the full content of NOTE1.' },
  { title: 'NOTE2', content: 'This is the full content of NOTE2.' },
  { title: 'NOTE3', content: 'This is the full content of NOTE3.' },
  { title: 'NOTE4', content: 'This is the full content of NOTE4.' },
  { title: 'NOTE5', content: 'This is the full content of NOTE5.' },
];

function EditNotePage() {
  const { noteId } = useParams(); 
  const navigate = useNavigate();
  const note = notes[parseInt(noteId, 10)]; 

  const [title, setTitle] = useState(note?.title || ''); 
  const [content, setContent] = useState(note?.content || ''); 

  if (!note) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">Note Not Found</h2>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const handleSave = () => {
    console.log('Saving note:', { title, content });
    // alert('Note updated successfully!');
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
          maxWidth: "800px", 
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
