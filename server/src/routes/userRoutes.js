const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const registervalidator = require('../middleware/registerValidator');

// Admin routes
router.route('/').get(userController.getallUserHandler);

// Auth routes
router.route('/auth').get(userController.loginUserHandler);
router
  .route('/register')
  .post(registervalidator, userController.registerUserHandler);

// User routes

module.exports = router;
