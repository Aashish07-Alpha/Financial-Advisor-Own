const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  meetingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Meeting', 
    required: true 
  },
  joinTime: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  leaveTime: { 
    type: Date 
  },
  duration: { 
    type: Number, 
    default: 0 
  }, // in minutes
  status: { 
    type: String, 
    enum: ['joined', 'left', 'attended'], 
    default: 'joined' 
  },
  ipAddress: { 
    type: String 
  },
  userAgent: { 
    type: String 
  }
}, {
  timestamps: true
});

// Virtual for attendance duration
AttendanceSchema.virtual('attendanceDuration').get(function() {
  if (!this.joinTime) return 0;
  
  const endTime = this.leaveTime || new Date();
  const durationMs = endTime - this.joinTime;
  return Math.round(durationMs / (1000 * 60)); // Convert to minutes
});

// Pre-save middleware to calculate duration
AttendanceSchema.pre('save', function(next) {
  if (this.leaveTime && this.joinTime) {
    const durationMs = this.leaveTime - this.joinTime;
    this.duration = Math.round(durationMs / (1000 * 60)); // Convert to minutes
  }
  next();
});

// Method to mark user as left
AttendanceSchema.methods.markAsLeft = function() {
  this.leaveTime = new Date();
  this.status = 'left';
  return this.save();
};

// Method to mark user as attended (for completed meetings)
AttendanceSchema.methods.markAsAttended = function() {
  this.status = 'attended';
  return this.save();
};

// Indexes for better query performance
AttendanceSchema.index({ userId: 1, meetingId: 1 }, { unique: true });
AttendanceSchema.index({ meetingId: 1 });
AttendanceSchema.index({ joinTime: 1 });
AttendanceSchema.index({ status: 1 });

module.exports = mongoose.model('Attendance', AttendanceSchema);
