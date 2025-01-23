
module.exports = (req, res, next) => {
    if (req.session) {
      const now = Date.now();
  
      if (!req.session.lastActivity) {
        req.session.lastActivity = now;
      }
  
      const timeElapsed = now - req.session.lastActivity;
  
      if (timeElapsed > 2 * 60 * 1000) {
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
  