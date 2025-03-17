const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all users
// @route   GET /users
// @access  Public
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = []; // Replace with database call
    res.status(200).json({ success: true, data: users });
});

// @desc    Get single user
// @route   GET /users/:id
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = {}; // Replace with database call
    if (!user) {
        return next(new ErrorResponse(`User not found with id ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: user });
});

// @desc    Create new user
// @route   POST /users
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = req.body; // Replace with database call
    res.status(201).json({ success: true, data: user });
});

// @desc    Update user
// @route   PUT /users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
    let user = {}; // Replace with database call
    if (!user) {
        return next(new ErrorResponse(`User not found with id ${req.params.id}`, 404));
    }
    user = { ...user, ...req.body }; // Simulating update
    res.status(200).json({ success: true, data: user });
});

// @desc    Delete user
// @route   DELETE /users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = {}; // Replace with database call
    if (!user) {
        return next(new ErrorResponse(`User not found with id ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, message: 'User deleted' });
});
