const { createBlogPost } = require('../services/post.service');
const { mapError } = require('../utils/errorMap');

const createNewPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;

  const { type, message } = await createBlogPost(title, content, categoryIds, authorization);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = { 
  createNewPost,
};