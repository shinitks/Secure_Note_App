import React,{useState} from 'react';
import MenuBar from './MenuBar';
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Navbar, Nav } from 'react-bootstrap';  // Importing necessary Bootstrap components



function DashBoard(){
    return(<div>
        <MenuBar></MenuBar>
    </div>)

}

export default DashBoard;