const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const category = await categoryService.createCategory({ name });
  
      res.status(201).json(category);
    } catch (err) {
      return res.status(400).json({ message: '"name" is required' });
    }
  };

  module.exports = {
    createCategory,
  };