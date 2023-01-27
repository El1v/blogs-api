const express = require('express');

const router = express.Router();

const { createNewCategory } = require('../controllers/category.controller');

const authToken = require('../middlewares/authToken');

router.post('/', authToken, createNewCategory);

module.exports = router;