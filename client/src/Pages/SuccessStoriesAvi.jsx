import React, { useState, useEffect, useContext } from "react";
import women1 from "./women1.webp";
import women2 from "./women2.jpg";
import man1 from "./man1.jpg";
import man2 from "./man2.jpg";
import defaultStories from "./defaultStories";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from '../Authorisation/AuthProvider';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/success-stories`;

const avatarColors = [
  "bg-green-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-orange-500",
];

function getAvatarColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return avatarColors[hash % avatarColors.length];
}

const featuredStory = {
  title: "From Small Farm to Thriving Business",
  author: "Maya Patel",
  summary:
    "Maya Patel shares her inspiring journey of transforming a small farm into a successful organic produce business, overcoming financial and operational challenges along the way.",
  fullStory:
    "Maya Patel began her journey with just a half-acre plot inherited from her family in rural Gujarat. With limited resources and no formal agricultural training, she faced numerous challenges including poor soil quality, unpredictable weather, and lack of market access. Determined to succeed, Maya researched organic farming techniques online and attended local workshops. She implemented sustainable practices like crop rotation, composting, and rainwater harvesting, which gradually improved her yields. To overcome financial hurdles, she secured a small loan and invested in a drip irrigation system, significantly reducing water costs. Maya then leveraged social media to market her organic vegetables directly to consumers, building a loyal customer base. Within three years, her business expanded to supply organic produce to supermarkets in three nearby cities, employing 15 local workers and inspiring other farmers in her community to adopt organic methods.",
};

const defaultThumbnails = [women1, women2, man1, man2];

const SuccessStories = () => {
  const { user } = useContext(AuthContext);
  const currentUserName = user?.name || user?.email || "Unknown User";
  const currentUserId = user?._id || "";

  const [stories, setStories] = useState([]);
  const [likedStories, setLikedStories] = useState({});
  const [showFeaturedFullStory, setShowFeaturedFullStory] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [videoUrl, setVideoUrl] = useState(null);

  // Modal state for adding a story
  const [showModal, setShowModal] = useState(false);
  const [newStory, setNewStory] = useState({
    title: "",
    author: currentUserName,
    authorId: currentUserId,
    region: "",
    sector: "",
    challenge: "",
    summary: "",
    fullStory: "",
    keyLessons: "",
    thumbnail: "",
  });
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch backend stories
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStories(data);
        } else {
          setStories([]);
        }
      })
      .catch(() => {
        setStories([]);
        setError("Failed to load stories from backend.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Update author and authorId if user changes (e.g. after login)
  useEffect(() => {
    setNewStory((prev) => ({
      ...prev,
      author: currentUserName,
      authorId: currentUserId,
    }));
  }, [currentUserName, currentUserId]);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStory((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload (for thumbnail)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewStory((prev) => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new story (POST to backend)
  const handleAddStory = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);

    if (!newStory.thumbnail) {
      setError("Please upload a photo for your story.");
      setFormLoading(false);
      return;
    }

    try {
      const storyToSend = {
        ...newStory,
        authorId: currentUserId,
        keyLessons: newStory.keyLessons
          ? newStory.keyLessons.split(",").map((k) => k.trim())
          : [],
        thumbnail: newStory.thumbnail,
        likes: 0,
        views: 0,
        date: new Date().toLocaleDateString(),
        hasVideo: false,
      };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyToSend),
      });
      if (!res.ok) throw new Error("Failed to save story");
      const saved = await res.json();
      setStories((prev) => [saved, ...prev]);
      setShowModal(false);
      setNewStory({
        title: "",
        author: currentUserName,
        authorId: currentUserId,
        region: "",
        sector: "",
        challenge: "",
        summary: "",
        fullStory: "",
        keyLessons: "",
        thumbnail: "",
      });
      toast.success("Story submitted successfully!");
    } catch (err) {
      setError("Could not save story. Try again.");
      toast.error("Could not save story. Try again.");
    } finally {
      setFormLoading(false);
    }
  };

  // Delete story (only if owner, and only for backend stories)
  const handleDeleteStory = async (storyId) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      const res = await fetch(`${API_URL}/${storyId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete story");
      setStories((prev) => prev.filter((s) => (s._id || s.id) !== storyId));
      toast.success("Story deleted!");
    } catch (err) {
      toast.error("Could not delete story.");
    }
  };

  const toggleLike = (id) => {
    setLikedStories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    toast("Thanks for your feedback!", { icon: "👍", duration: 1200 });
  };

  // Always show default stories + backend stories
  const allStories = [...defaultStories, ...stories];

  // Filter stories based on selected criteria
  const filteredStories = allStories.filter((story) => {
    if (filterCriteria === "all") return true;
    if (filterCriteria.startsWith("sector-")) {
      return story.sector === filterCriteria.split("sector-")[1];
    }
    if (filterCriteria.startsWith("region-")) {
      return story.region === filterCriteria.split("region-")[1];
    }
    if (filterCriteria.startsWith("challenge-")) {
      return story.challenge === filterCriteria.split("challenge-")[1];
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 relative overflow-x-hidden">
      <Toaster position="top-right" />
      {/* Floating SVG background for extra visual effect */}
      <svg
        className="fixed left-0 top-0 z-0 opacity-20 pointer-events-none"
        width="100vw"
        height="100vh"
        style={{ minWidth: "100vw", minHeight: "100vh" }}
      >
        <defs>
          <radialGradient id="bg-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="100%" stopColor="#38bdf8" />
          </radialGradient>
        </defs>
        <ellipse
          cx="60%"
          cy="10%"
          rx="400"
          ry="180"
          fill="url(#bg-grad)"
          filter="blur(80px)"
        />
      </svg>

      {/* Subtle background pattern */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10" style={{background: "url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png') repeat"}}></div>

      {/* Responsive Floating Add Story Button (FAB) */}
      <button
        className={`
          fixed z-50 flex items-center justify-center
          bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-2xl
          rounded-full border-4 border-white
          transition-all duration-200
          hover:scale-110 active:scale-95
          overflow-hidden ripple
          add-story-fab
        `}
        onClick={(e) => {
          setShowModal(true);
          // Ripple effect
          const btn = e.currentTarget;
          const circle = document.createElement("span");
          circle.className = "ripple-effect";
          circle.style.left = `${e.nativeEvent.offsetX}px`;
          circle.style.top = `${e.nativeEvent.offsetY}px`;
          btn.appendChild(circle);
          setTimeout(() => circle.remove(), 600);
        }}
        title="Add Story"
        aria-label="Add Story"
      >
        <span className="text-3xl md:text-2xl">+</span>
        <span className="hidden md:inline ml-2 font-bold text-lg pr-2">Add Story</span>
      </button>
      {/* Responsive FAB styles */}
      <style>{`
        .add-story-fab {
          width: 56px;
          height: 56px;
          bottom: 24px;
          right: 24px;
          font-size: 2rem;
        }
        @media (min-width: 768px) {
          .add-story-fab {
            width: auto;
            height: auto;
            padding: 0.5rem 1.5rem;
            top: 1.5rem;
            bottom: auto;
            right: 2rem;
            font-size: 1.25rem;
          }
        }
      `}</style>

{showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in" style={{background: "rgba(255,255,255,0.7)", backdropFilter: "blur(2px)"}}>
    <form
      className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-200 p-0 flex flex-col md:flex-row"
      onSubmit={handleAddStory}
    >
      {/* Left Side: Inputs */}
      <div className="flex-1 p-8 flex flex-col justify-center">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
            <span role="img" aria-label="star">🌱</span> Share Your Success Story
          </h2>
          <button
            type="button"
            className="text-gray-400 hover:text-red-500 text-2xl"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Title</label>
            <input
              name="title"
              placeholder="Story Title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              value={newStory.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Your Name</label>
            <input
              name="author"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              value={newStory.author}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-green-800 mb-1">Region</label>
              <input
                name="region"
                placeholder="Region (e.g. Gujarat)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                value={newStory.region}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-green-800 mb-1">Sector</label>
              <input
                name="sector"
                placeholder="Sector (e.g. farming, dairy)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                value={newStory.sector}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Main Challenge</label>
            <input
              name="challenge"
              placeholder="Main Challenge (e.g. savings)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              value={newStory.challenge}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Short Summary</label>
            <input
              name="summary"
              placeholder="Short Summary"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              value={newStory.summary}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>
      {/* Right Side: Textarea, Lessons, Photo, Submit */}
      <div className="flex-1 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200">
        <div className="space-y-4 flex-1 flex flex-col">
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Full Story</label>
            <textarea
              name="fullStory"
              placeholder="Full Story"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              value={newStory.fullStory}
              onChange={handleInputChange}
              required
              rows={5}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Key Lessons <span className="text-xs text-gray-400">(comma separated)</span>
            </label>
            <input
              name="keyLessons"
              placeholder="Key Lessons (comma separated)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              value={newStory.keyLessons}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Photo <span className="text-xs text-gray-400">(required)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={handleFileChange}
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-center">{error}</div>
          )}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg shadow transition text-base flex items-center gap-2"
            disabled={formLoading}
          >
            <span role="img" aria-label="send">🚀</span>
            {formLoading ? "Submitting..." : "Submit Story"}
          </button>
        </div>
      </div>
    </form>
  </div>
)}


      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
        <h1 className="text-5xl font-extrabold text-center text-green-700 mb-4 drop-shadow-lg tracking-tight animate-fade-in">
          🌟 Success Stories
        </h1>
        <div className="flex justify-center mb-10">
          <div className="w-32 border-b-4 border-green-400"></div>
        </div>

        {/* Featured Story */}
        <div className="bg-gradient-to-r from-green-200 via-white to-blue-200 rounded-3xl shadow-2xl mb-16 flex flex-col md:flex-row overflow-hidden border-4 border-green-300 animate-fade-in">
          <div className="md:w-1/2">
            <img
              src={women1}
              alt="Featured"
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <span className="bg-green-600 text-white text-xs px-4 py-1 rounded-full mb-3 w-max font-bold shadow">
              FEATURED
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
              {featuredStory.title}
            </h2>
            <p className="text-gray-700 mb-4">{featuredStory.summary}</p>
            {showFeaturedFullStory && (
              <p className="text-gray-800 mb-4">{featuredStory.fullStory}</p>
            )}
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition w-max shadow"
              onClick={() => setShowFeaturedFullStory((v) => !v)}
            >
              {showFeaturedFullStory ? "Hide Full Story" : "Read Full Story"}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { label: "All", value: "all" },
            { label: "Farming", value: "sector-farming" },
            { label: "Dairy", value: "sector-dairy" },
            { label: "Small Business", value: "sector-small-business" },
            { label: "Gujarat", value: "region-Gujarat" },
            { label: "Punjab", value: "region-Punjab" },
            { label: "Rajasthan", value: "region-Rajasthan" },
            { label: "Loan Application", value: "challenge-loan-application" },
            { label: "Savings", value: "challenge-savings" },
            { label: "Digital Adoption", value: "challenge-digital-adoption" },
          ].map((f) => (
            <button
              key={f.value}
              className={`px-4 py-2 rounded-full font-semibold border-2 transition-all duration-200 ${
                filterCriteria === f.value
                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white border-green-500 scale-105 shadow"
                  : "bg-white text-green-700 border-green-200 hover:bg-green-100"
              }`}
              onClick={() => setFilterCriteria(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        {loading ? (
          <div className="text-center text-green-700 text-xl py-12 animate-pulse">Loading stories...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">{error}</div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredStories.length > 0 ? (
              filteredStories.map((story, idx) => {
                const storyId = story._id || story.id;
                const isOwner =
                  !!user &&
                  !!story.authorId &&
                  !!user._id &&
                  story.authorId === user._id;
                const isBackendStory = !!story._id;
                return (
                  <div
                    key={storyId}
                    className="bg-white rounded-2xl shadow-xl border-2 border-green-100 hover:shadow-green-400/60 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="relative">
                      <img
                        src={story.thumbnail}
                        alt={story.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
                          {story.sector}
                        </span>
                        <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {story.region}
                        </span>
                      </div>
                      {isOwner && isBackendStory && (
                        <button
                          className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-3 py-1 text-xs font-bold shadow hover:bg-red-700 transition"
                          onClick={() => handleDeleteStory(storyId)}
                          title="Delete Story"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white ${getAvatarColor(
                            story.author
                          )} shadow`}
                        >
                          {(story.author || "U")[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-green-800">
                            {story.author}
                          </div>
                          <div className="text-xs text-gray-400">{story.date}</div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-green-700 mb-1">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{story.summary}</p>
                      <div className="mb-2">
                        <span className="font-semibold text-green-700">
                          Key Lessons:
                        </span>
                        <ul className="list-disc list-inside text-gray-600 text-sm mt-1">
                          {(story.keyLessons || []).map((lesson, idx) => (
                            <li key={idx}>{lesson}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="text-gray-500 text-xs flex items-center gap-1">
                          👀 {story.views || 0} views
                        </span>
                        <button
                          className={`text-xl transition-colors duration-300 ${
                            likedStories[storyId]
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(storyId);
                          }}
                          title="Like"
                        >
                          {likedStories[storyId] ? "❤️" : "🤍"}
                        </button>
                        <span className="text-gray-500 text-xs">
                          {(story.likes || 0) + (likedStories[storyId] ? 1 : 0)} likes
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No stories found.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in">
          <div className="bg-white p-4 rounded-2xl shadow-2xl relative w-11/12 md:w-3/4 lg:w-1/2 border-4 border-green-300">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1 text-xl hover:scale-125 transition"
              onClick={() => setVideoUrl(null)}
            >
              ✖
            </button>
            <iframe
              width="100%"
              height="350"
              src={videoUrl}
              title="Success Story Video"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}

      {/* Animations and Effects */}
      <style>{`
        .animate-fade-in {
          animation: fadeInUp 0.7s both;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .glass {
          background: rgba(255,255,255,0.85);
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.15);
          backdrop-filter: blur(8px);
        }
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background-color: rgba(255,255,255,0.7);
          pointer-events: none;
          width: 120px;
          height: 120px;
          z-index: 10;
        }
        @keyframes ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessStories;