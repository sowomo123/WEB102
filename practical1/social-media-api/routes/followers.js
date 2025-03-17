const express = require('express');
const { getFollowers, followUser, unfollowUser } = require('../controllers/followerController');
const asyncHandler = require('../middleware/async');

const router = express.Router();

router.route('/')
    .get(asyncHandler(getFollowers));

router.route('/:userId')
    .post(asyncHandler(followUser))
    .delete(asyncHandler(unfollowUser));

module.exports = router;
