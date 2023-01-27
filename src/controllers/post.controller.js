const { 
  createBlogPost, 
  getAllPostsByUser, 
  getPostById, 
  updatePost, 
  deletePost,
} = require('../services/post.service');

const { mapError } = require('../utils/errorMap');

const createNewPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;

  const { type, message } = await createBlogPost(title, content, categoryIds, authorization);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const getAllPosts = async (req, res) => {
  try {
    const email = req.user;
    const posts = await getAllPostsByUser(email);
    return res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getPostByPk = async (req, res) => {
  try {
    const email = req.user;
    const { id } = req.params;
    const post = await getPostById(email, id);
    const { type, message } = post;
    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const editPost = async (req, res) => {
  const email = req.user;
  const { id } = req.params;

  const { type, message } = await updatePost(id, email, req.body);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const destroyPost = async (req, res) => {
  const email = req.user;
  const { id } = req.params;

  const { type, message } = await deletePost(id, email);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(204).json('');
};

module.exports = { 
  createNewPost,
  getAllPosts,
  getPostByPk,
  editPost,
  destroyPost,
};