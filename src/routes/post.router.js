const express = require('express');

const router = express.Router();

const authToken = require('../middlewares/authToken');
const { createNewPost } = require('../controllers/post.controller');

router.post('/', authToken, createNewPost);

module.exports = router;