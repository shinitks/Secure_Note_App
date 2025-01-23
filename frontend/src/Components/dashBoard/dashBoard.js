import React from 'react';
import MenuBar from './MenuBar';
import NotesGrid from './Notes';
import 'bootstrap/dist/css/bootstrap.css';
import './dashboard.css'

function DashBoard() {
  return (
    <div className="dashboard">
      <MenuBar />
      <NotesGrid />
    </div>
  );
}

export default DashBoard;
