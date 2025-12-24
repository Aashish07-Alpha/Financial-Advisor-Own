import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { FaFilter, FaSearch, FaRegUser, FaMapMarkerAlt, FaRupeeSign, FaBirthdayCake, FaBriefcase } from "react-icons/fa";

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(true);

  const [filters, setFilters] = useState({
    category: "All",
    state: "All",
    income: "All",
    age: "All",
    occupation: "All",
  });

  const [activeCard, setActiveCard] = useState(null);

  const fetchSchemes = async () => {
    setLoading(true);
    setError("");

    try {
      const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
      const response = await axios.post(`${backend_url}/api/schemes`, filters);

      if (Array.isArray(response.data)) {
        setSchemes(response.data);
      } else {
        setSchemes([]);
        setError("Unexpected response format");
        console.error("Unexpected format:", response.data);
      }
    } catch (err) {
      setError("Failed to fetch schemes");
      setSchemes([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setHasSearched(true);
    fetchSchemes();
  };

  const handleClearFilters = () => {
    setFilters({
      category: "All",
      state: "All",
      income: "All",
      age: "All",
      occupation: "All",
    });
    setHasSearched(false);
    fetchSchemes(); // Fetch all schemes again
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Reset search state when filters change
    setHasSearched(false);
  };

  // Fetch all schemes when component mounts
  useEffect(() => {
    fetchSchemes();
  }, []);

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Scroll-based shading effect for cards
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.govt-scheme-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80 && rect.bottom > 80) {
          card.classList.add('scrolled');
        } else {
          card.classList.remove('scrolled');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 200); // Initial trigger
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-16 bg-gradient-to-br from-green-50 to-blue-50 flex relative overflow-hidden">
        {/* Fixed Sidebar filters - Reduced size */}
        <aside className="fixed left-0 top-16 w-72 h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-md border-r border-gray-200/50 shadow-xl flex flex-col z-20">
          <div className="p-4 flex flex-col gap-3 h-full">
            <div className="flex items-center gap-2 mb-2 text-green-700 font-bold text-base">
              <FaFilter className="text-sm" /> Filters
            </div>
            
            <div className="relative mb-3">
              <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search schemes..."
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent bg-white/70 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {[
              { key: "category", icon: <FaRegUser className="text-xs" /> },
              { key: "state", icon: <FaMapMarkerAlt className="text-xs" /> },
              { key: "income", icon: <FaRupeeSign className="text-xs" /> },
              { key: "age", icon: <FaBirthdayCake className="text-xs" /> },
              { key: "occupation", icon: <FaBriefcase className="text-xs" /> },
            ].map(({ key, icon }) => (
              <div key={key} className="mb-2">
                <label className="block mb-1 capitalize font-medium flex items-center gap-1.5 text-gray-700 text-xs">
                  {icon} {key}
                </label>
                <select
                  className="w-full border border-gray-300/70 rounded-lg p-2 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent shadow-sm"
                  value={filters[key]}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                >
                  {["All"]
                    .concat(
                      key === "category"
                        ? [
                            "General",
                            "Agriculture",
                            "Healthcare",
                            "Housing",
                            "Education",
                            "Women",
                            "Youth",
                            "Senior Citizens",
                            "Business",
                            "Entrepreneurship",
                            "Rural Development",
                            "Social Welfare",
                            "Minorities",
                            "SC/ST",
                            "Disability"
                          ]
                        : key === "state"
                        ? [
                            "Andhra Pradesh",
                            "Arunachal Pradesh",
                            "Assam",
                            "Bihar",
                            "Chhattisgarh",
                            "Delhi",
                            "Goa",
                            "Gujarat",
                            "Haryana",
                            "Himachal Pradesh",
                            "Jammu & Kashmir",
                            "Jharkhand",
                            "Karnataka",
                            "Kerala",
                            "Madhya Pradesh",
                            "Maharashtra",
                            "Manipur",
                            "Meghalaya",
                            "Mizoram",
                            "Nagaland",
                            "Odisha",
                            "Punjab",
                            "Rajasthan",
                            "Sikkim",
                            "Tamil Nadu",
                            "Telangana",
                            "Tripura",
                            "Uttar Pradesh",
                            "Uttarakhand",
                            "West Bengal"
                          ]
                        : key === "income"
                        ? [
                            "Below 1L",
                            "1L-3L",
                            "3L-6L",
                            "6L-12L",
                            "Above 12L"
                          ]
                        : key === "age"
                        ? [
                            "0-5",
                            "6-17",
                            "18-25",
                            "26-40",
                            "41-60",
                            "60+"
                          ]
                        : [
                            "Farmer",
                            "Student",
                            "Business",
                            "Service",
                            "Entrepreneur",
                            "Unemployed",
                            "Women",
                            "Senior Citizen",
                            "Person with Disability"
                          ]
                    )
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>
            ))}
            
            <div className="mt-auto pt-3 space-y-2">
              <button
                onClick={handleSubmit}
                className="w-full px-3 py-2 bg-green-600/90 text-white rounded-lg font-medium hover:bg-green-700/90 transition-colors shadow-sm hover:shadow-md text-sm"
              >
                Apply Filters
              </button>
              <button
                onClick={handleClearFilters}
                className="w-full px-3 py-2 bg-gray-500/90 text-white rounded-lg font-medium hover:bg-gray-600/90 transition-colors shadow-sm hover:shadow-md text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main content with adjusted spacing */}
        <main className="flex-1 ml-72 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-6 text-green-800 tracking-tight">Government Schemes</h2>
            
            {/* Show initial message if no search has been performed */}
            {!hasSearched && !loading && schemes.length > 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500 mb-6 bg-white/30 rounded-lg border border-gray-200/50 backdrop-blur-sm">
                <svg width="60" height="60" fill="none" viewBox="0 0 24 24" className="mb-3">
                  <path stroke="currentColor" strokeWidth="1.5" d="M12 20v-6m0 0V4m0 10c-4.418 0-8 1.343-8 3v3h16v-3c0-1.657-3.582-3-8-3Z"/>
                </svg>
                <span className="text-base font-medium">Showing all available schemes</span>
                <span className="text-sm text-gray-400 mt-1">Use filters above to narrow down your search</span>
              </div>
            )}

            {loading && (
              <div className="flex justify-center items-center h-40">
                <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50/80 border border-red-200/50 rounded-lg p-4 mb-6 backdrop-blur-sm">
                <p className="text-red-600 font-semibold">{error}</p>
              </div>
            )}
            
            {!loading && !error && schemes.length > 0 && (
              <>
                <div className="mb-6 p-4 bg-white/30 rounded-lg border border-gray-200/50 backdrop-blur-sm">
                  <p className="text-gray-600 text-sm">
                    {hasSearched ? (
                      <>Showing <span className="font-bold text-green-700">{filteredSchemes.length}</span> filtered schemes</>
                    ) : (
                      <>Showing <span className="font-bold text-green-700">{filteredSchemes.length}</span> available schemes</>
                    )}
                  </p>
                </div>
                
                {filteredSchemes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white/30 rounded-lg border border-gray-200/50 backdrop-blur-sm">
                    <svg width="80" height="80" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="1.5" d="M12 20v-6m0 0V4m0 10c-4.418 0-8 1.343-8 3v3h16v-3c0-1.657-3.582-3-8-3Z"/>
                    </svg>
                    <span className="mt-4 text-lg">No schemes found for your selection.</span>
                    <span className="text-sm text-gray-500 mt-2">Try adjusting your filters or selecting different criteria</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSchemes.map((scheme, index) => (
                      <div
                        key={index}
                        className={`govt-scheme-card shadow-lg border border-green-100/50 rounded-2xl bg-white/80 backdrop-blur-md transition-all duration-300 animate-fade-in relative overflow-hidden hover:shadow-xl hover:scale-105 ${activeCard === index ? ' ring-2 ring-green-300/50' : ''}`}
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                        tabIndex={0}
                        onFocus={() => setActiveCard(index)}
                        onBlur={() => setActiveCard(null)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100/70 text-green-700">
                              {scheme.category || "Scheme"}
                            </span>
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100/70 text-blue-700">
                              {scheme.state || "All India"}
                            </span>
                          </div>
                          <CardTitle className="text-xl font-bold text-green-800">
                            {scheme.name || scheme.title}
                          </CardTitle>
                          <CardDescription className="text-xs text-gray-500 mt-1">
                            {scheme.eligibility && <span>Eligibility: {scheme.eligibility}</span>}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-800">
                          {scheme.description && (
                            <div className="mb-2">
                              <strong className="text-green-700">Description:</strong> {scheme.description}
                            </div>
                          )}
                          {scheme.lastApplyDate && (
                            <div>
                              <strong className="text-green-700">Last Apply Date:</strong> {scheme.lastApplyDate}
                            </div>
                          )}
                          {scheme.applicationProcedure && (
                            <div>
                              <strong className="text-green-700">How to Apply:</strong> {scheme.applicationProcedure}
                            </div>
                          )}
                          {scheme.applicationLink && scheme.applicationLink.startsWith("https://") && scheme.applicationLink.includes(".gov.in") && (
                            <div className="pt-2">
                              <a
                                href={scheme.applicationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/90 to-blue-500/90 text-white rounded-lg font-semibold shadow hover:from-green-600/90 hover:to-blue-600/90 transition"
                              >
                                Apply Now
                              </a>
                            </div>
                          )}
                        </CardContent>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default GovernmentSchemes;