const mongoose = require("mongoose");

const SuccessStorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  region: { type: String, required: true },
  sector: { type: String, required: true },
  challenge: { type: String, required: true },
  summary: { type: String, required: true },
  fullStory: { type: String, required: true },
  keyLessons: [{ type: String }],
  thumbnail: { type: String },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  date: { type: String },
  hasVideo: { type: Boolean, default: false },
  videoUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("SuccessStory", SuccessStorySchema);