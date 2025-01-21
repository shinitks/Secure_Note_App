// customError.js
class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);  // Inherit the message
      this.statusCode = statusCode;  // Attach a status code
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // Map status code to 'fail' or 'error'
      this.isOperational = true;  // Mark it as an operational error (for logging)
  
      Error.captureStackTrace(this, this.constructor); // Capture stack trace (optional)
    }
  }
  
  module.exports = CustomError;
  