const { authenticate } = require('../services/login.service');
const { mapError } = require('../utils/errorMap');

const auth = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await authenticate(email, password);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json({ token: message });
};

module.exports = {
  auth,
};