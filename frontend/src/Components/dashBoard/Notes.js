import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Cookies from 'js-cookie';

function NotesGrid() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]); // State to hold notes
  const [error, setError] = useState(null); // State for error messages

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        console.log('fetchNotes called'); // Log to confirm it's triggered
  
        // Retrieve tokens and make the request
        const jwtToken = Cookies.get('jwt');
        const csrfToken = Cookies.get('csrfToken');
        console.log('JWT Token:', jwtToken);
        console.log('CSRF Token:', csrfToken);
        console.log(`Bearer ${jwtToken}`);
        const st=`Bearer ${jwtToken}`;
        console.log(st);
  
        const response = await axios.get('http://localhost:8000/mynotes/notes/allnotes', {
          headers: {
            Authorization: st, // JWT in Authorization header
            'X-csrf-token': csrfToken,          // CSRF token in custom header
          },
          withCredentials: true, // Include cookies for cross-origin requests
          
        });

  
        console.log('Response:', response.data); // Log response
        setNotes(response.data.notes); // Update state with notes
      } catch (err) {
        console.error('Error fetching notes:', err.message); // Log error
        setError(err.response?.data?.message || 'Failed to fetch notes'); // Set error state
      }
    };
  
    fetchNotes(); // Call fetchNotes when component mounts
  }, []); // Empty dependency array ensures it runs only once
  
  

  const colors = ['#f8d7da', '#d1ecf1', '#c3e6cb', '#fff3cd', '#f5c6cb']; // Color palette
  const columnsPerRow = 3;

  const rows = [];
  for (let i = 0; i < notes.length; i += columnsPerRow) {
    rows.push(notes.slice(i, i + columnsPerRow)); // Divide notes into rows
  }

  const handleNoteClick = (index) => {
    navigate(`/note/read/${index}`); // Navigate to note details page
  };

  const handleEditClick = (index) => {
    navigate(`/note/edit/${index}`); // Navigate to edit note page
  };

  return (
    <div className="container text-center">
      {error && <p className="text-danger">{error}</p>} {/* Display error message */}
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="row"
          style={{ marginTop: rowIndex === 0 ? '20px' : '0' }} // Add margin for the first row
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
                    <button
                      className="btn btn-outline-primary btn-sm"
                      style={{ backgroundColor: 'black', color: 'white', border: 'none' }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the note click
                        handleEditClick(noteIndex);
                      }}
                    >
                      <i className="fas fa-pencil-alt"></i> {/* FontAwesome pencil icon */}
                    </button>
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
