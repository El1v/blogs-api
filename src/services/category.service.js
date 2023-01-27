const validation = require('./validations/validationsInputValues');

const { Category } = require('../models');

const createCategory = async (name) => {
  const error = validation.validateNewCategory(name);

  if (error.type) return error;

  const categoryExists = await Category.findOne({
    where: { name },
  });

  if (categoryExists) return { type: 'CATEGORY_EXISTS', message: 'Category already registered' };

  const newCategory = await Category.create({ name });

  return { type: null, message: newCategory.dataValues };
};

module.exports = {
  createCategory,
};