const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('anda belum ter-autentikasi');
};

module.exports = ensureAuthenticated;
