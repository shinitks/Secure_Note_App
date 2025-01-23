import React ,{useState} from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';


import DashBoard from './Components/dashBoard/dashBoard';
import NotesGrid from './Components/dashBoard/Notes';
import NoteDetails from './Components/dashBoard/NotesDetails';
import NoteForm from './Components/dashBoard/CreateNoteForm';
import LoginPage from './Components/Login/loginPage';
import SignUpPage from './Components/Login/SignUp';
import Home from './Components/Login/Home';
import EditNotePage from './Components/dashBoard/EditNote';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/dashboard" element={<DashBoard />} /> 
        <Route path="/note/create" element={<NoteForm />} />
        <Route path="/note/read/:noteId" element={<NoteDetails />} />
        <Route path="/note/edit/:noteId" element={<EditNotePage />} /> 

      </Routes>
    </Router>
  );
}


export default App;
