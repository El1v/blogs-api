const express = require('express');

const router = express.Router();

const authToken = require('../middlewares/authToken');
const { 
  createNewPost, 
  getAllPosts, 
  getPostByPk, 
  editPost, 
  destroyPost,
} = require('../controllers/post.controller');

router.post('/', authToken, createNewPost);
router.get('/', authToken, getAllPosts);
router.get('/:id', authToken, getPostByPk);
router.put('/:id', authToken, editPost);
router.delete('/:id', authToken, destroyPost);

module.exports = router;