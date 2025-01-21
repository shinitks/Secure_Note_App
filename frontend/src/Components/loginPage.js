import React,{useState} from 'react';

const notes = ['NOTE1', 'NOTE2', 'NOTE3', 'NOTE4', 'NOTE5', 'NOTE6'];

const NotesGrid = () => {
  return (
    <div className="container text-center">
      {/* First row */}
      <div className="row">
        {notes.slice(0, 2).map((note, index) => (
          <div key={index} className="col-6 col-md-4 mb-4">
            <div className="list-group-item" style={{ backgroundColor: '#f8d7da' }}>
              {note}
            </div>
          </div>
        ))}
      </div>

      {/* Second row */}
      <div className="row">
        {notes.slice(2, 5).map((note, index) => (
          <div key={index} className="col-6 col-md-4 mb-4">
            <div className="list-group-item" style={{ backgroundColor: '#d1ecf1' }}>
              {note}
            </div>
          </div>
        ))}
      </div>

      {/* Third row */}
      <div className="row">
        {notes.slice(5).map((note, index) => (
          <div key={index} className="col-6 col-md-4 mb-4">
            <div className="list-group-item" style={{ backgroundColor: '#c3e6cb' }}>
              {note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default NotesGrid;
