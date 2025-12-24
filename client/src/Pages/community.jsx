import React, { useEffect, useState, useRef, useContext } from 'react';
import api from '../Authorisation/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import AuthContext from '../Authorisation/AuthProvider';

const API = process.env.REACT_APP_BACKEND_URL;

// --- SOCKET.IO CLIENT SINGLETON ---
let socket;
function getSocket() {
  if (!socket) {
    socket = io(API, { transports: ['websocket'] });
  }
  return socket;
}

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const CommunityChat = ({ communityId, userId, userName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Join the community room
    const s = getSocket();
    s.emit('joinCommunity', communityId);

    // Fetch initial messages
    api.get(`/api/communities/${communityId}/messages`)
      .then(res => setMessages(res.data));

    // Listen for new messages
    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    s.on('newMessage', handleNewMessage);

    return () => {
      s.off('newMessage', handleNewMessage);
    };
  }, [communityId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const res = await api.post(`/api/communities/${communityId}/messages`, { userId, userName, text: input });
      setMessages([...messages, res.data]);
      getSocket().emit('sendMessage', { communityId, message: res.data });
      setInput('');
    } catch (err) {
      console.error('Send message error:', err);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="border-t mt-4 pt-4">
      <h4 className="font-bold mb-2 text-green-700">Community Chat</h4>
      <div className="h-48 overflow-y-auto bg-gray-50 p-3 mb-2 rounded shadow-inner space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-green-100 text-green-700 font-bold text-xs">
              {getInitials(msg.userName || 'U')}
            </span>
            <span>
              <span className="font-semibold text-green-800">{msg.userName || 'User'}:</span>{" "}
              <span className="text-gray-700">{msg.text}</span>
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 sticky bottom-0 bg-white py-2">
        <input
          className="border px-2 py-1 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-green-300"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition text-white px-4 py-1 rounded shadow font-semibold"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const CommunityForm = ({ onCreate, userId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate userId
    if (!userId) {
      toast.error('Please sign in to create a community.');
      return;
    }
    
    try {
      const res = await api.post('/api/communities', { name, description, owner: userId });
      onCreate(res.data);
      setName('');
      setDescription('');
      toast.success('Community created!');
    } catch (err) {
      console.error('Community creation error:', err);
      if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Failed to create community. Please try again.');
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mb-12 bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-green-100">
        <h2 className="text-3xl font-bold mb-4 text-green-800 text-center">Create New Community</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input className="border p-3 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-green-300" value={name} onChange={e => setName(e.target.value)} placeholder="Title" required />
          <input className="border p-3 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-green-300" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
        </div>
        <button className="relative overflow-hidden bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition text-white px-8 py-2 rounded font-bold shadow group" type="submit">
          <span className="absolute inset-0 opacity-0 group-active:opacity-20 bg-white transition"></span>
          Create
        </button>
      </form>
      {/* ToastContainer removed - using the one from App.js */}
    </>
  );
};

const DiscussionForums = () => {
  const { user } = useContext(AuthContext);
  // Extract user ID with fallbacks for different ID formats
  const userId = user?.id || user?._id;
  const userName = user?.name || user?.fullName || user?.username || user?.email || "User";

  const [communities, setCommunities] = useState([]);
  const [joined, setJoined] = useState(new Set());
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    api.get('/api/communities').then(res => setCommunities(res.data));
  }, []);

  useEffect(() => {
    if (!userId) {
      setJoined(new Set());
      return;
    }
    const joinedSet = new Set(
      communities.filter(forum => forum.members && forum.members.includes(userId)).map(forum => forum._id)
    );
    setJoined(joinedSet);
  }, [communities, userId]);

  const handleJoin = async (id) => {
    if (!userId) {
      toast.info('Please sign in to join a community.');
      return;
    }
    try {
      await api.post(`/api/communities/${id}/join`, { userId });
      setCommunities(communities =>
        communities.map(forum =>
          forum._id === id
            ? { ...forum, members: [...(forum.members || []), userId] }
            : forum
        )
      );
      setActiveChat(id);
      toast.success('Joined the forum!');
    } catch (err) {
      console.error('Join error:', err);
      toast.error('Failed to join community. Please try again.');
    }
  };

  const handleLeave = async (id) => {
    try {
      await api.post(`/api/communities/${id}/leave`, { userId });
      setCommunities(communities =>
        communities.map(forum =>
          forum._id === id
            ? { ...forum, members: (forum.members || []).filter(uid => uid !== userId) }
            : forum
        )
      );
      setActiveChat(null);
      toast.info('Left the forum.');
    } catch (err) {
      console.error('Leave error:', err);
      toast.error('Failed to leave community. Please try again.');
    }
  };

  const handleCreate = (community) => {
    setCommunities([...communities, community]);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/communities/${id}`, { data: { userId } });
      setCommunities(communities.filter(forum => forum._id !== id));
      setActiveChat(null);
      toast.success('Forum deleted!');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete community. Please try again.');
    }
  };

  // Sort: joined first, then not joined
  const joinedCommunities = communities.filter(forum => joined.has(forum._id));
  const notJoinedCommunities = communities.filter(forum => !joined.has(forum._id));

  // Card rendering function
  const renderForumCard = (forum, isJoined, modalMode = false) => {
    if (!forum) return null;
    const isActive = activeChat === forum._id;
    return (
      <div
        key={forum._id}
        className={`bg-white rounded-2xl shadow-xl p-7 flex flex-col justify-between border border-green-100
          hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group
          ${modalMode ? 'ring-2 ring-green-400 scale-105 z-50 min-w-[350px] max-w-lg w-full' : 'min-h-[220px]'}`}
        style={modalMode ? { maxWidth: 500, width: '100%' } : {}}
      >
        {/* Close icon for modal mode */}
        {modalMode && (
          <button
            className="absolute top-4 right-4 bg-white rounded-full shadow p-1 hover:bg-gray-100 z-10"
            onClick={() => setActiveChat(null)}
            aria-label="Close Chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <span className="absolute inset-0 pointer-events-none rounded-2xl group-hover:bg-gradient-to-tr group-hover:from-green-100 group-hover:to-green-50 group-hover:opacity-80 transition-all duration-300"></span>
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl shadow">
            {getInitials(forum.name)}
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-green-800 mb-1">{forum.name}</h3>
            <p className="text-gray-600">{forum.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4 relative z-10">
          {isJoined ? (
            <>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="relative overflow-hidden bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded transition font-semibold shadow-sm"
                  onClick={() => handleLeave(forum._id)}
                >
                  Leave Forum
                </button>
                {!modalMode && (
                  <button
                    className="relative overflow-hidden bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded transition font-semibold shadow-sm"
                    onClick={() => setActiveChat(forum._id)}
                  >
                    Open Chat
                  </button>
                )}
                {userId === forum.owner && (
                  <button
                    className="relative overflow-hidden bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition font-semibold shadow-sm"
                    onClick={() => handleDelete(forum._id)}
                  >
                    Delete Forum
                  </button>
                )}
              </div>
              {modalMode && isActive && (
                <CommunityChat communityId={forum._id} userId={userId} userName={userName} />
              )}
            </>
          ) : (
            <button
              className="relative overflow-hidden bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded transition font-bold shadow"
              onClick={() => handleJoin(forum._id)}
            >
              Join Forum
            </button>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-white min-h-screen">
      <CommunityForm onCreate={handleCreate} userId={userId} />
      <h1 className="text-5xl font-extrabold text-green-800 mb-12 text-center tracking-tight drop-shadow animate-fade-in">Discussion Forums</h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 items-start">
        {/* Joined communities first */}
        {joinedCommunities.length > 0 && (
          <>
            <div className="col-span-full mb-2">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Joined Communities</h2>
            </div>
            {joinedCommunities.map(forum => renderForumCard(forum, true))}
          </>
        )}
        {/* Not joined communities */}
        {notJoinedCommunities.length > 0 && (
          <>
            <div className="col-span-full mt-6 mb-2">
              <h2 className="text-2xl font-bold text-gray-500 mb-2">Other Communities</h2>
            </div>
            {notJoinedCommunities.map(forum => renderForumCard(forum, false))}
          </>
        )}
      </div>
      {/* Modal for active chat */}
      {activeChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative">
            {renderForumCard(
              communities.find(f => f._id === activeChat),
              joined.has(activeChat),
              true // modalMode
            )}
            <button
              className="absolute top-2 right-2 bg-white rounded-full shadow p-1 hover:bg-gray-100"
              onClick={() => setActiveChat(null)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionForums;