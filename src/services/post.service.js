const validation = require('./validations/validationsInputValues');
const validateUserAuth = require('./validations/validateRequestUser');

const { BlogPost, Category, User, PostCategory } = require('../models');

const { getUserByEmail } = require('./user.service');

const { parseJwt } = require('../utils/JWT');

const validateInputsNewPost = async (title, content, categoryIds) => {
  const error = validation.validateNewPost(title, content, categoryIds);
  if (error.type) return error;

  const resultPromise = await Promise.all(categoryIds
    .map(async (category) => Category.findByPk(category)));

    const categoryNotFound = await resultPromise.some((result) => !result);

    if (categoryNotFound) {
 return { 
      type: 'CATEGORY_NOT_FOUND', message: 'one or more "categoryIds" not found' }; 
  }
};

const createBlogPost = async (title, content, categoryIds, token) => {
  const error = await validateInputsNewPost(title, content, categoryIds);

  if (error) return { type: error.type, message: error.message };

  if (!title || !content || !categoryIds) { 
    return { type: 'INVALID_VALUE', message: 'Some required fields are missing' }; 
  }
  const { email } = await parseJwt(token);

  const user = await User.findOne({ where: { email } });

  const newBlogPost = await BlogPost.create({
    title,
    content,
    userId: user.id,
    published: Date.now(),
    updated: Date.now(),
  });
  const postId = newBlogPost.dataValues.id;
  await Promise.all(categoryIds
    .map(async (categoryId) => PostCategory.create({ postId, categoryId })));

  return { type: null, message: newBlogPost };
};

const getAllPostsByUser = async (email) => {
  const { message } = await getUserByEmail(email);
  const { dataValues } = message;

  const posts = await BlogPost.findAll({
    where: { userId: dataValues.id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
      
    ],
  });

  return posts;
};

const findOnePost = async (email, id) => {
    const { message } = await getUserByEmail(email);
    const { dataValues } = message;

    const post = await BlogPost.findOne({
      where: { id, userId: dataValues.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
        
      ],
    });

    return post;
};

const getPostById = async (email, id) => {
  const post = await findOnePost(email, id);
  if (!post) return { type: 'POST_NOT_EXISTS', message: 'Post does not exist' };

  return post.dataValues;
};

const updatePost = async (id, email, { title, content }) => {
  const error = validation.validateUpdatePost(title, content);
  if (error.type) return error;

  const data = await validateUserAuth(email, id);
  if (data.type) return { type: data.type, message: data.message };

   await BlogPost.update({ title, content }, {
    where: { id },
  });

  const newPost = await findOnePost(email, id);

  return { type: null, message: newPost };
};

const deletePost = async (id, email) => {
  const data = await validateUserAuth(email, id);
  if (data.type) return { type: data.type, message: data.message };

  const post = await findOnePost(email, id);
  if (!post) return { type: 'POST_NOT_EXISTS', message: 'Post does not exist' };

  await BlogPost.destroy({
    where: { id },
  });

  return { type: null, message: '' };
};

module.exports = { 
  createBlogPost,
  getAllPostsByUser,
  getPostById,
  updatePost,
  deletePost,
};