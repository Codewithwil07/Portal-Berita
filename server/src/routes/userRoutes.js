const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../controller/userController');
const registervalidator = require('../middleware/registerValidator');
const ensureAuthenticated = require('../middleware/authenication');
const ensureAdmin = require('../middleware/authorization');

// Admin routes
router
  .route('/admin')
  .get(ensureAuthenticated, ensureAdmin, User.getallUserHandler);

// Auth routes
router.post('/register', registervalidator, User.registerUserHandler);

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(500).json({ message: 'internal server error' });

    if (!user) return res.status(401).json({ message: 'Gagal Login' });

    req.login(user, (err) => {
      if (err)
        return res.status(500).json({ message: 'internal server error' });
      console.log('Session after login:', req.session);

      req.session.user = { id: user.id, email: user.email };
      return res
        .status(200)
        .json({ message: ' Berahasil login', session: req.session });
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) res.status(401).json({ message: 'Gagal Logout' });

    req.session.destroy((err) => {
      if (err)
        return res.status(500).json({ message: 'internal server error' });
      res.clearCookie('mycookie');
      return res.status(200).json({ message: 'berhasil logout' });
    });
  });
});

router.get('/protected', ensureAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Anda memiliki akses ke route ini' });
});

router.get('/isAdmin', ensureAuthenticated, ensureAdmin, (req, res) => {
  res
    .status(200)
    .json({ message: 'hanya Admin yang memiliki akses ke route ini' });
});

//User routes

module.exports = router;
