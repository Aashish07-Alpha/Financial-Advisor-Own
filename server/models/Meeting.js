const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  organization: { type: String, default: '' },
  experience: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'], default: 'beginner' },
  questions: { type: String, default: '' },
  registrationDate: { type: Date, default: Date.now }
});

const MeetingSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: { 
    type: String, 
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  type: { 
    type: String, 
    enum: ['webinar', 'qna', 'workshop', 'other'], 
    default: 'qna' 
  },
  date: { 
    type: String, 
    required: [true, 'Date is required']
  },
  time: { 
    type: String, 
    required: [true, 'Time is required']
  },
  duration: { 
    type: String, 
    default: '1h'
  },
  language: { 
    type: String, 
    required: [true, 'Language is required'],
    default: 'English'
  },
  topics: [{ 
    type: String, 
    trim: true
  }],
  expert: { 
    type: String, 
    required: [true, 'Expert name is required'],
    trim: true
  },
  joinUrl: { 
    type: String, 
    trim: true
  },
  recordingUrl: { 
    type: String, 
    trim: true
  },
  maxAttendees: { 
    type: Number, 
    min: [1, 'Maximum attendees must be at least 1'],
    default: 100
  },
  registrations: [RegistrationSchema],
  creator: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['scheduled', 'live', 'completed', 'cancelled'], 
    default: 'scheduled' 
  },
  isPublic: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Virtual for meeting date and time combined
MeetingSchema.virtual('meetingDateTime').get(function() {
  if (!this.date || !this.time) return null;
  const [hours, minutes] = this.time.split(':');
  const meetingDate = new Date(this.date);
  meetingDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return meetingDate;
});

// Virtual for registration count
MeetingSchema.virtual('registrationCount').get(function() {
  return this.registrations ? this.registrations.length : 0;
});

// Virtual for available spots
MeetingSchema.virtual('availableSpots').get(function() {
  return this.maxAttendees - this.registrationCount;
});

// Virtual for meeting status based on current time
MeetingSchema.virtual('currentStatus').get(function() {
  if (!this.meetingDateTime) return 'scheduled';
  
  const now = new Date();
  const startTime = this.meetingDateTime;
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + 2); // Assume 2 hour duration if not specified
  
  if (now < startTime) return 'upcoming';
  if (now >= startTime && now <= endTime) return 'live';
  return 'past';
});

// Method to check if user is registered
MeetingSchema.methods.isUserRegistered = function(userId) {
  return this.registrations.some(reg => reg.userId.toString() === userId.toString());
};

// Method to check if meeting is full
MeetingSchema.methods.isFull = function() {
  return this.registrationCount >= this.maxAttendees;
};

// Pre-save middleware to update status
MeetingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Indexes for better query performance
MeetingSchema.index({ date: 1, time: 1 });
MeetingSchema.index({ status: 1 });
MeetingSchema.index({ creator: 1 });
MeetingSchema.index({ 'registrations.userId': 1 });

module.exports = mongoose.model('Meeting', MeetingSchema); 