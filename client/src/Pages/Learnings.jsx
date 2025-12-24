import React, { useState, useEffect } from "react";
import { Search, IndianRupee, Users, Home, Star } from "lucide-react";
import NavBar from "../components/NavBar";

// Animation CSS (add to the top of this file for local styles)
const fadeInUpStyle = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fadeInUp {
  animation: fadeInUp 0.5s cubic-bezier(.4,0,.2,1);
}
`;

const Card = ({ children, className = "", style = {} }) => (
  <div
    className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${className}`}
    style={style}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold mb-2 group-hover:text-green-700 transition ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-gray-600 text-sm ${className}`}>{children}</p>
);

const LearningCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    "financial literacy for low income families"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [activeTag, setActiveTag] = useState(1);

  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const RESULTS_PER_PAGE = 9;

  // Quick search categories with icons and search terms
  const quickSearchTags = [
    {
      id: 1,
      icon: <IndianRupee size={16} />,
      label: "Budgeting Basics",
      searchTerm: "how to budget for low income",
    },
    {
      id: 2,
      icon: <Star size={16} />,
      label: "Saving Money",
      searchTerm: "saving tips for poor families India",
    },
    {
      id: 3,
      icon: <Users size={16} />,
      label: "Self-Help Groups",
      searchTerm: "self help groups India benefits",
    },
    {
      id: 4,
      icon: <Home size={16} />,
      label: "Govt Schemes",
      searchTerm: "government schemes for poor in India",
    },
    {
      id: 5,
      icon: <Search size={16} />,
      label: "Financial Literacy",
      searchTerm: "financial education for poor families India",
    },
  ];

  // Helper: Fetch videos from YouTube API
  const fetchVideos = async (searchTerm = "", pageToken = "") => {
    if (!YOUTUBE_API_KEY) {
      setError("YouTube API key is missing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet&` +
          `maxResults=${RESULTS_PER_PAGE}&` +
          `q=${encodeURIComponent(searchTerm)}&` +
          `type=video&` +
          `pageToken=${pageToken}&` +
          `key=${YOUTUBE_API_KEY}`
      );

      if (!searchResponse.ok) {
        throw new Error("Failed to fetch videos");
      }

      const searchData = await searchResponse.json();
      if (!searchData.items) throw new Error("No videos found");

      const videoIds = searchData.items.map((item) => item.id.videoId);

      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
          `part=contentDetails,statistics&` +
          `id=${videoIds.join(",")}&` +
          `key=${YOUTUBE_API_KEY}`
      );

      if (!detailsResponse.ok) {
        throw new Error("Failed to fetch video details");
      }

      const detailsData = await detailsResponse.json();

      const enhancedVideos = searchData.items.map((item) => {
        const details = detailsData.items.find(
          (detail) => detail.id === item.id.videoId
        );
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          channelTitle: item.snippet.channelTitle,
          duration: details?.contentDetails?.duration || "N/A",
          viewCount: details?.statistics?.viewCount || "N/A",
        };
      });

      setVideos(pageToken ? [...videos, ...enhancedVideos] : enhancedVideos);
      setNextPageToken(searchData.nextPageToken || null);
    } catch (error) {
      setError(error.message || "Error fetching videos");
    } finally {
      setLoading(false);
    }
  };

  // Effect: Initial fetch
  useEffect(() => {
    fetchVideos(searchQuery);
    // eslint-disable-next-line
  }, []);

  const handleQuickSearch = (tag) => {
    setActiveTag(tag.id === activeTag ? null : tag.id);
    setSearchQuery(tag.searchTerm);
    fetchVideos(tag.searchTerm);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(searchQuery);
  };

  // Helper: Format ISO 8601 duration to mm:ss or hh:mm:ss
  const formatDuration = (isoDuration) => {
    if (!isoDuration || isoDuration === "N/A") return "";
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "";
    const [, h, m, s] = match.map((v) => parseInt(v) || 0);
    if (h) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Inject animation CSS */}
      <style>{fadeInUpStyle}</style>
      <NavBar language="en" toggleLanguage={() => {}} />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-100 to-green-300 text-white py-12 pt-24 shadow-inner">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl text-green-700 font-extrabold mb-4 drop-shadow-lg">
            Finance Learning Hub
          </h1>
          <p className="text-lg text-green-700 mb-2">
            Free resources to empower low-income families with financial knowledge.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 relative max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search financial topics..."
              className="w-full py-4 pl-12 pr-4 rounded-lg text-gray-700 shadow focus:ring-2 focus:ring-green-400 border border-green-200 transition"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              Search
            </button>
          </form>

          {/* Quick Search Tags */}
          <div className="mt-6 flex flex-wrap gap-3">
            {quickSearchTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleQuickSearch(tag)}
                className={`flex items-center px-4 py-2 rounded-full border shadow transition-all duration-200
                  ${activeTag === tag.id
                    ? "bg-white text-green-700 border-green-400 scale-105"
                    : "bg-green-600 text-white border-green-600 hover:bg-green-700"
                  }`}
              >
                {tag.icon}
                <span className="ml-2 font-medium">{tag.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 shadow animate-fadeInUp">
            {error}
          </div>
        )}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, idx) => (
            <Card
              key={video.id}
              className="group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-green-100 animate-fadeInUp"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow">
                    {formatDuration(video.duration)}
                  </span>
                </div>
                <CardHeader>
                  <CardTitle>{video.title}</CardTitle>
                  <CardDescription>
                    {video.description.length > 100
                      ? video.description.slice(0, 100) + "..."
                      : video.description}
                  </CardDescription>
                  <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-2">
                    <span>{video.channelTitle}</span>
                    <span>• {video.publishedAt}</span>
                    {video.viewCount !== "N/A" && (
                      <span>• {parseInt(video.viewCount).toLocaleString()} views</span>
                    )}
                  </div>
                </CardHeader>
              </a>
            </Card>
          ))}
        </div>
        {!loading && videos.length === 0 && (
          <div className="text-center text-gray-500 mt-12 animate-fadeInUp">
            No videos found for this topic.
          </div>
        )}
      </div>
    </div>
  );
};


export default LearningCenter;