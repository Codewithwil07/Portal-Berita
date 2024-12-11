const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../services/categoryService');

exports.addCategoryHandler = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await addCategory(name, description);
    res.status(201).json({ msg: 'category created successfully' });
  } catch (error) {
    console.error('Error creating category:', error.message);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

exports.getCategoryHandler = async (req, res) => {
  try {
    const category = await getCategory();
    res.status(200).json(category);
  } catch (error) {
    console.error('Error getting category:', error.message);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};
exports.updateCategoryHandler = async (req, res) => {
  const { name, description } = req.body;
  const { categoryId } = req.params;
  try {
    const category = await updateCategory(categoryId, name, description);
    res.status(201).json({ msg: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error.message);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};
exports.deleteCategoryHandler = async (req, res) => {
  const { name, description } = req.body;
  const { categoryId } = req.params;
  try {
    const category = await deleteCategory(categoryId, name, description);
    res.status(200).json({ msg: 'Category removed successfully' });
  } catch (error) {
    console.error('Error removing category:', error.message);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};
