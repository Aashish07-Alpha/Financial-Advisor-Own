const express = require('express');
const router = express.Router();
const Community = require('../models/Community');
const Message = require('../models/Message');
const Auth = require('../middlewares/Auth');

// Get all communities (public route)
router.get('/', async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (err) {
    console.error('Get communities error:', err);
    res.status(500).json({ error: 'Failed to fetch communities' });
  }
});

//create new community (requires authentication)
router.post('/', Auth, async (req, res) => {
  try {
    const { name, description, owner } = req.body;
    
    // Validate required fields
    if (!name || !owner) {
      return res.status(400).json({ error: 'Name and owner are required' });
    }
    
    const exists = await Community.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
    if (exists) {
      return res.status(400).json({ error: 'A community with this name already exists.' });
    }
    const community = new Community({ name, description, members: [owner], owner });
    await community.save();
    res.json(community);
  } catch (err) {
    console.error('Create community error:', err);
    res.status(500).json({ error: 'Failed to create community', message: err.message });
  }
});

// Join a community (requires authentication)
router.post('/:id/join', Auth, async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const community = await Community.findById(req.params.id);
    
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }
    
    if (!community.members.includes(userId)) {
      community.members.push(userId);
      await community.save();
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Join community error:', err);
    res.status(500).json({ error: 'Failed to join community' });
  }
});

// Leave a community (requires authentication)
router.post('/:id/leave', Auth, async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const community = await Community.findById(req.params.id);
    
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }
    
    community.members = community.members.filter(id => id !== userId);
    await community.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Leave community error:', err);
    res.status(500).json({ error: 'Failed to leave community' });
  }
});

// Get messages for a community (requires authentication)
router.get('/:id/messages', Auth, async (req, res) => {
  try {
    const messages = await Message.find({ community: req.params.id });
    res.json(messages);
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Post a message (requires authentication)
router.post('/:id/messages', Auth, async (req, res) => {
  try {
    const { userId, userName, text } = req.body;
    
    if (!text || !userId || !userName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const message = new Message({ community: req.params.id, userId, userName, text });
    await message.save();
    res.json(message);
  } catch (err) {
    console.error('Post message error:', err);
    res.status(500).json({ error: 'Failed to post message' });
  }
});

// Delete a community (requires authentication)
router.delete('/:id', Auth, async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const community = await Community.findById(req.params.id);
    
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }
    
    if (community.owner !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await Community.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete community error:', err);
    res.status(500).json({ error: 'Failed to delete community' });
  }
});

module.exports = router;