const express = require('express');
const router = express.Router();

const {
  addArticleHandler,
  articleListHandler,
  updateArticleHandler,
  deleteArticlehandler,
} = require('../controller/articleController');
const formidable = require('express-formidable');
const {
  isAuthorizedAdminorWriter,
  isAdmin,
} = require('../middleware/authorization');
const isAuthenticated = require('../middleware/authenication');

// Admin routes
router.get('/articlesList', isAuthenticated, isAdmin, articleListHandler);

// Writer routes

// Editor routes

// Admin & Writer routes
router.post(
  '/articlenewPost',
  formidable(),
  isAuthenticated,
  isAuthorizedAdminorWriter,
  addArticleHandler
);

router.patch(
  '/articleUpdate/:articleId',
  formidable(),
  isAuthenticated,
  isAuthorizedAdminorWriter,
  updateArticleHandler
);

router.delete(
  '/articleRemove',
  isAuthenticated,
  isAuthorizedAdminorWriter,
  deleteArticlehandler
);

// Fitur routes

module.exports = router;
