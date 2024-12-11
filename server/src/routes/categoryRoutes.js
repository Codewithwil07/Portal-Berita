const express = require('express');
const router = express.Router();

const {
  addCategoryHandler,
  getCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} = require('../controller/categoryController');
const isAuthenticated = require('../middleware/authenication');
const { isAdmin } = require('../middleware/authorization');

router.post('/newCategory', isAuthenticated, isAdmin, addCategoryHandler);
router.get('/listCategory', isAuthenticated, isAdmin, getCategoryHandler);
router.put(
  '/updatecategory/:categoryId',
  isAuthenticated,
  isAdmin,
  updateCategoryHandler
);
router.delete(
  '/deleteCategory/:categoryId',
  isAuthenticated,
  isAdmin,
  deleteCategoryHandler
);

module.exports = router;
