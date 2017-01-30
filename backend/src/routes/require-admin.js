var requireAdmin = function(req, res, next) {
  if (req.session.user && req.session.userID && req.session.role === 'admin') {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = requireAdmin;
