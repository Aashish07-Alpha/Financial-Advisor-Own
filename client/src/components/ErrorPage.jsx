import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {

  // --- Pop-up Visualisation Elements ---
  const popups = [
    // Green orb
    <div key="orb" className="popup-visual popup-orb animate-pop-orb" />,
    // Sparkle
    <div key="sparkle" className="popup-visual popup-sparkle animate-pop-sparkle" />,
    // Geometric triangle
    <svg key="triangle" className="popup-visual popup-triangle animate-pop-triangle" width="32" height="32" viewBox="0 0 32 32">
      <polygon points="16,4 28,28 4,28" fill="#bbf7d0" stroke="#22c55e" strokeWidth="2" />
    </svg>
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-green-100 to-green-200 font-sans relative overflow-hidden select-none">
      <div className="flex flex-col items-center p-10 rounded-3xl shadow-2xl bg-white animate-pop-card z-10 max-w-lg w-full border-4 border-green-200 relative overflow-visible">
        {/* Pop-up Visualisation Elements */}
        {popups}
        {/* Clock Icon */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg border-4 border-green-300 p-4 animate-pop-in">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" fill="#f0fdf4" stroke="#22c55e" strokeWidth="4" />
            <circle cx="32" cy="32" r="6" fill="#22c55e" />
            <rect x="30.5" y="18" width="3" height="16" rx="1.5" fill="#22c55e" />
            <rect x="32" y="32" width="12" height="3" rx="1.5" fill="#22c55e" transform="rotate(45 32 32)" />
          </svg>
        </div>
        <h1 className="text-5xl text-green-600 font-extrabold mb-2 tracking-tight drop-shadow-sm mt-10">
          404
        </h1>
        <h2 className="text-2xl text-gray-800 font-bold mb-2">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-md text-center">
          Oops! The page you are looking for doesn't exist or has been moved.<br />
          Let's get you back to safety.
        </p>
        <Link
          to="/"
          className="text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:from-green-500 hover:to-green-700 transition-all duration-200 no-underline flex items-center gap-2 justify-center"
        >
          <span role="img" aria-label="home">🏠</span> Go Home
        </Link>
      </div>
      <style>{`
        .popup-visual {
          position: absolute;
          z-index: 20;
          opacity: 0.85;
        }
        .popup-orb {
          top: -32px;
          left: 24px;
          width: 38px;
          height: 38px;
          background: radial-gradient(circle at 40% 40%, #bbf7d0 70%, #22c55e 100%);
          border-radius: 50%;
          box-shadow: 0 0 32px 8px #bbf7d088;
          animation: float-orb 4.5s ease-in-out infinite alternate;
        }
        .popup-sparkle {
          top: 12px;
          right: 24px;
          width: 22px;
          height: 22px;
          background: none;
          border-radius: 50%;
          box-shadow: 0 0 0 0 #fff0, 0 0 16px 4px #bbf7d0;
        }
        .popup-sparkle::before {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          background: conic-gradient(from 0deg, #bbf7d0 0 25%, #fff 25% 50%, #bbf7d0 50% 75%, #fff 75% 100%);
          border-radius: 50%;
          opacity: 0.7;
          filter: blur(1.5px);
        }
        .popup-triangle {
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%) scale(1.1) rotate(-8deg);
          filter: drop-shadow(0 0 8px #bbf7d0);
          animation: float-triangle 5.2s ease-in-out infinite alternate;
        }
        @keyframes float-orb {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-18px) scale(1.08); }
        }
        @keyframes float-triangle {
          0% { transform: translateX(-50%) scale(1.1) rotate(-8deg); }
          100% { transform: translateX(-50%) scale(1.18) rotate(8deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease;
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.7) translateY(-30px);}
          100% { opacity: 1; transform: scale(1) translateY(0);}
        }
        .animate-pop-in {
          animation: pop-in 0.7s cubic-bezier(.4,2,.6,1) both;
        }
        .animate-pop-orb {
          animation: pop-in 0.7s cubic-bezier(.4,2,.6,1) both, float-orb 4.5s ease-in-out 0.7s infinite alternate;
        }
        .animate-pop-sparkle {
          animation: pop-in 0.7s cubic-bezier(.4,2,.6,1) both;
        }
        .animate-pop-triangle {
          animation: pop-in 0.7s cubic-bezier(.4,2,.6,1) both, float-triangle 5.2s ease-in-out 0.7s infinite alternate;
        }
        .animate-pop-card {
          animation: pop-in 0.7s cubic-bezier(.4,2,.6,1) both;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
