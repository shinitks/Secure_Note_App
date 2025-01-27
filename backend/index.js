const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
const csrf = require('csurf');
const xss = require('xss-clean');
const sanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const notesRouter = require('./Routes/notesRouter.js');
const authRouter = require('./Routes/authRouter.js');
const sessionConfig = require('./config/sessionConfig'); 

app.use(
  cors({
    origin: 'https://secure-note-app-frontend.onrender.com',
    credentials: true, 
    allowedHeaders: ['Authorization', 'X-csrf-token', 'Content-Type'], 
  })
);

app.use(cookieParser());
app.use(express.json());

sessionConfig(app);

app.use(helmet());
app.use(sanitize());
app.use(xss());


const limiter = rateLimit({
  windowMs: 15* 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try after 15 minutes.',
});

const csrfProtection = (req, res) => {
  if (req.headers['x-csrf-token'] != req.cookies['csrfToken']) {
    return res.status(403).json({ status: 'fail', message: 'Invalid CSRF token' });
  } else return true;
};

const sessionTimeoutMiddleware = (req, res, next) => {
  if (req.session) {
    const now = Date.now();

    if (!req.session.lastActivity) {
      req.session.lastActivity = now;
    } else if (now - req.session.lastActivity > 15 * 60 * 1000) { 
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return next(err);
        }
        return res.status(401).json({ status: 'fail', message: 'Session expired due to inactivity' });
      });
    } else {
      req.session.lastActivity = now; 
    }
  }
  next();
};

app.use('/mynotes/notes/create',sessionTimeoutMiddleware);
app.use('/mynotes/notes/read',sessionTimeoutMiddleware);
app.use('/mynotes/notes/update',sessionTimeoutMiddleware);
app.use('/mynotes/notes/delete',sessionTimeoutMiddleware);


app.use('/mynotes/user', limiter, authRouter);

app.use(
  '/mynotes/notes',
  (req, res, next) => {
    csrfProtection(req, res);
    next();
  },
  limiter,
  notesRouter
);

app.all('*', (req, res, next) => {
  const err = new Error(`can't find ${req.originalUrl} on the server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});

module.exports = app;
