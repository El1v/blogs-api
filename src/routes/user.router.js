const express = require('express');

const router = express.Router();

const { createNewUser } = require('../controllers/user.controller');

router.post('/', createNewUser);

module.exports = router;