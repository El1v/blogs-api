const { BlogPost, User } = require('../../models');

const validateUserAuth = async (email, id) => {
  const user = await User.findOne({ where: { email } });
  const post = await BlogPost.findOne({ where: { id } });

  if (!post) return { type: 'POST_NOT_EXISTS', message: 'Post does not exist' }; 
  if (user.dataValues.id !== post.dataValues.userId) {
    return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };
  }

  return { user: user.dataValues, post: post.dataValues };
};

module.exports = validateUserAuth;