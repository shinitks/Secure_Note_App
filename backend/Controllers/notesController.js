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
exports.update_notes=asyncErrorHandler(async(req,res)=>{
    const id=req.params.id*1;
    const user = req.user;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ status: 'fail', message: 'Content is required' });
    }
    if (isNaN(id) || id < 0 || id > user.notes.length) {
        return res.status(404).json({ status: 'fail', message: 'Note not found' });
    }
    user.notes[id-1].content=content;
    await user.save();

    res.status(201).json({
        status: 'success',
        message: 'successfully loaded',
        note: user.notes[id-1],
    });

})
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