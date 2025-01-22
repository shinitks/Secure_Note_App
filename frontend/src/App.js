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
      {/* <Home></Home>
    <DashBoard></DashBoard> */}
      <Routes>
       
        {/* Route for the notes grid
        <Route path="/" element={<NotesGrid />} />

        {/* Route for the note details */}
        {/* <Route path="/note/read/:noteId" element={<NoteDetails />} />
        <Route path="/note/edit/:noteId" element={<NoteForm />} /> */ }
         <Route path="/" element={<Home />} />
         <Route path="/notes" element={<DashBoard/>}/>
         <Route path="/home/login" element={<LoginPage />}/>
         <Route path="/home/signup" element={<SignUpPage />}/>
         {/* <Route path="/home" element={<Home />} /> */}

      </Routes>
      {/* <LoginPage></LoginPage>
      <SignUpPage></SignUpPage> */}
    </Router>
    </div>
  );
}


// function App(){
//   const [isLoggedIn,updateIsLoggedIn]=useState(false);

//   const loginHandler=(email,password)=>{
//     updateIsLoggedIn(true);
//   }
//   const logoutHandler=()=>{
//     updateIsLoggedIn(false);
//   }

// }

export default App;
