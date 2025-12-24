const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Google OAuth callback
exports.googleCallback = (req, res) => {
  try {
    const token = generateToken(req.user._id);
    
    // Set token in a secure Http-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    // Redirect to success page
    res.redirect(`${process.env.FRONTEND_URL}/success-login?access_token=${token}`);
  } catch (error) {
    console.error('Error during Google callback:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=login_failed`);
  }
};

// Email/Password login
exports.login = async (req, res) => {
  try {
    console.log('🔍 Login attempt:', { email: req.body.email });
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('🔍 User found:', user ? 'Yes' : 'No');
    
    if (!user || !user.password) {
      console.log('❌ User not found or no password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Verify password
    const isMatch = await user.comparePassword(password);
    console.log('🔍 Password match:', isMatch);
    
    if (!isMatch) {
      console.log('❌ Password does not match');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    console.log('✅ Login successful for:', user.email);
    res.json({
      success: true,
      user: user.toJSON(),
      token
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// User registration
exports.register = async (req, res) => {
  try {
    console.log('🔍 Registration attempt started');
    console.log('🔍 Request body:', req.body);
    
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    
    console.log('🔍 All fields present, checking existing user...');
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    console.log('🔍 Existing user check:', existingUser ? 'User exists' : 'No existing user');
    
    if (existingUser) {
      console.log('❌ User already exists');
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    console.log('🔍 Creating new user object...');
    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      username: email.toLowerCase().split('@')[0], // Generate username from email
      password
    });
    
    console.log('🔍 User object created, attempting to save...');
    await user.save();
    console.log('✅ User saved successfully');
    
    console.log('🔍 Generating token...');
    // Generate token
    const token = generateToken(user._id);
    
    console.log('🔍 Setting cookie...');
    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    console.log('✅ Registration successful for:', user.email);
    res.status(201).json({
      success: true,
      user: user.toJSON(),
      token
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    console.error('❌ Error details:', error.message);
    console.error('❌ Error stack:', error.stack);
    if (error.code) console.error('❌ Error code:', error.code);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get current user
exports.getUser = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    res.json({
      success: true,
      user: req.user.toJSON()
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  
  res.json({ message: 'Logged out successfully' });
};

// Verify token
exports.verifyToken = async (req, res) => {
  try {
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    res.json({
      success: true,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    console.log('🔍 Profile update attempt started');
    console.log('🔍 Request body:', req.body);
    console.log('🔍 User ID:', req.user._id);
    
    const { name, email, age, location, language, monthlyIncome, familySize } = req.body;
    
    if (!name || !email) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'Name and email are required' });
    }
    
    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email: email.toLowerCase(), 
      _id: { $ne: req.user._id } 
    });
    
    if (existingUser) {
      console.log('❌ Email already exists for another user');
      return res.status(400).json({ message: 'Email is already taken by another user' });
    }
    
    // Prepare update object
    const updateData = {
      name: name.trim(),
      email: email.toLowerCase()
    };
    
    // Add optional fields if provided
    if (age !== undefined) updateData.age = age;
    if (location !== undefined) updateData.location = location.trim();
    if (language !== undefined) updateData.language = language.trim();
    if (monthlyIncome !== undefined) updateData.monthlyIncome = monthlyIncome;
    if (familySize !== undefined) updateData.familySize = familySize;
    
    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      console.log('❌ User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('✅ Profile updated successfully for:', updatedUser.email);
    res.json({ 
      success: true, 
      user: updatedUser.toJSON(),
      message: 'Profile updated successfully' 
    });
    
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
