const express = require("express");
const router = express.Router();
const { getSchemes } = require("../controllers/schemeController");

router.post("/", getSchemes);

module.exports = router;
