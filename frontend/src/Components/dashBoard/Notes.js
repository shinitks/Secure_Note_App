import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


const notes = [
  { title: 'NOTE1', content: 'This is the full content of NOTE1. This can be long text that is hidden initially.' },
  { title: 'NOTE2', content: 'This is the full content of NOTE2. It might also be a bit long to show fully upfront.' },
  { title: 'NOTE3', content: 'NOTE3 content is here. When clicked, this content will be fully visible.' },
  { title: 'NOTE4', content: 'NOTE4 has full content as well. Clicking the note shows the full details.' },
  { title: 'NOTE5', content: 'NOTE5 full content. Clicking the note reveals the full description of it.' },
];

function NotesGrid() {
    const navigate = useNavigate();
  
    const notes = [
      { title: 'NOTE1', content: 'This is the full content of NOTE1.' },
      { title: 'NOTE2', content: 'This is the full content of NOTE2.' },
      { title: 'NOTE3', content: 'This is the full content of NOTE3.' },
      { title: 'NOTE4', content: 'This is the full content of NOTE4.' },
      { title: 'NOTE5', content: 'This is the full content of NOTE5.' },
    ];
  
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
      // alert(`Edit button clicked for Note ${index + 1}`);
      navigate(`/note/edit/${index}`);
    };
  
    return (
      <div className="container text-center">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            style={{
              marginTop: rowIndex === 0 ? '20px' : '0', 
            }}
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
                          e.stopPropagation(); 
                          handleEditClick(noteIndex);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i> 
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
  