import React, { useEffect, useState, useRef, useContext } from 'react';
import api from '../Authorisation/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import AuthContext from '../Authorisation/AuthProvider';
import NavBar from '../components/NavBar';
import { Plus, Search, Users, MessageSquare, Send, LogOut, Trash2, ArrowLeft, Info, X } from 'lucide-react';

const API = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080').replace(/\/$/, "");

// --- SOCKET.IO CLIENT SINGLETON ---
let socket;
function getSocket() {
  if (!socket) {
    socket = io(API, { transports: ['websocket'] });
  }
  return socket;
}

const getInitials = (name = "") => {
  if (!name) return "FI";
  const parts = name.trim().split(/\s+/);
  return parts
    .map((p) => (p ? p[0] : ""))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

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
      .then(res => setMessages(res.data))
      .catch(err => console.error("Error fetching messages:", err));

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
      setMessages((prev) => [...prev, res.data]);
      getSocket().emit('sendMessage', { communityId, message: res.data });
      setInput('');
    } catch (err) {
      console.error('Send message error:', err);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 flex-1 overflow-hidden">
      {/* Scrollable messages area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
            <MessageSquare className="w-12 h-12 text-green-200 mb-2 animate-pulse" />
            <p className="text-sm font-medium text-gray-500">No messages yet.</p>
            <p className="text-xs text-gray-400">Be the first to start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isMe = msg.userId === userId;
            return (
              <div
                key={i}
                className={`flex gap-3 max-w-[80%] md:max-w-[70%] ${isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {!isMe && (
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-xs text-green-700 shadow-sm flex-shrink-0">
                    {getInitials(msg.userName || 'User')}
                  </div>
                )}
                <div className="flex flex-col">
                  {!isMe && (
                    <span className="text-[10px] font-semibold text-green-800 ml-1 mb-1 block">
                      {msg.userName || 'User'}
                    </span>
                  )}
                  <div
                    className={`px-4 py-2.5 shadow-sm rounded-2xl ${
                      isMe
                        ? 'bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-tr-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`text-[8px] block text-right mt-1 ${
                        isMe ? 'text-green-100' : 'text-gray-400'
                      }`}
                    >
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="p-3 md:p-4 bg-white border-t border-gray-200 flex gap-2 items-center">
        <input
          type="text"
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="p-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-md transition-all duration-200 active:scale-95 flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const DiscussionForums = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.id || user?._id;
  const userName = user?.name || user?.fullName || user?.username || user?.email || "User";

  const [communities, setCommunities] = useState([]);
  const [joined, setJoined] = useState(new Set());
  const [activeChat, setActiveChat] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [sidebarTab, setSidebarTab] = useState('joined'); // 'joined' or 'explore'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states
  const [newForumName, setNewForumName] = useState('');
  const [newForumDesc, setNewForumDesc] = useState('');

  const fetchCommunities = () => {
    api.get('/api/communities')
      .then(res => setCommunities(res.data))
      .catch(err => console.error("Error fetching communities:", err));
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  useEffect(() => {
    if (!userId) {
      setJoined(new Set());
      return;
    }
    const joinedSet = new Set(
      communities
        .filter(forum => forum.members && forum.members.includes(userId))
        .map(forum => forum._id)
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
      setCommunities(prev =>
        prev.map(forum =>
          forum._id === id
            ? { ...forum, members: [...(forum.members || []), userId] }
            : forum
        )
      );
      setActiveChat(id);
      setSidebarTab('joined');
      toast.success('Joined the forum!');
    } catch (err) {
      console.error('Join error:', err);
      toast.error('Failed to join community. Please try again.');
    }
  };

  const handleLeave = async (id) => {
    try {
      await api.post(`/api/communities/${id}/leave`, { userId });
      setCommunities(prev =>
        prev.map(forum =>
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

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error('Please sign in to create a community.');
      return;
    }
    try {
      const res = await api.post('/api/communities', {
        name: newForumName,
        description: newForumDesc,
        owner: userId
      });
      setCommunities(prev => [...prev, res.data]);
      setNewForumName('');
      setNewForumDesc('');
      setIsCreateModalOpen(false);
      setActiveChat(res.data._id);
      setSidebarTab('joined');
      toast.success('Community created!');
    } catch (err) {
      console.error('Community creation error:', err);
      toast.error('Failed to create community. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this forum? This cannot be undone.")) {
      try {
        await api.delete(`/api/communities/${id}`, { data: { userId } });
        setCommunities(prev => prev.filter(forum => forum._id !== id));
        setActiveChat(null);
        toast.success('Forum deleted!');
      } catch (err) {
        console.error('Delete error:', err);
        toast.error('Failed to delete community. Please try again.');
      }
    }
  };

  const joinedCommunities = communities.filter(forum => joined.has(forum._id));
  const notJoinedCommunities = communities.filter(forum => !joined.has(forum._id));

  const filteredCommunities = (sidebarTab === 'joined' ? joinedCommunities : notJoinedCommunities)
    .filter(forum => 
      forum.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
      (forum.description && forum.description.toLowerCase().includes(searchFilter.toLowerCase()))
    );

  const activeForum = communities.find(f => f._id === activeChat);

  return (
    <>
      <NavBar />
      <div className="pt-16 bg-slate-50 min-h-screen flex flex-col font-[Outfit] overflow-hidden select-none">
        
        {/* Main Dashboard Panel */}
        <div className="flex-1 flex h-[calc(100vh-4rem)] overflow-hidden relative">
          
          {/* LEFT SIDEBAR: Forum List */}
          <div className={`w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 ${activeChat ? 'hidden md:flex' : 'flex'}`}>
            
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-green-950">Discussion Forums</h1>
                <p className="text-xs text-gray-500">Connect with local advisors</p>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="p-2 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 hover:scale-105 active:scale-95 transition-all shadow-sm border border-green-100"
                title="Create New Forum"
              >
                <Plus className="w-5 h-5 font-bold" />
              </button>
            </div>

            {/* Sidebar Search */}
            <div className="px-4 py-2 relative">
              <input
                type="text"
                placeholder="Search forums..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-transparent rounded-xl focus:border-green-300 focus:bg-white focus:outline-none transition-all text-xs text-gray-700 placeholder-gray-400"
              />
              <Search className="absolute left-7 top-4.5 w-3.5 h-3.5 text-gray-400" />
            </div>

            {/* Sidebar Navigation Tabs */}
            <div className="flex px-4 pb-2 pt-1 border-b border-gray-100 gap-2">
              <button
                onClick={() => setSidebarTab('joined')}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  sidebarTab === 'joined' 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                Joined ({joinedCommunities.length})
              </button>
              <button
                onClick={() => setSidebarTab('explore')}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  sidebarTab === 'explore' 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                Explore ({notJoinedCommunities.length})
              </button>
            </div>

            {/* Scrollable Forum items */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredCommunities.length === 0 ? (
                <div className="text-center text-gray-400 py-8 px-4">
                  <Info className="w-8 h-8 mx-auto text-gray-300 mb-1" />
                  <p className="text-xs">No forums found in this tab.</p>
                </div>
              ) : (
                filteredCommunities.map(forum => {
                  const isActive = activeChat === forum._id;
                  return (
                    <button
                      key={forum._id}
                      onClick={() => setActiveChat(forum._id)}
                      className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all duration-200 group border ${
                        isActive 
                          ? 'bg-green-50/70 border-green-200 shadow-sm' 
                          : 'bg-white border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0 transition-all ${
                        isActive ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'
                      }`}>
                        {getInitials(forum.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className={`font-semibold text-xs truncate ${isActive ? 'text-green-800' : 'text-gray-800'}`}>
                            {forum.name}
                          </h4>
                          {forum.members && (
                            <span className="text-[9px] text-gray-400 flex items-center gap-0.5 flex-shrink-0 ml-1">
                              <Users className="w-2.5 h-2.5" /> {forum.members.length}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500 truncate">{forum.description}</p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT VIEW: Chat or Empty State */}
          <div className={`flex-1 flex flex-col bg-slate-50 transition-all duration-300 ${activeChat ? 'flex' : 'hidden md:flex'}`}>
            
            {activeForum ? (
              <>
                {/* Chat Panel Header */}
                <div className="h-16 border-b border-gray-200 bg-white px-4 flex items-center justify-between z-10 shadow-sm flex-shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <button 
                      onClick={() => setActiveChat(null)} 
                      className="md:hidden p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors mr-1 flex-shrink-0"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
                      {getInitials(activeForum.name)}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-sm font-bold text-gray-800 truncate">{activeForum.name}</h2>
                      <p className="text-[10px] text-gray-500 truncate">{activeForum.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Delete button for owners */}
                    {userId === activeForum.owner && (
                      <button
                        onClick={() => handleDelete(activeForum._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                        title="Delete Forum"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    )}

                    {/* Joined actions */}
                    {joined.has(activeForum._id) ? (
                      <button
                        onClick={() => handleLeave(activeForum._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 hover:border-amber-300 rounded-lg transition-colors font-semibold shadow-sm"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Leave Forum</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleJoin(activeForum._id)}
                        className="flex items-center gap-1.5 px-4 py-1.5 text-xs text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-bold shadow-sm"
                      >
                        Join Forum
                      </button>
                    )}
                  </div>
                </div>

                {/* Panel Body: Chat Messages or Invite Splash */}
                {joined.has(activeForum._id) ? (
                  <CommunityChat communityId={activeForum._id} userId={userId} userName={userName} />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl max-w-md w-full text-center space-y-6">
                      <div className="h-16 w-16 mx-auto rounded-full bg-green-50 text-green-700 flex items-center justify-center font-bold text-2xl shadow-inner">
                        {getInitials(activeForum.name)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{activeForum.name}</h3>
                        <p className="text-xs text-gray-500 mt-2">{activeForum.description}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-green-600" />
                          {activeForum.members ? activeForum.members.length : 0} members
                        </span>
                      </div>
                      <button
                        onClick={() => handleJoin(activeForum._id)}
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-xl font-bold shadow-md transition-all active:scale-98"
                      >
                        Join this Discussion Forum
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none bg-slate-50">
                <div className="max-w-md space-y-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-green-200 rounded-full filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="relative h-20 w-20 bg-white shadow-xl rounded-2xl flex items-center justify-center text-green-600 border border-green-100">
                      <MessageSquare className="w-10 h-10" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-950">Welcome to FinAdvise Forums</h3>
                    <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                      Select a discussion community from the left menu to start talking, or create your own community to share agricultural and financial knowledge.
                    </p>
                  </div>
                  <button
                    onClick={() => setSidebarTab('explore')}
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl shadow-md transition-all duration-200 active:scale-95"
                  >
                    Explore Communities
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MODAL: Create Community */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-green-100 relative">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <h3 className="text-lg font-bold text-green-950 mb-1">Create Community</h3>
              <p className="text-xs text-gray-500 mb-4">Start a new discussion forum to invite and advise members.</p>
              
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Forum Name</label>
                  <input
                    type="text"
                    required
                    value={newForumName}
                    onChange={e => setNewForumName(e.target.value)}
                    placeholder="e.g. Subsidy Application Guidance"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all text-xs text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                  <textarea
                    required
                    rows="3"
                    value={newForumDesc}
                    onChange={e => setNewForumDesc(e.target.value)}
                    placeholder="Provide a brief summary of what this community discusses..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all text-xs text-gray-700 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-xl font-bold shadow-md transition-all active:scale-98 text-xs"
                >
                  Create Forum
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DiscussionForums;