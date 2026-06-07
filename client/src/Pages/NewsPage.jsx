import React, { useState, useEffect } from "react";
import { Search, RefreshCcw, Globe, Briefcase, User } from "lucide-react";
import NavBar from "../components/NavBar";


// Animation CSS for fade-in and card hover
const fadeInStyle = `
@keyframes fadeInUpNews {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fadeInUpNews {
  animation: fadeInUpNews 0.5s cubic-bezier(.4,0,.2,1);
}
`;

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("top");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  const fetchNews = async (type, query = "") => {
    const API_KEY = (process.env.REACT_APP_NEWS_API_KEY && process.env.REACT_APP_NEWS_API_KEY !== "api key for news fetching")
      ? process.env.REACT_APP_NEWS_API_KEY
      : "dbb26f5483df4a01b362c2e2a81db0db";
    const BASE_URL = "https://newsapi.org/v2";

    let url;
    if (query) {
      url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
    } else {
      switch (type) {
        case "top":
          url = `${BASE_URL}/everything?q=finance+AND+India&apiKey=${API_KEY}`;
          break;
        case "entrepreneurs":
          url = `${BASE_URL}/everything?q=finance+OR+investment+OR+savings&apiKey=${API_KEY}`;
          break;
        case "business-hindi":
          url = `${BASE_URL}/everything?q=finance+OR+money+OR+business+OR+investment+OR+saving&language=hi&apiKey=${API_KEY}`;
          break;
        default:
          url = `${BASE_URL}/everything?q=finance+AND+India&apiKey=${API_KEY}`;
      }
    }

    setLoading(true);
    setError(false);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      if (data.status === 'error') {
        throw new Error(data.message || 'API Error');
      }
      // Filter out removed articles and ensure a title exists
      const validArticles = (data.articles || []).filter(
        (article) => article && article.title && article.title !== "[Removed]"
      );
      setArticles(validArticles);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(activeTab);
    // eslint-disable-next-line
  }, [activeTab]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(activeTab, searchQuery);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Animation style injected locally */}
      <style>{fadeInStyle}</style>
      <NavBar language="en" toggleLanguage={() => {}} />

      <div className="min-h-screen bg-gradient-to-br py-16 from-green-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-10 animate-fadeInUpNews">
            <h1 className="text-4xl font-extrabold text-green-900 mb-2 tracking-tight drop-shadow-lg">
              Finance & Business News Hub
            </h1>
            <p className="text-green-700 text-lg">
              Stay informed with real-time finance, investment, and business updates
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 animate-fadeInUpNews">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4 items-center justify-between"
            >
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-green-200 
                         focus:outline-none focus:border-green-500 shadow transition"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 w-5 h-5" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
                >
                  Search
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("top")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
                          ${
                            activeTab === "top"
                              ? "bg-green-600 text-white shadow-lg scale-105"
                              : "bg-green-50 text-green-700 hover:bg-green-100"
                          }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>Finance (India)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("entrepreneurs")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
                          ${
                            activeTab === "entrepreneurs"
                              ? "bg-green-600 text-white shadow-lg scale-105"
                              : "bg-green-50 text-green-700 hover:bg-green-100"
                          }`}
                >
                  <User className="w-4 h-4" />
                  <span>Investment & Savings</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("business-hindi")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
                          ${
                            activeTab === "business-hindi"
                              ? "bg-green-600 text-white shadow-lg scale-105"
                              : "bg-green-50 text-green-700 hover:bg-green-100"
                          }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Business (Hindi)</span>
                </button>
              </div>
            </form>
          </div>

          {/* News Content Area */}
          {error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-md my-8 max-w-2xl mx-auto animate-fadeInUpNews">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-red-800">News Fetch Failed</h3>
                  <div className="mt-2 text-sm text-red-700 space-y-2">
                    <p>
                      We couldn't retrieve the news articles. This typically happens for one of the following reasons:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Dev Server needs a restart:</strong> If you just added the API key to your <code>.env</code> file, you need to restart the React dev server so it can load the new variables.
                      </li>
                      <li>
                        <strong>Developer Plan CORS restrictions:</strong> NewsAPI's developer plan allows requests <em>only</em> from <code>localhost</code> (e.g. <code>http://localhost:3000</code>). If you are accessing this from a custom domain name or external IP, NewsAPI will block the request.
                      </li>
                      <li>
                        <strong>Invalid API Key:</strong> Double check that <code>REACT_APP_NEWS_API_KEY</code> is correctly set in your environment configuration.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center py-12">
              <RefreshCcw className="w-8 h-8 text-green-500 animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center text-gray-500 py-16 animate-fadeInUpNews">
              No news articles found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col animate-fadeInUpNews"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {article.urlToImage && (
                    <div className="relative h-52 overflow-hidden group">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full shadow">
                          {article.source.name}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-lg font-bold text-green-900 mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                      <span className="truncate max-w-[50%]">{article.author || "Unknown"}</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsPage;