const express = require('express');
const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/postController');
const asyncHandler = require('../middleware/async');

const router = express.Router();

router.route('/')
    .get(asyncHandler(getPosts))
    .post(asyncHandler(createPost));

router.route('/:id')
    .get(asyncHandler(getPost))
    .put(asyncHandler(updatePost))
    .delete(asyncHandler(deletePost));

module.exports = router;

