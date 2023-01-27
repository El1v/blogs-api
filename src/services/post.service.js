const validation = require('./validations/validationsInputValues');

const { BlogPost, Category, User, PostCategory } = require('../models');

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

module.exports = { 
  createBlogPost,
};