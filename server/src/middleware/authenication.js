const isAuthenticated = (req, res, next) => {
  console.log('Session:', req.session); // Debugging session
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.status(401).json({ message: 'Anda belum ter-autentikasi. Silakan login.' });
};


module.exports = isAuthenticated;
