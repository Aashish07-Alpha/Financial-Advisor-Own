const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        business_types: [
            "Dairy Farming",
            "Poultry Farming",
            "Small Retail Shop",
            "Handicrafts",
            "Agricultural Products",
            "Food Processing",
            "Tailoring",
            "Beauty Parlor",
            "General Store",
            "Vegetable Vending"
        ]
    });
});

module.exports = router;
