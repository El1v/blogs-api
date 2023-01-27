const { createCategory, getAllCategories } = require('../services/category.service');
const { mapError } = require('../utils/errorMap');

const createNewCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await createCategory(name);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const getAll = async (req, res) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  createNewCategory,
  getAll,
};