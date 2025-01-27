
import React from "react";
import MenuBar from "./MenuBar";
import NotesGrid from "./Notes";

function DashBoard() {
  const styles = {
    body: {
      backgroundColor: "rgb(246, 247, 237)",
      margin: 0,
      padding: 0,
      fontFamily: "Arial, sans-serif",
    },
    dashboardContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "rgb(246, 247, 237)",
    },
    notesContainer: {
      flex: 1,
      display: "flex",
      flexWrap: "wrap",
      padding: "20px",
      justifyContent: "center",
      gap: "20px",
    },
    notesContainerMobile: {
      padding: "10px",
      gap: "15px",
    },
    notesContainerSmallMobile: {
      padding: "5px",
      gap: "10px",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.dashboardContainer}>
        <MenuBar />
        <div
          style={{
            ...styles.notesContainer,
            ...(window.innerWidth <= 768 && styles.notesContainerMobile),
            ...(window.innerWidth <= 480 && styles.notesContainerSmallMobile),
          }}
        >
          <NotesGrid />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
