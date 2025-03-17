module.exports = (req, res, next) => {
    res.format({
        'text/plain': () => {
            res.send("This is a plain text response.");
        },
        'text/html': () => {
            res.send("<h1>This is an HTML response.</h1>");
        },
        'application/json': () => {
            res.json({ message: "This is a JSON response." });
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        }
    });
};

