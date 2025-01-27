const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config(); 

const sessionConfig = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET, 
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.SESSION_DB_URI, 
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
