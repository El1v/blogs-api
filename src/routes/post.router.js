const express = require('express');

const router = express.Router();

const authToken = require('../middlewares/authToken');
const { createNewPost, getAllPosts } = require('../controllers/post.controller');

router.post('/', authToken, createNewPost);
router.get('/', authToken, getAllPosts);

module.exports = router;