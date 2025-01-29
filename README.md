# Secure Note App - Full Stack Solution

A full-stack web application for securely creating, reading, updating, and deleting personal notes. The app uses advanced security features to ensure user authentication, data encryption, and protection against common web vulnerabilities.

## Front-End Features

- **Create Notes**: Users can securely add new notes.
- **Read Notes**: View all stored notes in a user-friendly interface.
- **Update Notes**: Edit previously stored notes.
- **Delete Notes**: Securely remove notes when no longer needed.
- **Authentication**: Users can register, log in, and access their notes only after authentication.

## Back-End Features

The back-end uses **Node.js** with the following security features and middleware:

- **Express**: Lightweight web server framework for routing and handling requests.
- **Helmet**: Sets HTTP headers to secure the app from common vulnerabilities.
- **CSRF Protection**: Prevents Cross-Site Request Forgery attacks.
- **Rate Limiting**: Limits repeated requests to prevent abuse.
- **Brute Force Protection**: Limits failed login attempts to protect against brute force attacks.
- **XSS Protection**: Protects against Cross-Site Scripting attacks.
- **Sanitization**: Ensures that no malicious data is passed through the app.
- **Session Management**: Secure session management with a timeout feature to prevent unauthorized access after inactivity.
- **User-Agent Blocking**: Blocks known malicious user agents from accessing the app.

## Security Features Overview

- **User Authentication**: Secure login and registration processes with password encryption.
- **Data Encryption**: All notes are encrypted in the database to ensure privacy.
- **Session Expiration**: User sessions are automatically expired after 15 minutes of inactivity.
- **Brute Force Protection**: Limits login attempts and enforces a cooldown period.
- **Cross-Site Scripting (XSS)**: All incoming data is sanitized to prevent harmful scripts.
- **Cross-Site Request Forgery (CSRF)**: CSRF tokens are used to ensure requests come from the authorized user.

## Tech Stack

- **Frontend**: React, Bootstrap, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose for managing notes)
- **Security**: Helmet, CSRF, XSS, Brute Force Protection, Rate Limiting

## Contributing

Feel free to fork the repository and create pull requests for improvements or bug fixes. Please ensure that any new features or bug fixes are well-tested and include appropriate documentation.
