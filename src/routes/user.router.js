const express = require('express');

const router = express.Router();

const { createNewUser, getAll } = require('../controllers/user.controller');

const authToken = require('../middlewares/authToken');

router.post('/', createNewUser);
router.get('/', authToken, getAll);

module.exports = router;