const express=require('express');
const app=express();
const fs=require('fs');
const notesRouter=require('./Routes/notesRouter.js');
const authRouter=require('./Routes/authRouter.js');
const rateLimit = require('express-rate-limit');
const helmet=require('helmet');
const sanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const csrf = require('csurf'); 
const cookieParser = require('cookie-parser');
const  sessionConfig  = require('./config/sessionConfig');  // Import session config

const cors = require('cors');


app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend
  credentials: true,               // Allow cookies
  allowedHeaders: ['Authorization', 'X-csrf-token', 'Content-Type'], // Explicitly allow Authorization
}));

// app.use(express.json({limit:'10kb'}));
app.use(cookieParser());
const csrfProtection = (req,res)=>{
 if( req.headers['x-csrf-token']!=req.cookies['csrfToken']){
  return  res.status(403).json({ status: 'fail', message: 'Invalid CSRF tooken' });

 }else return true;

}


// Use cookie-parser to handle cookies for CSRF token storage

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try after 15 minutes.',
  });
  app.use(helmet());


  app.use(express.json());
  sessionConfig(app);

  app.use(sanitize());
  app.use(xss());
  


// app.use('/mynotes',limiter,csrfProtection);


app.use('/mynotes/user',limiter,authRouter);

app.use('/mynotes/notes', (req, res, next) => {
    console.log('CSRF Token from Header:', req.headers['x-csrf-token']);
    console.log('CSRF Token from Cookie:', req.cookies['csrfToken']);
    console.log('jwt Token from Header:', req.headers['authorization']);
    console.log('jwt Token from Cookie:', req.cookies['jwt']);
      console.log('Received CSRF Token from Request:', req.body.csrfToken || req.headers['x-csrf-token']); 


    console.log('Request Path:', req.path);
    csrfProtection(req,res)
    next();
},limiter,notesRouter);




app.all('*',(req,res,next)=>{
const err=new Error(`can't find ${req.originalUrl} on the server!`);
err.status='fail';
err.statusCode=404;
next(err);

});

app.use((error,req,res,next)=>{
    error.statusCode=error.statusCode||500;
    error.status=error.status||'error';
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message
    });
});

module.exports=app;