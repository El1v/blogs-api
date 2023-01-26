const { createUser } = require('../services/user.service');
const { mapError } = require('../utils/errorMap');

const createNewUser = async (req, res) => {
  const { email, password, displayName, image } = req.body;
  const { type, message } = await createUser(displayName, email, password, image);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json({ token: message });
};

module.exports = {
  createNewUser,
};