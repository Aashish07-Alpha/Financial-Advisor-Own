import React, { useState, useEffect } from 'react';
import { scamsData } from './scamsdata.js';
import './ScamsPage.css';

const ScamsPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showParticles, setShowParticles] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [comprehensiveExpanded, setComprehensiveExpanded] = useState(false);

  useEffect(() => {
    // Simulate loading and trigger animations
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimateHeader(true);
      setShowParticles(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate through learning steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(stepInterval);
  }, []);

  const toggleSection = (sectionIndex) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionIndex)) {
      newExpanded.delete(sectionIndex);
    } else {
      newExpanded.add(sectionIndex);
    }
    setExpandedSections(newExpanded);
  };

  const toggleSummary = () => {
    setSummaryExpanded(!summaryExpanded);
  };

  const toggleComprehensive = () => {
    setComprehensiveExpanded(!comprehensiveExpanded);
  };

  const learningSteps = [
    {
      icon: "📚",
      title: "Learn",
      description: "Understand different types of financial scams",
      color: "#22c55e"
    },
    {
      icon: "🔍",
      title: "Identify",
      description: "Recognize red flags and suspicious activities",
      color: "#16a34a"
    },
    {
      icon: "🛡️",
      title: "Protect",
      description: "Implement security measures and best practices",
      color: "#15803d"
    },
    {
      icon: "🚨",
      title: "Report",
      description: "Report scams to authorities and help others",
      color: "#166534"
    }
  ];

  const renderTable = (table) => {
    if (!table || !table.headers || !table.rows) return null;

    return (
      <div className="table-container animate-slide-up">
        <h4 className="table-title">{table.title}</h4>
        <div className="table-wrapper">
          <table className="scams-table">
            <thead>
              <tr>
                {table.headers.map((header, index) => (
                  <th key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="animate-fade-in" style={{ animationDelay: `${rowIndex * 0.05}s` }}>
                  {table.headers.map((header, colIndex) => (
                    <td key={colIndex}>{row[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSteps = (steps) => {
    if (!steps || !Array.isArray(steps)) return null;

    return (
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-item animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="step-number">
              <span className="step-number-text">{step.stepNumber || index + 1}</span>
            </div>
            <div className="step-content">
              <h5 className="step-title">{step.title}</h5>
              <p className="step-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSubsections = (subsections) => {
    if (!subsections || !Array.isArray(subsections)) return null;

    return (
      <div className="subsections-container">
        {subsections.map((subsection, index) => (
          <div key={index} className="subsection animate-slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
            <h4 className="subsection-title">{subsection.title}</h4>
            <p className="subsection-content">{subsection.content}</p>
            {subsection.elements && (
              <ul className="elements-list">
                {subsection.elements.map((element, elemIndex) => (
                  <li key={elemIndex} className="element-item animate-fade-in" style={{ animationDelay: `${elemIndex * 0.1}s` }}>
                    {element}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderScamCategories = (categories) => {
    if (!categories || !Array.isArray(categories)) return null;

    return (
      <div className="scam-categories">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`category-card animate-slide-up ${hoveredCard === index ? 'hovered' : ''}`}
            style={{ animationDelay: `${index * 0.2}s` }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="category-icon">⚠️</div>
            <h4 className="category-title">{category.category}</h4>
            <p className="category-description">{category.description}</p>
            <div className="category-examples">
              <strong>Examples:</strong> {category.examples}
            </div>
            <div className="category-glow"></div>
          </div>
        ))}
      </div>
    );
  };

  const renderSection = (section, index) => {
    const isExpanded = expandedSections.has(index);

    return (
      <div key={index} className={`section-card animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
        <div 
          className={`section-header ${isExpanded ? 'expanded' : ''}`}
          onClick={() => toggleSection(index)}
        >
          <div className="section-header-content">
            <div className="section-number">Section {section.sectionNumber}</div>
            <h3 className="section-title">{section.title}</h3>
          </div>
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
            {isExpanded ? '−' : '+'}
          </span>
          <div className="section-glow"></div>
        </div>
        
        <div className={`section-content ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded && (
            <div className="content-wrapper animate-expand">
              <p className="section-text">{section.content}</p>
              
              {section.subsections && renderSubsections(section.subsections)}
              {section.scamCategories && renderScamCategories(section.scamCategories)}
              {section.table && renderTable(section.table)}
              {section.steps && renderSteps(section.steps)}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p className="loading-text">Loading Scam Prevention Guide...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="scams-page">
      {/* Particle Effects */}
      {showParticles && (
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
      )}

      <div className="scams-container">
        <div className={`scams-header ${animateHeader ? 'animate-header' : ''}`}>
          <div className="header-content">
            <div className="header-badge">
              <span className="badge-icon">🛡️</span>
              <span className="badge-text">Financial Security Guide</span>
            </div>
            <div className="main-title-container">
              <h1 className="main-title">
                <span className="title-line-1">Financial Scam</span>
                <span className="title-line-2">Prevention Guide</span>
              </h1>
              <p className="main-subtitle">Your Complete Defense Against Digital Fraud</p>
            </div>
            
            {/* Redesigned Introduction Section */}
            {/* <div className="introduction-section">
              <div className="intro-card">
                <div className="intro-icon">📊</div>
                <div className="intro-content">
                  <h2 className="intro-title">Comprehensive Financial Security Guide</h2>
                  <p className="intro-text">{scamsData.expertReport.introduction}</p>
                  <div className="intro-features">
                    <div className="feature-item">
                      <span className="feature-icon">🛡️</span>
                      <span className="feature-text">Expert Analysis</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">📋</span>
                      <span className="feature-text">Prevention Tips</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🚨</span>
                      <span className="feature-text">Emergency Response</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

          
          </div>
        </div>

        <div className="sections-container">
          {/* Comprehensive Guide Section */}
          <div className="section-card">
            <div 
              className={`section-header ${comprehensiveExpanded ? 'expanded' : ''}`}
              onClick={toggleComprehensive}
            >
              <div className="section-glow"></div>
              <div className="section-header-content">
                <div className="section-number">GUIDE</div>
                <div className="section-title">Comprehensive Financial Security Guide</div>
              </div>
              <span className={`expand-icon ${comprehensiveExpanded ? 'expanded' : ''}`}>
                {comprehensiveExpanded ? '−' : '+'}
              </span>
            </div>
            
            <div className={`section-content ${comprehensiveExpanded ? 'expanded' : ''}`}>
              {comprehensiveExpanded && (
                <div className="content-wrapper">
                  <div className="section-text">
                    <p>
                      The proliferation of digital technology has fundamentally reshaped the global economy, 
                      democratizing access to financial services on an unprecedented scale. This transformation, 
                      however, has been shadowed by a parallel evolution in criminal activity. Financial fraud, 
                      once a craft of individual con artists, has morphed into a sophisticated, globalized industry. 
                      It is no longer a series of isolated incidents but a systemic threat, powered by advanced 
                      technology, operated by transnational criminal syndicates, and executed with a masterful 
                      understanding of human psychology.
                    </p>
                    
                    <p>
                      This report provides an exhaustive analysis of this modern threat landscape. The core 
                      argument of this analysis is that while technology has democratized finance, it has also 
                      industrialized crime. The same tools that enable seamless, one-click payments and global 
                      connectivity also equip fraudsters with the means to operate at scale, with anonymity, 
                      and across borders. They leverage social engineering, artificial intelligence, and complex 
                      laundering networks to extract vast sums from individuals, businesses, and even governments.
                    </p>
                    
                    <p>
                      This report will deconstruct the phenomenon of financial scams, beginning with a foundational 
                      examination of their core principles and definitions. It will then present a detailed taxonomy 
                      of the most prevalent scams operating today, revealing the alarming convergence of fraudulent 
                      tactics. A critical section is dedicated to the human factor—the psychological mechanisms 
                      of deception and the cognitive biases that render individuals vulnerable.
                    </p>
                    
                    <p>
                      Following this diagnostic analysis, the report transitions to prescriptive solutions. 
                      It outlines universal best practices for building a digital fortress and details advanced 
                      protocols for securing online transactions. A significant portion of this report is dedicated 
                      to an in-depth case study of India, a nation at the forefront of the digital payments 
                      revolution. This analysis examines the monumental success of its online transaction ecosystem, 
                      particularly the Unified Payments Interface (UPI), while simultaneously confronting the stark 
                      reality of the fraud it enables.
                    </p>
                    
                    <p>
                      The report details the staggering financial losses, the specific scams plaguing the country, 
                      and the robust regulatory and procedural frameworks established by Indian authorities to combat 
                      this threat. Ultimately, this report aims to serve as a definitive resource. It is designed 
                      to educate and empower readers by moving from a global understanding of fraud to a deep, 
                      actionable analysis of the situation in India, providing the knowledge necessary to navigate 
                      the digital gauntlet safely.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Summary Section */}
          <div className="section-card">
            <div 
              className={`section-header ${summaryExpanded ? 'expanded' : ''}`}
              onClick={toggleSummary}
            >
              <div className="section-glow"></div>
              <div className="section-header-content">
                <div className="section-number">SUMMARY</div>
                <div className="section-title">Quick Overview Guide</div>
              </div>
              <span className={`expand-icon ${summaryExpanded ? 'expanded' : ''}`}>
                {summaryExpanded ? '−' : '+'}
              </span>
            </div>
            
            <div className={`section-content ${summaryExpanded ? 'expanded' : ''}`}>
              {summaryExpanded && (
                <div className="content-wrapper">
                  <div className="summary-grid">
                    <div className="summary-card">
                      <div className="summary-card-icon">🎯</div>
                      <h4>What You'll Learn</h4>
                      <ul>
                        <li>Common financial scam types</li>
                        <li>Red flags to watch for</li>
                        <li>Protection strategies</li>
                        <li>Emergency response steps</li>
                      </ul>
                    </div>

                    <div className="summary-card">
                      <div className="summary-card-icon">⚠️</div>
                      <h4>Key Warning Signs</h4>
                      <ul>
                        <li>Unsolicited calls/emails</li>
                        <li>Pressure to act quickly</li>
                        <li>Requests for personal info</li>
                        <li>Too-good-to-be-true offers</li>
                      </ul>
                    </div>

                    <div className="summary-card">
                      <div className="summary-card-icon">🛡️</div>
                      <h4>Protection Tips</h4>
                      <ul>
                        <li>Never share personal details</li>
                        <li>Verify before trusting</li>
                        <li>Use secure payment methods</li>
                        <li>Report suspicious activity</li>
                      </ul>
                    </div>

                    <div className="summary-card">
                      <div className="summary-card-icon">🚨</div>
                      <h4>Emergency Actions</h4>
                      <ul>
                        <li>Contact your bank immediately</li>
                        <li>File police reports</li>
                        <li>Monitor your accounts</li>
                        <li>Alert credit bureaus</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {scamsData.expertReport.sections.map((section, index) => 
            renderSection(section, index)
          )}
        </div>

        <div className="scams-footer">
          <div className="disclaimer animate-slide-up">
            <div className="disclaimer-icon">🛡️</div>
            <h3>Important Disclaimer</h3>
            <p>
              This information is provided for educational purposes only. 
              If you believe you have been targeted by a scam, contact your local authorities 
              and financial institutions immediately. Never share personal or financial 
              information with unsolicited callers or suspicious websites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScamsPage; 