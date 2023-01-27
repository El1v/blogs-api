const express = require('express');

const router = express.Router();

const authToken = require('../middlewares/authToken');
const { createNewPost, getAllPosts, getPostByPk } = require('../controllers/post.controller');

router.post('/', authToken, createNewPost);
router.get('/', authToken, getAllPosts);
router.get('/:id', authToken, getPostByPk);

module.exports = router;