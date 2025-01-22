const express=require('express');
const fs=require('fs');
const notesController=require('../Controllers/notesController.js');
const authController=require('../Controllers/authController');


const Router=express.Router();
Router.post('/create',authController.protect,notesController.create_notes);
Router.get('/allnotes',authController.protect,notesController.get_all_notes);
Router.get('/read/:id',authController.protect,notesController.read_notes);
Router.post('/update/:id',authController.protect,notesController.update_notes);
Router.delete('/delete/:id',authController.protect,notesController.delete_notes);

module.exports=Router;