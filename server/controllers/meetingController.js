const Meeting = require('../models/Meeting');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const dayjs = require('dayjs');

// Create a new meeting
exports.createMeeting = async (req, res) => {
  try {
    console.log('🔍 Creating new meeting:', req.body);
    console.log('🔍 User from request:', req.user);
    
    const {
      title,
      description,
      date,
      time,
      type = 'qna',
      duration = '1h',
      language = 'English',
      topics,
      expert,
      joinUrl,
      maxAttendees = 100
    } = req.body;

    // Validate required fields
    if (!title || !date || !time || !expert) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, date, time, expert' 
      });
    }

    // Parse topics if it's a string
    let parsedTopics = topics;
    if (typeof topics === 'string') {
      parsedTopics = topics.split(',').map(topic => topic.trim()).filter(topic => topic);
    }

    // Get creator from authenticated user
    const creator = req.user?.email || req.user?.id || req.body.creator;
    if (!creator) {
      return res.status(400).json({ error: 'User not authenticated' });
    }

    // Create meeting object
    const meetingData = {
      title: title.trim(),
      description: description?.trim() || '',
      date,
      time,
      type,
      duration,
      language,
      topics: parsedTopics || [],
      expert: expert.trim(),
      joinUrl: joinUrl?.trim() || '',
      maxAttendees: parseInt(maxAttendees),
      creator
    };

    const meeting = new Meeting(meetingData);
    await meeting.save();

    console.log('✅ Meeting created successfully:', meeting._id);
    res.status(201).json({
      success: true,
      message: 'Meeting created successfully',
      meeting: meeting.toJSON()
    });
  } catch (error) {
    console.error('❌ Meeting creation error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: Object.values(error.errors).map(err => err.message) 
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get upcoming meetings (date > current date)
exports.getUpcomingMeetings = async (req, res) => {
  try {
    const { language, type, limit = 20, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const today = new Date().toISOString().split('T')[0];
    const query = {
      date: { $gte: today },
      status: { $in: ['scheduled'] },
      isPublic: true
    };

    if (language) query.language = language;
    if (type) query.type = type;

    const meetings = await Meeting.find(query)
      .sort({ date: 1, time: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Meeting.countDocuments(query);

    res.json(meetings.map(meeting => ({
      ...meeting.toJSON(),
      registrationCount: meeting.registrationCount,
      availableSpots: meeting.availableSpots
    })));
  } catch (error) {
    console.error('❌ Get upcoming meetings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get live meetings (currently happening)
exports.getLiveMeetings = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const now = dayjs();
    
    console.log('Checking for live meetings on:', today);
    console.log('Current time:', now.format('YYYY-MM-DD HH:mm'));
    
    // Find meetings for today
    const meetings = await Meeting.find({
      date: today,
      status: { $in: ['scheduled', 'live'] },
      isPublic: true
    }).sort({ time: 1 });
    
    console.log('Found meetings for today:', meetings.length);
    
    const liveMeetings = [];
    
    for (const meeting of meetings) {
      const meetingStart = dayjs(`${meeting.date}T${meeting.time}`);
      const meetingEnd = meetingStart.add(2, 'hour'); // Assume 2 hour duration
      
      console.log(`Meeting: ${meeting.title}`);
      console.log(`Start: ${meetingStart.format('YYYY-MM-DD HH:mm')}`);
      console.log(`End: ${meetingEnd.format('YYYY-MM-DD HH:mm')}`);
      console.log(`Is now after start: ${now.isAfter(meetingStart)}`);
      console.log(`Is now before end: ${now.isBefore(meetingEnd)}`);
      
      // Check if meeting is currently happening (started and not ended)
      if (now.isAfter(meetingStart) && now.isBefore(meetingEnd)) {
        console.log('Found live meeting:', meeting.title);
        liveMeetings.push({
          ...meeting.toJSON(),
          registrationCount: meeting.registrationCount
        });
      }
    }
    
    if (liveMeetings.length > 0) {
      res.json(liveMeetings[0]); // Return first live meeting
    } else {
      res.json({});
    }
  } catch (error) {
    console.error('❌ Get live meetings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get archived/past meetings (date < current date)
exports.getArchivedMeetings = async (req, res) => {
  try {
    const { language, type, limit = 20, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const today = new Date().toISOString().split('T')[0];
    const query = {
      $or: [
        { date: { $lt: today } },
        { status: 'completed' }
      ],
      isPublic: true
    };

    if (language) query.language = language;
    if (type) query.type = type;

    const meetings = await Meeting.find(query)
      .sort({ date: -1, time: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Meeting.countDocuments(query);

    res.json(meetings.map(meeting => ({
      ...meeting.toJSON(),
      registrationCount: meeting.registrationCount
    })));
  } catch (error) {
    console.error('❌ Get archived meetings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.json({
      success: true,
      meeting: {
        ...meeting.toJSON(),
        registrationCount: meeting.registrationCount,
        availableSpots: meeting.availableSpots
      }
    });
  } catch (error) {
    console.error('❌ Get meeting error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Register for a meeting
exports.registerForMeeting = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      organization = '', 
      experience = 'beginner', 
      questions = '',
      sessionId,
      userId
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    // Check if meeting is full
    if (meeting.isFull()) {
      return res.status(400).json({ error: 'Meeting is full' });
    }

    // Check if user is already registered
    const existingRegistration = meeting.registrations.find(reg => reg.email === email);
    if (existingRegistration) {
      return res.status(400).json({ error: 'You are already registered for this meeting' });
    }

    // Create registration object
    const registration = {
      userId: req.user?._id || userId || email, // Use authenticated user ID if available
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      organization: organization.trim(),
      experience,
      questions: questions.trim(),
      registrationDate: new Date()
    };

    meeting.registrations.push(registration);
    await meeting.save();

    console.log('✅ User registered for meeting:', email, meeting._id);
    res.json({
      success: true,
      message: 'Registration successful',
      registration
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Join meeting (mark attendance)
exports.joinMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    // Check if user is registered
    const userEmail = req.user?.email || req.body.email;
    const isRegistered = meeting.registrations.some(reg => reg.email === userEmail);
    
    if (!isRegistered) {
      return res.status(400).json({ error: 'You must register for this meeting before joining' });
    }

    // Check if meeting is live
    const now = dayjs();
    const meetingStart = dayjs(`${meeting.date}T${meeting.time}`);
    const meetingEnd = meetingStart.add(2, 'hour');
    
    if (!now.isAfter(meetingStart) || !now.isBefore(meetingEnd)) {
      return res.status(400).json({ error: 'Meeting is not live yet or has ended' });
    }

    // Check if user already has attendance record
    let attendance = await Attendance.findOne({
      userId: userEmail,
      meetingId: meeting._id
    });

    if (attendance) {
      return res.status(400).json({ error: 'You have already joined this meeting' });
    }

    // Create attendance record
    attendance = new Attendance({
      userId: userEmail,
      meetingId: meeting._id,
      joinTime: new Date(),
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await attendance.save();

    console.log('✅ User joined meeting:', userEmail, meeting._id);
    res.json({
      success: true,
      message: 'Successfully joined the meeting',
      joinUrl: meeting.joinUrl,
      attendance
    });
  } catch (error) {
    console.error('❌ Join meeting error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Leave meeting (update attendance)
exports.leaveMeeting = async (req, res) => {
  try {
    const userEmail = req.user?.email || req.body.email;
    const attendance = await Attendance.findOne({
      userId: userEmail,
      meetingId: req.params.id
    });

    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    await attendance.markAsLeft();

    console.log('✅ User left meeting:', userEmail, req.params.id);
    res.json({
      success: true,
      message: 'Successfully left the meeting',
      attendance
    });
  } catch (error) {
    console.error('❌ Leave meeting error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get meeting attendees (for admin/expert)
exports.getMeetingAttendees = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    // Check if user is creator or admin
    const userEmail = req.user?.email || req.body.email;
    if (meeting.creator !== userEmail) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get attendance records
    const attendanceRecords = await Attendance.find({ meetingId: meeting._id });

    const attendees = meeting.registrations.map(registration => {
      const attendance = attendanceRecords.find(att => 
        att.userId === registration.email
      );
      
      return {
        ...registration.toJSON(),
        attendance: attendance ? {
          joinTime: attendance.joinTime,
          leaveTime: attendance.leaveTime,
          duration: attendance.duration,
          status: attendance.status
        } : null
      };
    });

    res.json(attendees);
  } catch (error) {
    console.error('❌ Get attendees error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user registrations
exports.getUserRegistrations = async (req, res) => {
  try {
    const userEmail = req.user?.email || req.query.email;
    if (!userEmail) {
      return res.json([]);
    }

    // Find all meetings where user is registered
    const meetings = await Meeting.find({
      'registrations.email': userEmail
    });

    const registrations = meetings.map(meeting => ({
      sessionId: meeting._id,
      meetingTitle: meeting.title,
      registrationDate: meeting.registrations.find(reg => reg.email === userEmail)?.registrationDate
    }));

    res.json(registrations);
  } catch (error) {
    console.error('❌ Get user registrations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a meeting by ID
exports.updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    // Check if user is creator
    const userEmail = req.user?.email || req.body.email;
    if (meeting.creator !== userEmail) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Meeting updated successfully',
      meeting: updatedMeeting.toJSON()
    });
  } catch (error) {
    console.error('❌ Update meeting error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a meeting by ID
exports.deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    // Check if user is creator
    const userEmail = req.user?.email || req.body.email;
    if (meeting.creator !== userEmail) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Delete attendance records
    await Attendance.deleteMany({ meetingId: meeting._id });
    
    // Delete meeting
    await Meeting.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Meeting deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete meeting error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Go live for a meeting
exports.goLiveMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    // Check if user is creator
    const userEmail = req.user?.email || req.body.email;
    if (meeting.creator !== userEmail) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update meeting status to live
    meeting.status = 'live';
    await meeting.save();

    res.json({
      success: true,
      message: 'Meeting is now live!'
    });
  } catch (error) {
    console.error('❌ Go live error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 