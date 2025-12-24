const express = require("express");
const { generateFinancialAdvice, chatWithBot } = require("../controllers/financialAdviceController");

const router = express.Router();

router.post("/generate", generateFinancialAdvice);
router.post("/chat", chatWithBot);

module.exports = router;
