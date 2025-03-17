const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

router.get('/example', asyncHandler(async (req, res, next) => {
    // Simulate an error
    if (!req.user) {
        return next(new ErrorResponse('Not authorized', 401));
    }

    res.status(200).json({ success: true, data: "Example data" });
}));

module.exports = router;