import React from 'react';
import './LandingPageCards.css';

const LandingPageCards = ({ items }) => {
  return (
    <section className="landing-why-choose">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 transform hover:scale-105 transition-transform duration-500">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover the tools and resources that make us your ideal partner in your journey to success.
          </p>
        </div>
        
        <div className="grid">
          {items.map((item, index) => (
            <article key={index} className="card">
              {/* Card background with logo watermark */}
              <div className="card-bg"></div>
              
              {/* Card content */}
              <div className="card-content">
                {/* Icon */}
                <div className="card-icon">
                  {React.createElement(item.icon, {
                    className: "h-8 w-8 text-white"
                  })}
                </div>
                
                {/* Title */}
                <h3 className="card-title">
                  {item.title}
                </h3>
                
                {/* Description - revealed on hover */}
                <p className="card-description">
                  {item.description}
                </p>
                
                {/* Features - revealed on hover */}
                {item.features && (
                  <div className="card-features">
                    <ul>
                      {item.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Benefits - revealed on hover */}
                {item.benefits && (
                  <div className="card-benefits">
                    {item.benefits}
                  </div>
                )}
                
                {/* Learn More link - revealed on hover */}
                <div className="card-link">
                  <a href={item.link}>
                    Learn More →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPageCards;