const express = require("express");
const router = express.Router();
const SuccessStory = require("../models/SuccessStory");

// GET all stories
router.get("/", async (req, res) => {
  try {
    const stories = await SuccessStory.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await SuccessStory.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete story" });
  }
});

// POST new story
router.post("/", async (req, res) => {
  try {
    const story = new SuccessStory(req.body);
    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ error: "Failed to save story" });
  }
});

module.exports = router;