const { authenticateToken } = require('../utils/JWT');
const { mapError } = require('../utils/errorMap');

const authToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const { type, message } = await authenticateToken(authorization);
  if (type) return res.status(mapError(type)).json({ message });

  return next();
};

module.exports = authToken;