const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const customerror = require('../utils/customError');
const util = require('util');
const mongoose = require('mongoose');
const crypto = require('crypto');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });



require('dotenv').config({ path: './config.env' });

const signtoken = (id) => {

    return jwt.sign({ id }, process.env.secret_string, {
        expiresIn: '30d'
    });

};

const createSendResponse=(user,statusCode,message,token,csrfToken,res,req)=>{
    // const token=signtoken(user._id);
    const options={
        // expiresIn: '30d',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days

        // secure:true, 
        httpOnly:true
    };
    // const csrfToken = res.locals.csrfToken;
    if(process.env.NODE_ENV==='production'){
        options.secure=true;
    }
    res.cookie('jwt',token,options);
    res.cookie('csrfToken', csrfToken, options);
    console.log('Cookies:', req.cookies);
console.log('Headers:', req.headers);


    res.status(statusCode).json({
        status:'success',
        message:message,
        token,
        csrfToken,
        data:{
            user
        }
    });
}

function passwordCheck(password,res){
    if(password.length<8){
        return 0;
    }
    const regex = /[^\w\s]/;
  if( !regex.test(password)){
     return 1;
  }
  const regexUpperCase = /[A-Z]/;
const regexLowerCase = /[a-z]/;
const regexDigit = /[0-9]/;

if (!regexUpperCase.test(password) || !regexLowerCase.test(password) || !regexDigit.test(password)) {
    return 3;
}

  return 2;


};

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

       const val= passwordCheck(password,res);
       if(val==0){
        return res.status(400).json({ status: 'fail', message: 'Minimun 8 characters required' });

       }
        if(val==1){
        return res.status(400).json({ status: 'fail', message: 'Passwords Must conatin Special Characters' });

       }
       if(val==3){
        return res.status(400).json({ status: 'fail', message: 'password should contain uppercase, lowercase, and digits ' });

       }
        if (password !== confirmPassword) {
            return res.status(400).json({ status: 'fail', message: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'fail', message: 'Email is already registered' });
        }

        const newUser = new User(req.body);
        await newUser.save();
        const token = signtoken(newUser._id);
        const csrfToken = req.csrfToken ? req.csrfToken() : crypto.randomBytes(32).toString('hex');


        const message="User created and logged in successfully"
        return createSendResponse(newUser,201,message,token,csrfToken,res,req);
    } catch (error) {
        next(error);
    }
};
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ status: 'fail', message: 'Incorrect email or password' });
        }

        const token = signtoken(user._id);
         // Generate the CSRF token here.
         const csrfToken = req.csrfToken ? req.csrfToken() : crypto.randomBytes(32).toString('hex');


        // res.status(200).json({ status: 'success', token, user });
        const message="Loged in Successfuly"
        return createSendResponse(user, 201, message, token, csrfToken, res,req);
    } catch (error) {
        next(error);
    }
};
exports.protect = asyncErrorHandler(async(req,res,next)=>{
    //1.Read the token &check if it exit
    const testToken=req.headers.authorization;
    let token;
    if(testToken&&testToken.startsWith('Bearer')){
     token= testToken.split(' ')[1];
    }
    if(!token){
      next(new customerror('Your are not logged in',401))
    }
    console.log(token);
    //2.validates the token
    console.log('Raw Token:', token);
    const decoded = jwt.decode(token, { complete: true });
    console.log('Decoded Token (Raw):', decoded);
    
    const decodedToken= await util.promisify(jwt.verify)(token,process.env.secret_string)
  
    console.log(decodedToken);
    //3.if the user exists
    // const user =await User.findById(decodedToken.id);
    console.log('Decoded Token ID:', decodedToken.id);
  
    const user = await User.findById(new mongoose.Types.ObjectId(decodedToken.id)); // Convert string to ObjectId
    console.log('User from DB:', user);
  
    if(!user){
      const err=new customerror('The user with given token does not exists',401);
     return next(err);
    }
    //4. if the user changed password after the token is issued
    if(await user.isPasswordChanged(decodedToken.iat)){
  const err=new customerror('The password has changed recently.Please login again',401);
  return next(err);
    }
  
    //5 allow user to access route
  req.user=user;
    next();
  });