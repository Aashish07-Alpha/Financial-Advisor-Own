import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaCalendarAlt, FaClock, FaUserTie, FaLink, FaTimes, FaCheckCircle, FaExclamationCircle, FaChalkboardTeacher, FaVideo, FaQuestionCircle, FaEdit, FaTrash, FaPlay, FaUsers, FaUserPlus, FaEye, FaRegUser } from 'react-icons/fa';
import AuthContext from '../Authorisation/AuthProvider';
import dayjs from 'dayjs';

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://your-production-backend.com";

const MEETING_TYPES = [
  { value: 'qna', label: 'Q&A', icon: <FaQuestionCircle />, color: 'green' },
  { value: 'webinar', label: 'Webinar', icon: <FaVideo />, color: 'blue' },
  { value: 'other', label: 'Other', icon: <FaChalkboardTeacher />, color: 'purple' },
];

const CATEGORIES = [
  { value: "all", label: "All Topics", icon: "🌟" },
  { value: "agriculture", label: "Agriculture", icon: "🌾" },
  { value: "dairy", label: "Dairy", icon: "🥛" },
  { value: "schemes", label: "Government Schemes", icon: "🏛️" },
];

const QASessions = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [archivedSessions, setArchivedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveSession, setLiveSession] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'qna',
    date: '',
    time: '',
    language: 'English', // Added back since backend requires it
    topics: '',
    expert: '',
    joinUrl: '',
    duration: '',
  });
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    questions: '',
    experience: 'beginner',
  });
  const formRef = useRef();
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState('');
  const { user } = useContext(AuthContext);

  // Add edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(form);
  const [editingId, setEditingId] = useState(null);
  const [editing, setEditing] = useState(false);

  // Add action loading/error/success states
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Add attendees modal state
  const [showAttendeesModal, setShowAttendeesModal] = useState(false);
  const [sessionAttendees, setSessionAttendees] = useState([]);

  // Add registration status tracking
  const [registeredSessions, setRegisteredSessions] = useState(new Set());
  const [registrationLoading, setRegistrationLoading] = useState(false);

  // Fetch sessions from API
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/api/meetings/upcoming`, { credentials: 'include' }).then(res => res.json()),
      fetch(`${API_URL}/api/meetings/archived`, { credentials: 'include' }).then(res => res.json()),
      fetch(`${API_URL}/api/meetings/live`, { credentials: 'include' }).then(res => res.json()).catch(() => null)
    ])
      .then(([upcoming, archived, live]) => {
        setUpcomingSessions(upcoming || []);
        setArchivedSessions(archived || []);
        setLiveSession(live && live._id ? live : null);
      })
      .catch(() => {
        setUpcomingSessions([]);
        setArchivedSessions([]);
        setLiveSession(null);
      })
      .finally(() => setLoading(false));

    // Fetch user's registration status if logged in
    if (user) {
      fetchUserRegistrations();
    }
  }, [user]);

  // Fetch user's registration status
  const fetchUserRegistrations = async () => {
    try {
      const res = await fetch(`${API_URL}/api/meetings/user/registrations`, {
        credentials: 'include' // Include cookies for authentication
      });
      
      if (res.ok) {
        const registrations = await res.json();
        const registeredIds = registrations.map(reg => reg.sessionId);
        setRegisteredSessions(new Set(registeredIds));
      }
    } catch (err) {
      // Silent fail - user registrations are optional
    }
  };

  // Enhanced create meeting handler with proper backend integration
  const handleCreateMeeting = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    if (!user) return setFormError('You must be signed in to create a meeting');
    
    // Validation
    if (!form.title.trim()) return setFormError('Title is required');
    if (!form.date) return setFormError('Date is required');
    if (!form.time) return setFormError('Time is required');
    
    setCreating(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        type: form.type,
        date: form.date,
        time: form.time,
        language: form.language, // Added back
        topics: form.topics.split(',').map(t => t.trim()).filter(Boolean),
        expert: form.expert,
        joinUrl: form.joinUrl,
        duration: form.duration,
        creator: user.primaryEmailAddress?.emailAddress || user.email || user.id,
        createdAt: new Date().toISOString()
      };

      const res = await fetch(`${API_URL}/api/meetings`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        let errorMessage = 'Failed to create meeting';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          if (res.status === 404) {
            errorMessage = 'API endpoint not found. Please check the backend routes.';
          } else if (res.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          } else if (res.status === 0) {
            errorMessage = 'Cannot connect to server. Please check if the backend is running.';
          } else if (res.status === 401) {
            errorMessage = 'Authentication required. Please log in again.';
          }
        }
        throw new Error(errorMessage);
      }

      await res.json();

      setFormSuccess('Meeting created successfully!');
      setShowCreateModal(false);
      setForm({
        title: '', description: '', type: 'qna', date: '', time: '', language: 'English', topics: '', expert: '', joinUrl: '', duration: '',
      });
      
      // Refresh sessions
      setLoading(true);
      Promise.all([
        fetch(`${API_URL}/api/meetings/upcoming`, { credentials: 'include' }).then(res => res.json()),
        fetch(`${API_URL}/api/meetings/archived`, { credentials: 'include' }).then(res => res.json()),
        fetch(`${API_URL}/api/meetings/live`, { credentials: 'include' }).then(res => res.json()).catch(() => null)
      ])
        .then(([upcoming, archived, live]) => {
          setUpcomingSessions(upcoming || []);
          setArchivedSessions(archived || []);
          setLiveSession(live && live._id ? live : null);
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.error('Create meeting error:', err);
      setFormError(err.message || 'Failed to create meeting');
    } finally {
      setCreating(false);
    }
  };

  // Registration handler - Fixed backend integration
  const handleRegistration = async (e) => {
    e.preventDefault();
    setRegistrationError('');
    setRegistrationSuccess('');
    if (!selectedSession) return setRegistrationError('No session selected');
    
    // Validation
    if (!registrationForm.name.trim()) return setRegistrationError('Name is required');
    if (!registrationForm.email.trim()) return setRegistrationError('Email is required');
    if (!registrationForm.phone.trim()) return setRegistrationError('Phone is required');
    
    setRegistrationLoading(true);
    try {
      const payload = {
        name: registrationForm.name,
        email: registrationForm.email,
        phone: registrationForm.phone,
        organization: registrationForm.organization,
        experience: registrationForm.experience,
        questions: registrationForm.questions,
        sessionId: selectedSession._id,
        userId: user?.id || registrationForm.email
      };

      const res = await fetch(`${API_URL}/api/meetings/${selectedSession._id}/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        let errorMessage = 'Failed to register';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          if (res.status === 400) {
            errorMessage = 'Invalid registration data. Please check your information.';
          } else if (res.status === 404) {
            errorMessage = 'Meeting not found.';
          } else if (res.status === 0) {
            errorMessage = 'Cannot connect to server. Please check if the backend is running.';
          } else if (res.status === 401) {
            errorMessage = 'Authentication required. Please log in again.';
          }
        }
        throw new Error(errorMessage);
      }

      await res.json();

      setRegistrationSuccess('Registration successful! You can now join the meeting.');
      
      // Add to registered sessions
      setRegisteredSessions(prev => new Set([...prev, selectedSession._id]));
      
      // Reset form
      setRegistrationForm({
        name: '', email: '', phone: '', organization: '', questions: '', experience: 'beginner',
      });
      
      // Close modal after delay
      setTimeout(() => {
        setShowRegistrationModal(false);
        setSelectedSession(null);
      }, 2000);

    } catch (err) {
      console.error('Registration error:', err);
      setRegistrationError(err.message || 'Failed to register for meeting');
    } finally {
      setRegistrationLoading(false);
    }
  };

  // Enhanced get attendees handler
  const handleViewAttendees = async (session) => {
    setShowAttendeesModal(true);
    try {
      const res = await fetch(`${API_URL}/api/meetings/${session._id}/attendees`, {
        credentials: 'include' // Include cookies for authentication
      });
      
      if (!res.ok) {
        await res.text();
        throw new Error('Failed to fetch attendees');
      }
      
      const attendees = await res.json();
      setSessionAttendees(attendees || []);
    } catch (err) {
      setSessionAttendees([]);
    }
  };

  // Edit button handler
  const handleEditClick = (session) => {
    setEditingId(session._id);
    setEditForm({
      ...session,
      topics: session.topics ? session.topics.join(', ') : '',
      language: session.language || 'English', // Ensure language is set
    });
    setShowEditModal(true);
  };

  // Enhanced edit meeting handler
  const handleEditMeeting = async (e) => {
    e.preventDefault();
    setEditing(true);
    try {
      const payload = {
        title: editForm.title,
        description: editForm.description,
        type: editForm.type,
        date: editForm.date,
        time: editForm.time,
        language: editForm.language, // Added back
        topics: editForm.topics.split(',').map(t => t.trim()).filter(Boolean),
        expert: editForm.expert,
        joinUrl: editForm.joinUrl,
        duration: editForm.duration,
        updatedAt: new Date().toISOString()
      };

      const res = await fetch(`${API_URL}/api/meetings/${editingId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        let errorMessage = 'Failed to update meeting';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Silent fail for parsing errors
        }
        throw new Error(errorMessage);
      }

      await res.json();

      setShowEditModal(false);
      setEditingId(null);
      
      // Refresh sessions
      setLoading(true);
      Promise.all([
        fetch(`${API_URL}/api/meetings/upcoming`, { credentials: 'include' }).then(res => res.json()),
        fetch(`${API_URL}/api/meetings/archived`, { credentials: 'include' }).then(res => res.json()),
        fetch(`${API_URL}/api/meetings/live`, { credentials: 'include' }).then(res => res.json()).catch(() => null)
      ])
        .then(([upcoming, archived, live]) => {
          setUpcomingSessions(upcoming || []);
          setArchivedSessions(archived || []);
          setLiveSession(live && live._id ? live : null);
        })
        .finally(() => setLoading(false));
    } catch (err) {
      setActionError(err.message || 'Failed to update meeting');
    } finally {
      setEditing(false);
    }
  };

  // Enhanced delete meeting handler
  const handleDeleteMeeting = async (id) => {
    if (!window.confirm('Delete this meeting?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/meetings/${id}`, { 
        method: 'DELETE',
        credentials: 'include' // Include cookies for authentication
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        let errorMessage = 'Failed to delete meeting';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Silent fail for parsing errors
        }
        throw new Error(errorMessage);
      }
      
      // Refresh sessions
      Promise.all([
        fetch(`${API_URL}/api/meetings/upcoming`, { credentials: 'include' }).then(res => res.json()),
        fetch(`${API_URL}/api/meetings/archived`, { credentials: 'include' }).then(res => res.json()),
        fetch(`${API_URL}/api/meetings/live`, { credentials: 'include' }).then(res => res.json()).catch(() => null)
      ])
        .then(([upcoming, archived, live]) => {
          setUpcomingSessions(upcoming || []);
          setArchivedSessions(archived || []);
          setLiveSession(live && live._id ? live : null);
        })
        .finally(() => setLoading(false));
    } catch (err) {
      setActionError(err.message || 'Failed to delete meeting');
    }
  };

  // Filter logic for category
  const filterSessions = (sessions) => {
    if (selectedCategory === 'all') return sessions;
    return sessions.filter(s =>
      s.category === selectedCategory ||
      (s.topics && s.topics.some(t => t.toLowerCase().includes(selectedCategory)))
    );
  };

  // Helper for expert avatar/initials
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'E';

  // Only show edit/delete if user is creator
  const isMeetingCreator = (session) => {
    if (!user) return false;
    return session.creator === (user.primaryEmailAddress?.emailAddress || user.id);
  };

  // Helper to check if a meeting is in the past
  const isPastMeeting = (session) => {
    const now = dayjs();
    const sessionDateTime = dayjs(`${session.date}T${session.time}`);
    return sessionDateTime.isBefore(now);
  };

  // Combine all sessions and filter for past meetings
  const allSessions = [...upcomingSessions, ...archivedSessions];
  const pastMeetings = filterSessions(allSessions).filter(isPastMeeting);

  // Helper to validate URL
  const isValidUrl = (url) => /^https?:\/\//.test(url);

  // Enhanced go live handler
  const handleGoLive = async (session) => {
    setActionError('');
    setActionSuccess('');
    if (!session.joinUrl || !isValidUrl(session.joinUrl)) {
      setActionError('No valid meeting link set. Please edit the meeting and add a valid URL.');
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/meetings/${session._id}/live`, { 
        method: 'POST',
        credentials: 'include' // Include cookies for authentication
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        let errorMessage = 'Failed to go live';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Silent fail for parsing errors
        }
        throw new Error(errorMessage);
      }

      setActionSuccess('Meeting is now live!');
      
      // Refresh sessions to update live meeting
      setLoading(true);
      Promise.all([
        fetch(`${API_URL}/api/meetings/upcoming`, { credentials: 'include' }).then(res => res.json()),
        fetch(`${API_URL}/api/meetings/archived`, { credentials: 'include' }).then(res => res.json()),
        fetch(`${API_URL}/api/meetings/live`, { credentials: 'include' }).then(res => res.json()).catch(() => null)
      ])
        .then(([upcoming, archived, live]) => {
          setUpcomingSessions(upcoming || []);
          setArchivedSessions(archived || []);
          setLiveSession(live && live._id ? live : null);
        })
        .finally(() => setLoading(false));
        
      window.open(session.joinUrl, '_blank', 'noopener');
    } catch (err) {
      console.error('Go live error:', err);
      setActionError(err.message || 'Failed to go live.');
    } finally {
      setActionLoading(false);
    }
  };

  // Check if user is registered for a session
  const isRegisteredForSession = (sessionId) => {
    return registeredSessions.has(sessionId);
  };

  // Helper to check if registration is closed (at meeting start time)
  const isRegistrationClosed = (session) => {
    const now = dayjs();
    const meetingDateTime = dayjs(`${session.date}T${session.time}`);
    return now.isAfter(meetingDateTime);
  };

  // Handler for watch button (past sessions)
  const handleWatchRecording = (session) => {
    if (!session.recordingUrl) {
      setActionError('Video is not available. Please contact admin for access.');
      return;
    }
    window.open(session.recordingUrl, '_blank', 'noopener');
  };

  // Enhanced registration handler with time restriction
  const handleRegister = (session) => {
    if (isRegistrationClosed(session)) {
      setActionError('Registration is closed. Registration closes at the meeting start time.');
      return;
    }
    
    if (isRegisteredForSession(session._id)) {
      setActionSuccess('You are already registered for this meeting!');
      return;
    }
    setSelectedSession(session);
    setShowRegistrationModal(true);
  };

  // Handler for Join Meeting (after registration) - Only allow if registered
  const handleJoinMeeting = (session) => {
    if (!isRegisteredForSession(session._id)) {
      setActionError('You cannot join this meeting. You must register first. For live sessions, please call admin at 1800-XXX-XXXX for immediate access.');
      return;
    }
    
    if (!session.joinUrl || !isValidUrl(session.joinUrl)) {
      setActionError('No valid meeting link set by the host.');
      return;
    }
    window.open(session.joinUrl, '_blank', 'noopener');
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg">
            <FaChalkboardTeacher className="text-white text-2xl" />
          </div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
            Learn from Experts
          </h1>
          <p className="text-xl text-green-700 font-medium max-w-2xl mx-auto">
            Get answers to your questions from industry experts and connect with like-minded professionals
          </p>
        </div>

        {/* Enhanced Create Meeting Button */}
        <div className="flex justify-end mb-8">
          <button
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            onClick={() => setShowCreateModal(true)}
          >
            <FaUserPlus className="text-lg" />
            Create Meeting
          </button>
        </div>

        {/* Enhanced Live Session */}
        {liveSession && (
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-3xl p-8 mb-12 relative overflow-hidden shadow-2xl animate-pulse border-4 border-green-400">
            <div className="absolute top-6 right-6 flex items-center">
              <span className="animate-ping absolute h-4 w-4 rounded-full bg-red-400 opacity-75"></span>
              <span className="relative rounded-full h-4 w-4 bg-red-500"></span>
              <span className="ml-3 font-bold text-lg">LIVE NOW</span>
            </div>
            
            {/* Registration Status for Live Session */}
            <div className="absolute top-6 left-6">
              {isRegisteredForSession(liveSession._id) ? (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <FaCheckCircle /> Registered
                </span>
              ) : (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <FaTimes /> Not Registered
                </span>
              )}
            </div>
            
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-20 text-green-100 text-3xl">
                    <FaPlay />
                  </span>
                  <h2 className="text-3xl font-bold mb-0">{liveSession.title}</h2>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-800 text-white text-xl font-bold">
                    {getInitials(liveSession.expert)}
                  </span>
                  <span className="font-semibold text-lg">{liveSession.expert}</span>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <FaUsers /> {liveSession.registrations?.length || liveSession.attendees || 0} Attendees
                  </span>
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <FaChalkboardTeacher /> {liveSession.language || 'English'}
                  </span>
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <FaClock /> {liveSession.time} ({liveSession.date})
                  </span>
                </div>
                <span className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold mr-2">
                  <FaVideo className="inline mr-2" />{liveSession.type}
                </span>
                {liveSession.duration && (
                  <span className="inline-block bg-blue-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold ml-2">
                    Duration: {liveSession.duration}
                  </span>
                )}
                
                {/* Additional info for unregistered users */}
                {!isRegisteredForSession(liveSession._id) && (
                  <div className="mt-4 p-3 bg-red-600 bg-opacity-20 rounded-lg border border-red-400">
                    <p className="text-sm font-semibold">
                      ⚠️ You are not registered for this live meeting.
                    </p>
                    <p className="text-xs opacity-90 mt-1">
                      Call admin at 1800-XXX-XXXX for immediate access.
                    </p>
                  </div>
                )}
              </div>
              <a
                href={liveSession.joinUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-3 text-xl transform hover:scale-105 ${
                  isRegisteredForSession(liveSession._id)
                    ? 'bg-white text-green-700 hover:bg-green-50'
                    : 'bg-red-600 text-white hover:bg-red-700 cursor-not-allowed opacity-75'
                }`}
                title={isRegisteredForSession(liveSession._id) ? "Join Live Meeting" : "Not registered - Call admin"}
                onClick={(e) => {
                  if (!isRegisteredForSession(liveSession._id)) {
                    e.preventDefault();
                    setActionError('You cannot join this live meeting. You must register first. Please call admin at 1800-XXX-XXXX for immediate access.');
                    return;
                  }
                  if (!liveSession.joinUrl || !isValidUrl(liveSession.joinUrl)) {
                    e.preventDefault();
                    setActionError('No valid meeting link available. Please contact admin.');
                    return;
                  }
                }}
              >
                <FaPlay /> {isRegisteredForSession(liveSession._id) ? 'Join Now' : 'Call Admin'}
              </a>
            </div>
          </div>
        )}

        {/* Debug Info - Show when no live session */}
        {!liveSession && (
          <div className="bg-gray-100 rounded-xl p-4 mb-8 text-center">
            <p className="text-gray-600 font-medium">
              No live meetings currently. Check upcoming sessions below.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Live meetings appear here when they are currently happening.
            </p>
          </div>
        )}

        {/* Enhanced Category Filter */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              className={`px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === cat.value 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl scale-105' 
                  : 'bg-white text-green-700 hover:bg-green-50 border-2 border-green-200 hover:border-green-300'
              }`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Enhanced Upcoming Sessions */}
        <h2 className="text-3xl font-extrabold text-green-800 mb-8 flex items-center gap-3 justify-center">
          <FaCalendarAlt className="text-green-600" /> 
          Upcoming Sessions
        </h2>
        
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-spin">
              <FaChalkboardTeacher className="text-white text-2xl" />
            </div>
            <p className="text-green-700 font-bold mt-4 text-lg">Loading amazing sessions...</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {filterSessions(upcomingSessions).length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mb-4">
                  <FaCalendarAlt className="text-gray-500 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">No sessions available</h3>
                <p className="text-gray-500">Check back later for new sessions!</p>
              </div>
            ) : (
              filterSessions(upcomingSessions).map(session => (
                <div key={session._id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-green-100 hover:border-green-300 transform hover:-translate-y-2">
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                        session.type === 'webinar' 
                          ? 'bg-blue-100 text-blue-800' 
                          : session.type === 'other'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {MEETING_TYPES.find(t => t.value === session.type)?.icon}
                        {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-semibold flex items-center gap-2">
                          <FaCalendarAlt className="text-green-500" />
                          {session.date}
                        </span>
                        {isRegistrationClosed(session) && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <FaTimes /> Registration Closed
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-green-800 mb-4 leading-tight">{session.title}</h3>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 text-xl font-bold">
                        {getInitials(session.expert)}
                      </span>
                      <div>
                        <span className="font-semibold text-green-700 text-lg">{session.expert}</span>
                        <p className="text-sm text-gray-500">Expert</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6 flex-1 leading-relaxed">{session.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {session.topics && session.topics.map(topic => (
                        <span key={topic} className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 text-sm px-3 py-1 rounded-full font-semibold border border-green-200">
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 font-semibold">
                        <span className="flex items-center gap-1">
                          <FaClock className="text-green-500" />
                          {session.time}
                        </span>
                        {session.duration && (
                          <span className="flex items-center gap-1">
                            <FaClock className="text-green-500" />
                            {session.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {isMeetingCreator(session) ? (
                        <>
                          <button
                            onClick={() => handleGoLive(session)}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                            title="Go Live to Meeting"
                            disabled={actionLoading}
                          >
                            <FaPlay /> Go Live
                          </button>
                          <button 
                            onClick={() => handleViewAttendees(session)}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-xl font-bold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                            title="View Attendees"
                          >
                            <FaEye />
                          </button>
                        </>
                      ) : (
                        <>
                          {isRegisteredForSession(session._id) ? (
                            <>
                              <button
                                onClick={() => handleJoinMeeting(session)}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                                title="Join Meeting"
                              >
                                <FaPlay /> Join Meeting
                              </button>
                              <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1">
                                <FaCheckCircle /> Registered
                              </div>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleRegister(session)}
                                className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                                  isRegistrationClosed(session)
                                    ? 'bg-gray-400 text-white cursor-not-allowed opacity-50'
                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transform hover:scale-105'
                                }`}
                                title={isRegistrationClosed(session) ? 'Registration Closed' : 'Register for Meeting'}
                                disabled={isRegistrationClosed(session)}
                              >
                                <FaUserPlus /> 
                                {isRegistrationClosed(session) ? 'Registration Closed' : 'Register'}
                              </button>
                              <button
                                onClick={() => handleJoinMeeting(session)}
                                className="bg-gray-400 text-white px-4 py-3 rounded-xl font-bold cursor-not-allowed opacity-50"
                                title="Register first to join"
                                disabled
                              >
                                <FaPlay />
                              </button>
                              <div className="text-xs text-red-600 font-semibold mt-1 text-center">
                                Call admin at 1800-XXX-XXXX for access
                              </div>
                            </>
                          )}
                        </>
                      )}
                      
                      {isMeetingCreator(session) && (
                        <>
                          <button 
                            className="bg-yellow-500 text-white px-3 py-3 rounded-xl flex items-center gap-1 hover:bg-yellow-600 transition-all duration-300 shadow-lg" 
                            onClick={() => handleEditClick(session)} 
                            title="Edit Meeting"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="bg-red-500 text-white px-3 py-3 rounded-xl flex items-center gap-1 hover:bg-red-600 transition-all duration-300 shadow-lg" 
                            onClick={() => handleDeleteMeeting(session._id)} 
                            title="Delete Meeting"
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Enhanced Past Sessions */}
        <h2 className="text-3xl font-extrabold text-green-800 mb-8 flex items-center gap-3 justify-center">
          <FaClock className="text-green-600" /> 
          Past Sessions
        </h2>
        
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-spin">
              <FaChalkboardTeacher className="text-white text-2xl" />
            </div>
            <p className="text-green-700 font-bold mt-4 text-lg">Loading past sessions...</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pastMeetings.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mb-4">
                  <FaClock className="text-gray-500 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">No past sessions</h3>
                <p className="text-gray-500">Past sessions will appear here</p>
              </div>
            ) : (
              pastMeetings.map(session => (
                <div key={session._id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-green-100 hover:border-green-300 transform hover:-translate-y-2">
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                        session.type === 'webinar' 
                          ? 'bg-blue-100 text-blue-800' 
                          : session.type === 'other'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {MEETING_TYPES.find(t => t.value === session.type)?.icon}
                        {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-semibold flex items-center gap-2">
                          <FaCalendarAlt className="text-green-500" />
                          {session.date}
                        </span>
                        {isRegistrationClosed(session) && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <FaTimes /> Registration Closed
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-green-800 mb-4 leading-tight">{session.title}</h3>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 text-xl font-bold">
                        {getInitials(session.expert)}
                      </span>
                      <div>
                        <span className="font-semibold text-green-700 text-lg">{session.expert}</span>
                        <p className="text-sm text-gray-500">Expert</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {session.topics && session.topics.map(topic => (
                        <span key={topic} className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 text-sm px-3 py-1 rounded-full font-semibold border border-green-200">
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4 text-sm text-gray-500 font-semibold">
                        <span className="flex items-center gap-1">
                          <FaClock className="text-green-500" />
                          {session.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg flex items-center gap-2"
                          onClick={() => handleWatchRecording(session)}
                          title="Watch Recording"
                        >
                          <FaPlay /> Watch
                        </button>
                        {isMeetingCreator(session) && (
                          <>
                            <button 
                              className="bg-yellow-500 text-white px-3 py-3 rounded-xl flex items-center gap-1 hover:bg-yellow-600 transition-all duration-300 shadow-lg" 
                              onClick={() => handleEditClick(session)} 
                              title="Edit Meeting"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className="bg-red-500 text-white px-3 py-3 rounded-xl flex items-center gap-1 hover:bg-red-600 transition-all duration-300 shadow-lg" 
                              onClick={() => handleDeleteMeeting(session._id)} 
                              title="Delete Meeting"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Enhanced Help Section */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
            <FaUserTie className="text-white text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
          <p className="text-white text-lg mb-4 font-semibold">Call: 1800-XXX-XXXX (Toll Free)</p>
          <p className="text-white opacity-90">9am to 6pm (Monday to Saturday)</p>
        </div>
      </div>

      {/* Enhanced Create Meeting Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-green-200/60 via-white/80 to-green-100/60 backdrop-blur-sm"></div>
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-300 rounded-full opacity-30 blur-2xl animate-float" style={{zIndex:1}}></div>
          <form ref={formRef} onSubmit={handleCreateMeeting} className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-2xl animate-fadeIn flex flex-col max-h-[90vh] border border-green-100">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-t-3xl">
              <button type="button" className="absolute top-6 right-6 text-white hover:text-gray-200 text-2xl transition-colors" onClick={() => setShowCreateModal(false)}>
                <FaTimes />
              </button>
              <h2 className="text-3xl font-extrabold text-center">Create New Meeting</h2>
              <p className="text-center opacity-90 mt-2">Share your expertise with the community</p>
            </div>
            
            <div className="overflow-y-auto px-8 py-6 flex-1">
              {formError && (
                <div className="flex items-center text-red-600 mb-4 p-4 bg-red-50 rounded-xl border border-red-200">
                  <FaExclamationCircle className="mr-3 text-xl" />
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="flex items-center text-green-600 mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <FaCheckCircle className="mr-3 text-xl" />
                  {formSuccess}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Title <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300" 
                    value={form.title} 
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))} 
                    placeholder="e.g. Dairy Business Q&A Session" 
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Description</label>
                  <textarea 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 resize-none" 
                    rows="3"
                    value={form.description} 
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))} 
                    placeholder="Brief description of what will be covered in this session..." 
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                    <input 
                      required 
                      type="date" 
                      className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300" 
                      value={form.date} 
                      onChange={e => setForm(f => ({ ...f, date: e.target.value }))} 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Time <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <FaClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                    <input 
                      required 
                      type="time" 
                      className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300" 
                      value={form.time} 
                      onChange={e => setForm(f => ({ ...f, time: e.target.value }))} 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Type</label>
                  <select 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300" 
                    value={form.type} 
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  >
                    {MEETING_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Duration</label>
                  <input 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300" 
                    value={form.duration} 
                    onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} 
                    placeholder="e.g. 1h 30m" 
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Language</label>
                  <select 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300" 
                    value={form.language} 
                    onChange={e => setForm(f => ({ ...f, language: e.target.value }))}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Urdu">Urdu</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Topics <span className="text-gray-400 text-sm">(comma separated)</span></label>
                  <input 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300" 
                    value={form.topics} 
                    onChange={e => setForm(f => ({ ...f, topics: e.target.value }))} 
                    placeholder="e.g. loans, subsidies, insurance, best practices" 
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Expert Name</label>
                  <div className="relative">
                    <FaUserTie className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                    <input 
                      className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300" 
                      value={form.expert} 
                      onChange={e => setForm(f => ({ ...f, expert: e.target.value }))} 
                      placeholder="Expert's name" 
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Join URL</label>
                  <div className="relative">
                    <FaLink className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                    <input 
                      className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300" 
                      value={form.joinUrl} 
                      onChange={e => setForm(f => ({ ...f, joinUrl: e.target.value }))} 
                      placeholder="https://meet.google.com/..." 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white p-6 rounded-b-3xl border-t border-gray-100">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 w-full text-lg flex items-center justify-center gap-2 transform hover:scale-105" 
                disabled={creating}
              >
                {creating && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>}
                {creating ? 'Creating...' : 'Create Meeting'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Registration Modal */}
      {showRegistrationModal && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-green-200/60 via-white/80 to-green-100/60 backdrop-blur-sm"></div>
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-300 rounded-full opacity-30 blur-2xl animate-float" style={{zIndex:1}}></div>
          <form onSubmit={handleRegistration} className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-fadeIn flex flex-col max-h-[90vh] border border-green-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-3xl">
              <button type="button" className="absolute top-6 right-6 text-white hover:text-gray-200 text-2xl transition-colors" onClick={() => setShowRegistrationModal(false)}>
                <FaTimes />
              </button>
              <h2 className="text-3xl font-extrabold text-center">Register for Meeting</h2>
              <p className="text-center opacity-90 mt-2">{selectedSession.title}</p>
            </div>
            
            <div className="overflow-y-auto px-8 py-6 flex-1">
              {registrationError && (
                <div className="flex items-center text-red-600 mb-4 p-4 bg-red-50 rounded-xl border border-red-200">
                  <FaExclamationCircle className="mr-3 text-xl" />
                  {registrationError}
                </div>
              )}
              {registrationSuccess && (
                <div className="flex items-center text-green-600 mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <FaCheckCircle className="mr-3 text-xl" />
                  {registrationSuccess}
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300" 
                    value={registrationForm.name} 
                    onChange={e => setRegistrationForm(f => ({ ...f, name: e.target.value }))} 
                    placeholder="Enter your full name" 
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Email <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    type="email"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300" 
                    value={registrationForm.email} 
                    onChange={e => setRegistrationForm(f => ({ ...f, email: e.target.value }))} 
                    placeholder="your.email@example.com" 
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Phone <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    type="tel"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300" 
                    value={registrationForm.phone} 
                    onChange={e => setRegistrationForm(f => ({ ...f, phone: e.target.value }))} 
                    placeholder="+91 98765 43210" 
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Organization</label>
                  <input 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300" 
                    value={registrationForm.organization} 
                    onChange={e => setRegistrationForm(f => ({ ...f, organization: e.target.value }))} 
                    placeholder="Your company or organization" 
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Experience Level</label>
                  <select 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300" 
                    value={registrationForm.experience} 
                    onChange={e => setRegistrationForm(f => ({ ...f, experience: e.target.value }))}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Questions or Topics</label>
                  <textarea 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 resize-none" 
                    rows="3"
                    value={registrationForm.questions} 
                    onChange={e => setRegistrationForm(f => ({ ...f, questions: e.target.value }))} 
                    placeholder="Any specific questions or topics you'd like to discuss..." 
                  />
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white p-6 rounded-b-3xl border-t border-gray-100">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 w-full text-lg flex items-center justify-center gap-2 transform hover:scale-105" 
                disabled={registrationLoading}
              >
                {registrationLoading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>}
                {registrationLoading ? 'Registering...' : 'Register for Meeting'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Meeting Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-green-200/60 via-white/80 to-green-100/60 backdrop-blur-sm"></div>
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-300 rounded-full opacity-30 blur-2xl animate-float" style={{zIndex:1}}></div>
          <form onSubmit={handleEditMeeting} className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-2xl animate-fadeIn flex flex-col max-h-[90vh] border border-green-100">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-t-3xl">
              <button type="button" className="absolute top-6 right-6 text-white hover:text-gray-200 text-2xl transition-colors" onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
              <h2 className="text-3xl font-extrabold text-center">Edit Meeting</h2>
              <p className="text-center opacity-90 mt-2">Update meeting details</p>
            </div>
            
            <div className="overflow-y-auto px-8 py-6 flex-1">
              {formError && (
                <div className="flex items-center text-red-600 mb-4 p-4 bg-red-50 rounded-xl border border-red-200">
                  <FaExclamationCircle className="mr-3 text-xl" />
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="flex items-center text-green-600 mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <FaCheckCircle className="mr-3 text-xl" />
                  {formSuccess}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Title <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300" 
                    value={editForm.title} 
                    onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} 
                    placeholder="e.g. Dairy Business Q&A Session" 
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Description</label>
                  <textarea 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 resize-none" 
                    rows="3"
                    value={editForm.description} 
                    onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} 
                    placeholder="Brief description of what will be covered in this session..." 
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                    <input 
                      required 
                      type="date" 
                      className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300" 
                      value={editForm.date} 
                      onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))} 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Time <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <FaClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                    <input 
                      required 
                      type="time" 
                      className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300" 
                      value={editForm.time} 
                      onChange={e => setEditForm(f => ({ ...f, time: e.target.value }))} 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Type</label>
                  <select 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300" 
                    value={editForm.type} 
                    onChange={e => setEditForm(f => ({ ...f, type: e.target.value }))}
                  >
                    {MEETING_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Duration</label>
                  <input 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300" 
                    value={editForm.duration} 
                    onChange={e => setEditForm(f => ({ ...f, duration: e.target.value }))} 
                    placeholder="e.g. 1h 30m" 
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Language</label>
                  <select 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300" 
                    value={editForm.language} 
                    onChange={e => setEditForm(f => ({ ...f, language: e.target.value }))}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Urdu">Urdu</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Topics <span className="text-gray-400 text-sm">(comma separated)</span></label>
                  <input 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300" 
                    value={editForm.topics} 
                    onChange={e => setEditForm(f => ({ ...f, topics: e.target.value }))} 
                    placeholder="e.g. loans, subsidies, insurance, best practices" 
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Expert Name</label>
                  <div className="relative">
                    <FaUserTie className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                    <input 
                      className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300" 
                      value={editForm.expert} 
                      onChange={e => setEditForm(f => ({ ...f, expert: e.target.value }))} 
                      placeholder="Expert's name" 
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Join URL</label>
                  <div className="relative">
                    <FaLink className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                    <input 
                      className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300" 
                      value={editForm.joinUrl} 
                      onChange={e => setEditForm(f => ({ ...f, joinUrl: e.target.value }))} 
                      placeholder="https://meet.google.com/..." 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white p-6 rounded-b-3xl border-t border-gray-100">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 w-full text-lg flex items-center justify-center gap-2 transform hover:scale-105" 
                disabled={editing}
              >
                {editing && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>}
                {editing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Attendees Modal */}
      {showAttendeesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-green-200/60 via-white/80 to-green-100/60 backdrop-blur-sm"></div>
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full opacity-30 blur-2xl animate-float" style={{zIndex:1}}></div>
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-2xl animate-fadeIn flex flex-col max-h-[90vh] border border-green-100">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-t-3xl">
              <button type="button" className="absolute top-6 right-6 text-white hover:text-gray-200 text-2xl transition-colors" onClick={() => setShowAttendeesModal(false)}>
                <FaTimes />
              </button>
              <h2 className="text-3xl font-extrabold text-center">Meeting Attendees</h2>
              <p className="text-center opacity-90 mt-2">View registered participants</p>
            </div>
            
            <div className="overflow-y-auto px-8 py-6 flex-1">
              {sessionAttendees.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mb-4">
                    <FaRegUser className="text-gray-500 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-600 mb-2">No attendees yet</h3>
                  <p className="text-gray-500">Participants will appear here once they register</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sessionAttendees.map((attendee, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white text-lg font-bold">
                            {getInitials(attendee.name)}
                          </span>
                          <div>
                            <h4 className="font-bold text-gray-800 text-lg">{attendee.name}</h4>
                            <p className="text-gray-600">{attendee.email}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          attendee.experience === 'expert' ? 'bg-purple-100 text-purple-800' :
                          attendee.experience === 'advanced' ? 'bg-blue-100 text-blue-800' :
                          attendee.experience === 'intermediate' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {attendee.experience}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-600">Phone:</span>
                          <p className="text-gray-800">{attendee.phone}</p>
                        </div>
                        {attendee.organization && (
                          <div>
                            <span className="font-semibold text-gray-600">Organization:</span>
                            <p className="text-gray-800">{attendee.organization}</p>
                          </div>
                        )}
                      </div>
                      
                      {attendee.questions && (
                        <div className="mt-4">
                          <span className="font-semibold text-gray-600">Questions:</span>
                          <p className="text-gray-800 mt-1">{attendee.questions}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="sticky bottom-0 bg-white p-6 rounded-b-3xl border-t border-gray-100">
              <button 
                type="button" 
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 w-full text-lg flex items-center justify-center gap-2 transform hover:scale-105" 
                onClick={() => setShowAttendeesModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Notifications */}
      {actionError && (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-fadeIn flex items-center gap-3 max-w-md">
          <FaExclamationCircle className="text-xl" />
          <span className="font-semibold">{actionError}</span>
          <button 
            onClick={() => setActionError('')} 
            className="ml-auto text-white hover:text-gray-200"
          >
            <FaTimes />
          </button>
        </div>
      )}
      
      {actionSuccess && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-fadeIn flex items-center gap-3 max-w-md">
          <FaCheckCircle className="text-xl" />
          <span className="font-semibold">{actionSuccess}</span>
          <button 
            onClick={() => setActionSuccess('')} 
            className="ml-auto text-white hover:text-gray-200"
          >
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
};

export default QASessions;