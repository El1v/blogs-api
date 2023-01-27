const express = require('express');

const router = express.Router();

const { createNewUser, getAll, getById, destroyUser } = require('../controllers/user.controller');

const authToken = require('../middlewares/authToken');

router.post('/', createNewUser);
router.get('/:id', authToken, getById);
router.get('/', authToken, getAll);
router.delete('/me', authToken, destroyUser);

module.exports = router;