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
    console.log(id);
    const user = req.user;
    if (isNaN(id) || id < 0 || id > user.notes.length) {
        return res.status(404).json({ status: 'fail', message: 'Note not found' });
    }
    res.status(201).json({
        status: 'success',
        message: 'successfully loaded',
        note: user.notes[id],
    });

});
exports.update_notes = asyncErrorHandler(async (req, res) => {
  const id = req.params.id * 1; 
  const user = req.user; 
  const { title, content } = req.body; 

  if (isNaN(id) || id < 0 || id > user.notes.length) {
    return res.status(404).json({ status: 'fail', message: 'Note not found' });
  }

  const note = user.notes[id];

  if (title) note.title = title;
  if (content) note.content = content;

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Note updated successfully',
    note,
  });
});

  
exports.delete_notes = asyncErrorHandler(async (req, res) => {
  const id = req.params.id; 
  const user = req.user;

  console.log(id);
  console.log(user);
  

  const mongoose = require('mongoose'); 

  try {
    const noteIndex = user.notes.findIndex((note) => note._id.equals(new mongoose.Types.ObjectId(id)));
  
    if (noteIndex === -1) {
        return res.status(404).json({ status: 'fail', message: 'Note not found' });
    }
  
    
    const deletedNote = user.notes.splice(noteIndex, 1)[0];
    await user.save();
  
    res.status(200).json({
        status: 'success',
        message: 'Note successfully deleted',
        note: deletedNote,
    });
  } catch (err) {
    return res.status(400).json({ status: 'fail', message: 'Invalid note ID' });
  }
  
});

