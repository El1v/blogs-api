const { createUser, getAllUsers, getByUserId } = require('../services/user.service');
const { mapError } = require('../utils/errorMap');

const createNewUser = async (req, res) => {
  const { email, password, displayName, image } = req.body;
  const { type, message } = await createUser(displayName, email, password, image);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json({ token: message });
};

const getAll = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getByUserId(id);
    const { type, message } = user;
    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(message);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  createNewUser,
  getAll,
  getById,
};