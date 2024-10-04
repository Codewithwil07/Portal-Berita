const express = require('express');
const router = express.Router();

const {
  addArticleHandler,
  articleListHandler,
} = require('../controller/articleController');
const formidable = require('express-formidable');
const { isAuthorizedAdminorWriter } = require('../middleware/authorization');
const isAuthenticated = require('../middleware/authenication');

router.post(
  '/newPost',
  formidable(),
  isAuthenticated,
  isAuthorizedAdminorWriter,
  addArticleHandler
);

router.get(
  '/articlesList',
  isAuthenticated,
  isAuthorizedAdminorWriter,
  articleListHandler
);

module.exports = router;
