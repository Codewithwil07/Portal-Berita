const express = require('express');
const router = express.Router();

const User = require('../controller/userController');
const registervalidator = require('../utils/registerValidator');
const isAuthenticated = require('../middleware/authenication');
const Ensure = require('../middleware/authorization');
const cekKodeOTP = require('../middleware/kodeOTP');
const passport = require('passport');

// Admin routes
router.post(
  '/admin/newUser',
  isAuthenticated,
  Ensure.isAdmin,
  registervalidator,
  User.createuserHandler
);
router.get(
  '/admin/dataUsers',
  isAuthenticated,
  Ensure.isAdmin,
  User.fetchUserHandler
);
router.post(
  '/admin/ubahDataUser/:id',
  isAuthenticated,
  Ensure.isAdmin,
  User.updateUserbyIdHandler
);

router.delete(
  '/admin/hapusUser/:id',
  isAuthenticated,
  Ensure.isAdmin,
  User.removeUserbyIdHandler
);

router.get(
  '/admin/searchUser',
  isAuthenticated,
  Ensure.isAdmin,
  User.searchUserByNameandEmailHandler
);

router.get(
  '/admin/filterUser',
  isAuthenticated,
  Ensure.isAdmin,
  User.filterUserHandler
);

// Auth routes
router.post('/register', registervalidator, User.registerUserHandler);

router.post('/login', User.loginUserHandler);

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'internal server error' });
    res.clearCookie('mycookie');
    return res.status(200).json({ message: 'berhasil logout' });
  });
});

router.post('/sendEmail', User.userMasukkanEmailHandler);
router.post('/cekOTP', cekKodeOTP);
router.patch('/resetPassword', User.userUbahPasswordHandler);
router.get('/requestNewOTP', User.NewOTPHandler);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
  (req, res) => {
    res.status(200).send('Anda berhasil masuk lewat akun Google');
  }
);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('your homepage frontend link');
  }
);

router.get('/protected', isAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Anda memiliki akses ke route ini' });
});
router.get('/isAdmin', isAuthenticated, Ensure.isAdmin, (req, res) => {
  res.status(200).json({ message: 'Kamu Admin' });
});
router.get('/isEditor', isAuthenticated, Ensure.isEditor, (req, res) => {
  res.status(200).json({ message: 'Kamu Editor' });
});
router.get('/isWriter', isAuthenticated, Ensure.isWriter, (req, res) => {
  res.status(200).json({ message: 'Kamu Writer' });
});

//User routes

module.exports = router;
