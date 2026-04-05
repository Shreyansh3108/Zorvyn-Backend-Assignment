const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Forbidden: Your role (${req.user?.role || 'unknown'}) lacks the required permissions.` 
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };