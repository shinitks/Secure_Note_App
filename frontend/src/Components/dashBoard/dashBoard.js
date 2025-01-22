import React,{useState} from 'react';
import MenuBar from './MenuBar';
import NotesGrid from './Notes';
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Navbar, Nav } from 'react-bootstrap';  // Importing necessary Bootstrap components



function DashBoard(){
    return(<div>
        <MenuBar></MenuBar>
        <NotesGrid></NotesGrid>
    </div>)

}

export default DashBoard;