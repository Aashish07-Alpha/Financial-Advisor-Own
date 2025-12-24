const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: String }],
  owner: { type: String, required: true } // Google user ID of the creator
});

module.exports = mongoose.model('Community', CommunitySchema);