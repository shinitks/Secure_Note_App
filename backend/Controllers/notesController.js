const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const customerror = require('../utils/customError');
const util = require('util');
const mongoose = require('mongoose');
const crypto = require('crypto');


exports.create_notes = asyncErrorHandler(async (req, res) => {
    const user = req.user;
    
    
    const { content } = req.body;
    const {title}=req.body;


    if (!content) {
        return res.status(400).json({ status: 'fail', message: 'Content is required' });
    }

    const note = {
        note_id: user.notes.length + 1,
        title:title,
        content: content,
        createdAt: Date.now(),
    };

    user.notes.push(note);

    await user.save();

    res.status(201).json({
        status: 'success',
        message: 'Note created successfully',
        note: note,
    });
});
exports.get_all_notes = asyncErrorHandler(async (req, res, next) => {
    console.log('Cookies:', req.cookies);
  console.log('Authorization Header:', req.headers.Authorization);
  console.log('CSRF Token from Header:', req.headers['x-CSRF-token']);
  console.log('CSRF Token from Cookie:', req.cookies.csrfToken);

  // Check for CSRF token validity
  const csrfTokenFromHeader = req.headers['x-CSRF-token'];
  const csrfTokenFromCookie = req.cookies.csrfToken;
//   if (csrfTokenFromHeader !== csrfTokenFromCookie) {
//     return res.status(403).json({ status: 'fail', message: 'Invalid CSRF token' });
//   }

  // Verify JWT token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'fail', message: 'Missing or invalid JWT token' });
  }

  const token = authHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.secret_string);

  console.log('Decoded Token:', decodedToken);

  // Fetch user and notes
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(404).json({ status: 'fail', message: 'User not found' });
  }

  res.status(200).json({
    status: 'success',
    notes: user.notes,
  });
  });
  
  
exports.read_notes=asyncErrorHandler(async(req,res)=>{
    const id=req.params.id*1;
    const user = req.user;
    if (isNaN(id) || id < 0 || id > user.notes.length) {
        return res.status(404).json({ status: 'fail', message: 'Note not found' });
    }
    res.status(201).json({
        status: 'success',
        message: 'successfully loaded',
        note: user.notes[id-1],
    });

});
exports.update_notes = asyncErrorHandler(async (req, res) => {
    const id = req.params.id * 1; // Extract note ID
    const user = req.user; // Get user from middleware
    const { title, content } = req.body; // Extract title and content from request body
  
    if (!content || !title) {
      return res.status(400).json({ status: 'fail', message: 'Title and Content are required' });
    }
  
    if (isNaN(id) || id < 0 || id > user.notes.length) {
      return res.status(404).json({ status: 'fail', message: 'Note not found' });
    }
  
    // Update the note
    user.notes[id - 1].title = title;
    user.notes[id - 1].content = content;
    await user.save();
  
    res.status(200).json({
      status: 'success',
      message: 'Note updated successfully',
      note: user.notes[id - 1],
    });
  });
  
exports.delete_notes=asyncErrorHandler(async(req,res)=>{
    const id=req.params.id*1;
    const user = req.user;

    if (isNaN(id) || id < 0 || id > user.notes.length) {
        return res.status(404).json({ status: 'fail', message: 'Note not found' });
    }
    const deletedNote = user.notes.splice(id - 1, 1)[0]; // Removes 1 note at index (id-1) and returns it

    await user.save();

    res.status(201).json({
        status: 'success',
        message: 'successfully deleted',
        note: deletedNote,
    });

})