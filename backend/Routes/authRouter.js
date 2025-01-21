const express=require('express');
const fs=require('fs');
const authController=require('../Controllers/authController.js');

const Router=express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

Router.post('/signup', authController.signup);
Router.post('/login', csrfProtection, authController.login);

// Router.post('/signup',authController.signup);
// Router.post('/login',);

module.exports=Router;