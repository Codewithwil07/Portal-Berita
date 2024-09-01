const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  }
  res.status(401).send('anda belum ter-autentikasi dan login lah');
};

module.exports = isAuthenticated;
