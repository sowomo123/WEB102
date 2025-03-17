const express = require("express");
const router = express.Router();

// GET request to fetch all users
router.get("/users", (req, res) => {
    res.json({ users: ["Alice", "Bob", "Charlie"] });
});

module.exports = router;