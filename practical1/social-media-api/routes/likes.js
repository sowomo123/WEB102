const express = require('express');
const { getLikes, likePost, unlikePost } = require('../controllers/likeController');
const asyncHandler = require('../middleware/async');

const router = express.Router();

router.route('/')
    .get(asyncHandler(getLikes));

router.route('/:postId')
    .post(asyncHandler(likePost))
    .delete(asyncHandler(unlikePost));

module.exports = router;
