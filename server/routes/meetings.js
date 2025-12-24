const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const { ensureAuthenticated, requireAuth } = require('../middlewares/AuthMiddleware');

// Apply authentication middleware to all routes
router.use(ensureAuthenticated);

// Public routes (no authentication required)
router.get('/upcoming', meetingController.getUpcomingMeetings);
router.get('/live', meetingController.getLiveMeetings);
router.get('/archived', meetingController.getArchivedMeetings);
router.get('/:id', meetingController.getMeetingById);

// Protected routes (authentication required)
router.post('/', requireAuth, meetingController.createMeeting);
router.put('/:id', requireAuth, meetingController.updateMeeting);
router.delete('/:id', requireAuth, meetingController.deleteMeeting);

// Registration and attendance
router.post('/:id/register', requireAuth, meetingController.registerForMeeting);
router.post('/:id/join', requireAuth, meetingController.joinMeeting);
router.post('/:id/leave', requireAuth, meetingController.leaveMeeting);

// User dashboard
router.get('/user/registrations', requireAuth, meetingController.getUserRegistrations);

// Admin/Expert routes
router.get('/:id/attendees', requireAuth, meetingController.getMeetingAttendees);

// Go live for a meeting
router.post('/:id/live', requireAuth, meetingController.goLiveMeeting);

module.exports = router; 