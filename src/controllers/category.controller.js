const { createCategory } = require('../services/category.service');
const { mapError } = require('../utils/errorMap');

const createNewCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await createCategory(name);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createNewCategory,
};