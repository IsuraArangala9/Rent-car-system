const isAdminMiddleware = (req, res, next) => {
  if (req.user.role === 'administrator') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

module.exports = isAdminMiddleware;
