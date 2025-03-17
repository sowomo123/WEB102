const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');
const asyncHandler = require('../middleware/async');

const router = express.Router();

router.route('/')
    .get(asyncHandler(getUsers))
    .post(asyncHandler(createUser));

router.route('/:id')
    .get(asyncHandler(getUser))
    .put(asyncHandler(updateUser))
    .delete(asyncHandler(deleteUser));

module.exports = router;