const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../controller/userController');
const registervalidator = require('../utils/registerValidator');
const isAuthenticated = require('../middleware/authenication');
const Ensure = require('../middleware/authorization');

// Admin routes
router.get('/admin', isAuthenticated, Ensure.isAdmin, User.fetchUserHandler);
router.post(
  '/admin/:id',
  isAuthenticated,
  Ensure.isAdmin,
  User.updateUserbyIdHandler
);

router.delete(
  '/admin/:id',
  isAuthenticated,
  Ensure.isAdmin,
  User.removeUserbyIdHandler
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
