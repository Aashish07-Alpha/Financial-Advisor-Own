import React from 'react';
import './Features.css'; // Import the CSS file for scoped styles

const Features = ({ t }) => {
  const features = t.items;
    
  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      {/* Enhanced background glow effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-emerald-200/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse" />
        {/* Animated pattern */}
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 animate-float z-0" width="600" height="600" viewBox="0 0 600 600" fill="none">
          <ellipse cx="300" cy="300" rx="250" ry="120" fill="#bbf7d0" />
          <ellipse cx="300" cy="300" rx="180" ry="60" fill="#4ade80" />
          <ellipse cx="300" cy="300" rx="100" ry="30" fill="#22c55e" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 transform hover:scale-105 transition-transform duration-500">
            {t.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <a
              href={feature.link}
              key={index}
              className="group relative rounded-2xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1"
            >
              {/* Enhanced multi-layered glow effect */}
              <div className="absolute inset-0 rounded-2xl">
                {/* Base glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-500/30 rounded-2xl transform rotate-180 blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:scale-110" />
                {/* Additional glow layers */}
                <div className="absolute inset-0 bg-gradient-to-tr from-green-300/20 to-emerald-400/20 rounded-2xl transform -rotate-90 blur-xl transition-all duration-500 group-hover:blur-3xl group-hover:scale-125" />
                <div className="absolute inset-0 bg-gradient-to-bl from-emerald-200/20 to-green-300/20 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:scale-105" />
                {/* Animated accent glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur-2xl animate-pulse" />
                </div>
              </div>
              <div className="relative p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-green-100 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {React.createElement(feature.icon, {
                    className: "h-16 w-16 text-green-600 group-hover:text-emerald-500 transition-colors duration-500"
                  })}
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 transition-all duration-500">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
                <div className="mt-6 transform translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-flex items-center text-emerald-600 font-semibold">
                    Explore
                    <svg
                      className="w-5 h-5 ml-2 transform transition-transform duration-500 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;