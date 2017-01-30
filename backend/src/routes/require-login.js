var requireLogin = function(req, res, next) {
  if (req.session.user && req.session.userID) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = requireLogin;
