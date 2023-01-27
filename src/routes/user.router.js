const express = require('express');

const router = express.Router();

const { createNewUser, getAll, getById } = require('../controllers/user.controller');

const authToken = require('../middlewares/authToken');

router.post('/', createNewUser);
router.get('/:id', authToken, getById);
router.get('/', authToken, getAll);

module.exports = router;