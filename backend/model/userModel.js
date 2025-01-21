const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { type } = require('os');
const noteSchema = new mongoose.Schema({
    note_id:{
        type:Number,
        required:true
    },
    title:{
          type:String,
          required:true
    },
    content: {
         type: String,
          required: true },
    createdAt: { 
        type: Date,
         default: Date.now }
    

})

const userNoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'],

    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm ypur password.'],
        validate: {
            validator: function (val) {
                return val == this.password;
            },
            message: 'Password & Confirm Password does not match'
        },
        select: false
    },
    PasswordChangedat: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
    notes: [noteSchema]
});

userNoteSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword=undefined;
    next();
  });
  
  userNoteSchema.methods.comparePassword = async function (passw) {
    return await bcrypt.compare(passw, this.password);
  };
  userNoteSchema.methods.isPasswordChanged= async function (JWTTimestamp){
    if(this.PasswordChangedat){
      const pswd=parseInt(this.PasswordChangedat.getTime()/1000,10);
   console.log(pswd,JWTTimestamp);
  
   return JWTTimestamp<pswd;
    }
    return false;
  }

  module.exports = mongoose.model('User', userNoteSchema, 'Mynotes');