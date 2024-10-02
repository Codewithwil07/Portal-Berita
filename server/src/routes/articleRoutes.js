const express = require('express');
const router = express.Router();

const { addArticleHandler } = require('../controller/articleController');
const formidable = require('express-formidable');

router.post('/newPost', formidable(), addArticleHandler);

module.exports = router;
