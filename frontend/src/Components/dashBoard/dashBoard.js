import React from "react";
import MenuBar from "./MenuBar";
import NotesGrid from "./Notes";
import "./dashboard.css";

function DashBoard() {
  return (
    <div className="dashboard-container">
      <MenuBar />
      <div className="notes-container">
        <NotesGrid />
      </div>
    </div>
  );
}

export default DashBoard;
