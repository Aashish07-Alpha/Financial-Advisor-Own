import React, { useState, useEffect } from "react";
import "./Hero.css";
import dark_arrow from "../../assets/dark-arrow.png";
import { useNavigate } from "react-router-dom";

const features = [
  { 
    icon: "chart", 
    label: "Investment Planning",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    icon: "shield", 
    label: "Risk Management",
    color: "from-teal-500 to-green-500"
  },
  { 
    icon: "graph", 
    label: "Portfolio Analysis",
    color: "from-purple-500 to-pink-500"
  },
  { 
    icon: "target", 
    label: "Goal Setting",
    color: "from-orange-500 to-red-500"
  },
];

const Hero = () => {
  const navigate = useNavigate();
  
  // State for counting animations
  const [totalAssets, setTotalAssets] = useState(0);
  const [ytdReturn, setYtdReturn] = useState(0);
  const [clientRating, setClientRating] = useState(0);
  
  // State for typewriter effect
  const [typewriterText, setTypewriterText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  // Typewriter effect for full phrase
  useEffect(() => {
    const fullText = "Strategic Financial Planning Solutions";
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 100); // 100ms per character for faster typing
    
    return () => clearInterval(typeInterval);
  }, []);
  
  // Function to split text into black and green parts
  const renderTypewriterText = () => {
    const firstPart = "Strategic Financial";
    const secondPart = "Planning Solutions";
    
    if (typewriterText.length <= firstPart.length) {
      // Still typing first part (black)
      return (
        <span className="typewriter-text">
          {typewriterText}
          {isTyping && <span className="typewriter-cursor">▋</span>}
        </span>
      );
    } else {
      // First part complete, typing second part (green)
      const firstPartText = firstPart;
      const secondPartText = typewriterText.slice(firstPart.length + 1); // +1 for space
      
      return (
        <>
          <span className="typewriter-text text-gray-900">
            {firstPartText}
          </span>
          <span className="typewriter-text text-green-600">
            {secondPartText}
            {isTyping && <span className="typewriter-cursor">▋</span>}
          </span>
        </>
      );
    }
  };
  
  // Counting animation effect
  useEffect(() => {
    const startCounting = () => {
      // Animate Total Assets from 0 to 127000
      const assetsInterval = setInterval(() => {
        setTotalAssets(prev => {
          if (prev >= 127000) {
            clearInterval(assetsInterval);
            return 127000;
          }
          return prev + 1000;
        });
      }, 20);
      
      // Animate YTD Return from 0 to 12.4
      const returnInterval = setInterval(() => {
        setYtdReturn(prev => {
          if (prev >= 12.4) {
            clearInterval(returnInterval);
            return 12.4;
          }
          return prev + 0.1;
        });
      }, 50);
      
      // Animate Client Rating from 0 to 4.9
      const ratingInterval = setInterval(() => {
        setClientRating(prev => {
          if (prev >= 4.9) {
            clearInterval(ratingInterval);
            return 4.9;
          }
          return prev + 0.1;
        });
      }, 100);
    };
    
    // Start counting after typewriter effect completes
    const timer = setTimeout(startCounting, 4000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <section className="hero-professional w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 xl:px-24 py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-ping animation-delay-1000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
      
      {/* Left: Content Section */}
      <div className="flex-1 flex flex-col items-start justify-center z-10 max-w-2xl">
        {/* Professional Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-6 animate-fade-in-up">
          <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">Trusted by 10,000+ Investors</span>
        </div>

        {/* Main Headlines */}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
          {renderTypewriterText()}
        </h1>
        
        <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
          Transform your financial future with data-driven insights, expert guidance, and comprehensive wealth management strategies tailored to your goals.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-md">
          {features.map((feature, index) => (
            <div
              key={feature.label}
              className="feature-card-modern bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up group cursor-pointer"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                  {feature.icon === "chart" && (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="13" width="2" height="6" fill="rgba(255,255,255,0.8)"/>
                      <rect x="7" y="9" width="2" height="10" fill="rgba(255,255,255,0.9)"/>
                      <rect x="11" y="5" width="2" height="14" fill="white"/>
                    </svg>
                  )}
                  {feature.icon === "shield" && (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                  )}
                  {feature.icon === "graph" && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                    </svg>
                  )}
                  {feature.icon === "target" && (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)"/>
                      <circle cx="12" cy="12" r="6" fill="rgba(255,255,255,0.4)"/>
                      <circle cx="12" cy="12" r="2" fill="white"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm group-hover:text-gray-900 transition-colors duration-300">
                    {feature.label}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full animate-fade-in-up animation-delay-600">
          <button
            onClick={() => navigate("/financialAdvisior")}
            className="cta-primary-btn flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              Get Started
              <svg 
                className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <button
            onClick={() => window.scrollTo({ top: 900, behavior: "smooth" })}
            className="cta-secondary-btn flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-green-600 text-green-700 font-bold text-lg rounded-full hover:bg-green-50 hover:border-green-700 hover:text-green-800 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-md hover:shadow-lg group"
          >
            <span>Learn More</span>
          </button>
        </div>


      </div>

      {/* Right: Professional Visualization */}
      <div className="flex-1 flex justify-center items-center z-10 mt-12 lg:mt-0 animate-fade-in-up animation-delay-400">
        <div className="relative w-full max-w-lg">
          {/* Main Card */}
          <div className="portfolio-card bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform hover:scale-105 transition-all duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Portfolio Overview</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-100 text-sm">Live</span>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="p-6">
              <div className="flex items-end justify-between space-x-2 mb-6">
                <div className="chart-bar flex-1 bg-green-100 rounded-t-lg animate-bar-grow" style={{ height: '60px', animationDelay: '0.1s' }}></div>
                <div className="chart-bar flex-1 bg-green-200 rounded-t-lg animate-bar-grow" style={{ height: '80px', animationDelay: '0.2s' }}></div>
                <div className="chart-bar flex-1 bg-green-300 rounded-t-lg animate-bar-grow" style={{ height: '100px', animationDelay: '0.3s' }}></div>
                <div className="chart-bar flex-1 bg-green-400 rounded-t-lg animate-bar-grow" style={{ height: '70px', animationDelay: '0.4s' }}></div>
                <div className="chart-bar flex-1 bg-green-500 rounded-t-lg animate-bar-grow" style={{ height: '90px', animationDelay: '0.5s' }}></div>
                <div className="chart-bar flex-1 bg-green-600 rounded-t-lg animate-bar-grow" style={{ height: '120px', animationDelay: '0.6s' }}></div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  <div className="text-2xl font-bold text-green-600 counting-number">
                    ${(totalAssets / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Total Assets</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  <div className="text-2xl font-bold text-green-600 counting-number">
                    +{ytdReturn.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">YTD Return</div>
                </div>
              </div>
            </div>
          </div>

                    {/* Floating Elements */}
          <div className="floating-card absolute -top-4 -right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-float">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Risk Level: Low</span>
            </div>
          </div>

          <div className="floating-card absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-float animation-delay-1000">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600 counting-number">
                {clientRating.toFixed(1)}/5
              </div>
              <div className="text-xs text-gray-600">Client Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;