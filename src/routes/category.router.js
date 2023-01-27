const express = require('express');

const router = express.Router();

const { createNewCategory, getAll } = require('../controllers/category.controller');

const authToken = require('../middlewares/authToken');

router.post('/', authToken, createNewCategory);
router.get('/', authToken, getAll);

module.exports = router;