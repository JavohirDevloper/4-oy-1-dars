const express = require('express');
const { getUsers, getUser } = require('./_controllers');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);

module.exports = router;
