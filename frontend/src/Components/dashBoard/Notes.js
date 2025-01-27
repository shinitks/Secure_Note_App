import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Cookies from 'js-cookie';
import './NoteGrid.css'

function NotesGrid() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [deleteIndex, setDeleteIndex] = useState(null); 
  const [deleteNoteId, setDeleteNoteId] = useState(null); 

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const jwtToken = Cookies.get('jwt');
        const csrfToken = Cookies.get('csrfToken');

        const response = await axios.get('https://secure-note-app.onrender.com/mynotes/notes/allnotes', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'X-CSRF-Token': csrfToken,
          },
          withCredentials: true,
        });

        setNotes(response.data.notes);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed to fetch notes';
        console.error('Error fetching notes:', errorMessage);
        handleError(err);
      }
    };

    fetchNotes();
  }, []);

  const colors = ['#f8d7da', '#d1ecf1', '#c3e6cb', '#fff3cd', '#f5c6cb'];
  const columnsPerRow = 3;

  const rows = [];
  for (let i = 0; i < notes.length; i += columnsPerRow) {
    rows.push(notes.slice(i, i + columnsPerRow));
  }

  const handleNoteClick = (index) => {
    navigate(`/note/read/${index}`);
  };

  const handleEditClick = (index) => {
    navigate(`/note/edit/${index}`);
  };

  const openDeleteModal = (index, noteId) => {
    setDeleteIndex(index);
    setDeleteNoteId(noteId);
    setShowModal(true); // Show modal
  };

  const confirmDelete = async () => {
    if (deleteNoteId === null || deleteIndex === null) return;

    try {
      const jwtToken = Cookies.get('jwt');
      const csrfToken = Cookies.get('csrfToken');

      await axios.delete(`https://secure-note-app.onrender.com/mynotes/notes/delete/${deleteNoteId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      });

      setNotes((prevNotes) => prevNotes.filter((_, i) => i !== deleteIndex));
      setShowModal(false); 
      setDeleteIndex(null);
      setDeleteNoteId(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete note';
      console.error('Error deleting note:', errorMessage);
      handleError(err);
    }
  };

  const handleError = (err) => {
    const message = err.response?.data?.message || 'An error occurred';

    if (err.response?.status === 401) {
      alert(`${message}. Redirecting to the Login page.`);
      navigate('/login', { replace: true });
    } else {
      alert(message);
    }

    setError(message);
  };

  return (
    <div class="page-2 container">
    <div className="container text-center">
      {error && <p className="text-danger">{error}</p>}
  
      {notes.length === 0 && !error && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            color: '#6c757d',
          }}
        >
          <i className="fas fa-folder-open fa-4x mb-3"></i>
          <h4>No Notes Found</h4>
          <p>Start organizing your thoughts by adding your first note.</p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate('/note/create')} 
          >
            Add Your First Note
          </button>
        </div>
      )}
  
      {notes.length > 0 &&
        rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            style={{ marginTop: rowIndex === 0 ? '20px' : '0' }}
          >
            {row.map((note, colIndex) => {
              const color = colors[(rowIndex * columnsPerRow + colIndex) % colors.length];
              const noteIndex = rowIndex * columnsPerRow + colIndex;
  
              return (
                <div key={colIndex} className="col-6 col-md-4 mb-4">
                  <div
                    className="list-group-item"
                    style={{
                      backgroundColor: color,
                      padding: '20px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleNoteClick(noteIndex)}
                  >
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginBottom: '10px' }}
                    >
                      <h5>{note.title}</h5>
                      <div>
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          style={{ backgroundColor: 'black', color: 'white', border: 'none' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(noteIndex);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          style={{ backgroundColor: 'black', color: 'white', border: 'none' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(noteIndex, note._id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <p>{note.content.substring(0, 50)}...</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
  
      {/* Delete Confirmation Modal */}
      {showModal && (
        <div
          className="modal d-flex align-items-center justify-content-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1050,
          }}
        >
          <div
            className="modal-content p-4"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <h5>Are you sure you want to delete this note?</h5>
            <div className="mt-4">
              <button className="btn btn-danger me-2" onClick={confirmDelete}>
                Delete
              </button>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
  
}

export default NotesGrid;
