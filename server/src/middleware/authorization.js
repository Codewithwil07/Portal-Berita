const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin === true) {
    next();
  }
  res.status(401).send('Kamu bukan admin');
};

module.exports = ensureAdmin;
