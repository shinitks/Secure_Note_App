const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
require('dotenv').config();  // To load environment variables



// Session Store Configuration (Using a separate database for sessions)
const sessionConfig = (app) => {
    app.use(session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',  // Use environment variable for session secret
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.SESSION_DB_URI || 'mongodb://127.0.0.1:27017/sessionDB',  // Separate MongoDB URI for sessions
            collectionName: 'sessions',  // Name of the collection where sessions will be stored
            ttl: 3600,  // Session TTL (in seconds), here it's set to 1 hour
        }),
        cookie: {
            httpOnly: true,  // Ensures cookie is only accessible via HTTP, not JavaScript
            secure: process.env.NODE_ENV === 'production',  // Set to true in production for HTTPS
            maxAge: 3600000,  // Max session cookie age (1 hour)
        },
    }));
};

// Export the session config and MongoDB connection
module.exports = sessionConfig;
