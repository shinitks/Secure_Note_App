import React ,{useState} from 'react';
import './App.css'
import DashBoard from './Components/dashBoard/dashBoard';
// import NotesGrid from './Components/dashBoard/Notes';
// import NotesGrid from './Components/loginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NotesGrid from './Components/dashBoard/Notes';
import NoteDetails from './Components/dashBoard/NotesDetails';
import NoteForm from './Components/dashBoard/CreateNoteForm';
import LoginPage from './Components/Login/loginPage';
import SignUpPage from './Components/Login/SignUp';
import Home from './Components/Login/Home';
function App(){ 
  return (
    <div>
    <Router>
      <Home></Home>
    <DashBoard></DashBoard>
      <Routes>
       
        {/* Route for the notes grid */}
        <Route path="/" element={<NotesGrid />} />

        {/* Route for the note details */}
        <Route path="/note/read/:noteId" element={<NoteDetails />} />
        <Route path="/note/edit/:noteId" element={<NoteForm />} />
      </Routes>
      <LoginPage></LoginPage>
      <SignUpPage></SignUpPage>
    </Router>
    </div>
  );
}


export default App;
