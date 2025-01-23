import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Cookies from 'js-cookie';

function NotesGrid() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const jwtToken = Cookies.get('jwt');
        const csrfToken = Cookies.get('csrfToken');

        const response = await axios.get('http://localhost:8000/mynotes/notes/allnotes', {
          headers: {
            Authorization: `Bearer ${jwtToken}`, 
            'X-csrf-token': csrfToken,          
          },
          withCredentials: true, 
        });

        setNotes(response.data.notes);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed to fetch notes';
        console.error('Error fetching notes:', errorMessage);
        setError(errorMessage);
        window.alert(errorMessage); 
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

  const handleDeleteClick = async (index, noteId) => {
    try {
      const jwtToken = Cookies.get('jwt');
      const csrfToken = Cookies.get('csrfToken');

      await axios.delete(`http://localhost:8000/mynotes/notes/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, 
          'X-csrf-token': csrfToken,         
        },
        withCredentials: true, 
      });

    
      setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete note';
      console.error('Error deleting note:', errorMessage);
      setError(errorMessage);
      window.alert(errorMessage); 
    }
  };

  return (
    <div className="container text-center" >
      {error && <p className="text-danger">{error}</p>} 
      {rows.map((row, rowIndex) => (
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
                          handleDeleteClick(noteIndex, note._id);
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
    </div>
  );
}

export default NotesGrid;
