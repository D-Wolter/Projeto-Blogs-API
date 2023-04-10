const { Category } = require('../models');

const createCategory = async ({ name }) => {
    const category = await Category.create({ name });
    return category;
  };

  const getAllCategories = async () => {
    const category = await Category.findAll();
    return category;
  };

module.exports = {
    createCategory,
    getAllCategories,
};