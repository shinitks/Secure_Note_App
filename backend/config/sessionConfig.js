const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config(); 

const sessionConfig = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key', 
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.SESSION_DB_URI || 'mongodb+srv://shinitks:sh1n1tks%237@cluster0.3vpmi.mongodb.net/sessionDB?retryWrites=true&w=majority', 
        collectionName: 'sessions', 
        ttl: 3600, 
      }),
      cookie: {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 3600000, 
      },
    })
  );
};

module.exports = sessionConfig;
