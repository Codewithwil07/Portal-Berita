const { id } = require('date-fns/locale');
const { Category } = require('../model/categories.model');

const addCategory = async (name, description) => {
  try {
    if (!name || !description) {
      throw new Error('category name or description undefined');
    }
    const category = await Category.create({
      data: { name: name, description: description },
    });

    return category;
  } catch (error) {
    console.error('Error in add category service:', error.message);
    throw new Error(
      error.message || 'Terjadi kesalahan pada proses pembuatan category'
    );
  }
};

const getCategory = async () => {
  try {
    const category = await Category.findMany();
    return category;
  } catch (error) {
    console.error('Error in add get service:', error.message);
    throw new Error(
      error.message || 'Terjadi kesalahan pada proses pembuatan category'
    );
  }
};

const updateCategory = async (categoryId, newName, newDescription) => {
  if (!newName || !newDescription) {
    throw new Error('category name or description undefined');
  }
  try {
    const currentCategory = await Category.findFirst({
      where: { id: parseInt(categoryId, 10) },
    });

    if (!currentCategory) {
      throw new Error('category not found');
    }

    currentCategory.name = newName;
    currentCategory.description = newDescription;

    const category = await Category.update({
      where: { id: parseInt(categoryId, 10) },
      data: { name: newName, description: newDescription },
    });
    return category;
  } catch (error) {
    console.error('Error in add update service:', error.message);
    throw new Error(
      error.message || 'Terjadi kesalahan pada proses pembuatan category'
    );
  }
};

const deleteCategory = async (categoryId, name, description) => {
  try {
    const category = await Category.delete({
      where: { id: parseInt(categoryId, 10) },
    });
    return category;
  } catch (error) {
    console.error('Error in add delete service:', error.message);
    throw new Error(
      error.message || 'Terjadi kesalahan pada proses pembuatan category'
    );
  }
};

module.exports = { getCategory, addCategory, updateCategory, deleteCategory };
