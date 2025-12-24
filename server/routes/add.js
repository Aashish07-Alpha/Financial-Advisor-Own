const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    try {
        const a = parseInt(req.query.a, 10) || 0;
        const b = parseInt(req.query.b, 10) || 0;
        res.json({ result: a + b });
    } catch (error) {
        res.status(400).json({ error: "Invalid input" });
    }
});

module.exports = router;
