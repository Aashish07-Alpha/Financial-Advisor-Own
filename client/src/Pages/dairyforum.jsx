import React, { useState } from 'react';

const DairyForumPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [sortBy, setSortBy] = useState('top');

  const translations = {
    English: {
      title: "Dairy Farming Forum",
      subtitle: "Expert-led discussions on dairy farming"
    },
    Hindi: {
      title: "डेयरी फार्मिंग फोरम",
      subtitle: "विशेषज्ञों द्वारा डेयरी फार्मिंग पर चर्चा"
    },
    मराठी: {
      title: "दुग्ध व्यवसाय मंच",
      subtitle: "तज्ञांद्वारे दुग्ध व्यवसायावरील चर्चा"
    }
  };

  const discussions = [
    {
      id: 1,
      title: {
        English: "Best practices for maintaining milk quality during summer",
        Hindi: "गर्मी के दौरान दूध की गुणवत्ता बनाए रखने के सर्वोत्तम तरीके"
      },
      author: "DrSarah",
      isExpert: true,
      expertise: "Dairy Science PhD",
      content: {
        English: "During summer months, the biggest challenge is maintaining milk quality due to heat stress. Here are some key strategies I've found effective...",
        Hindi: "गर्मी के महीनों में, सबसे बड़ी चुनौती गर्मी के तनाव के कारण दूध की गुणवत्ता बनाए रखना होती है। यहाँ कुछ प्रमुख रणनीतियाँ हैं जो मैंने प्रभावी पाई हैं..."
      },
      upvotes: 234,
      comments: 45,
      isSolution: true,
      timestamp: "2 hours ago",
      tags: {
        English: ["Expert Advice", "Quality Control"],
        Hindi: ["विशेषज्ञ सलाह", "गुणवत्ता नियंत्रण"]
      }
    },
    {
      id: 2,
      title: {
        English: "Question about automated milking systems",
        Hindi: "स्वचालित दुग्ध प्रणाली के बारे में प्रश्न"
      },
      author: "Rama Bhau",
      content: {
        English: "I'm considering investing in an automated milking system. Has anyone here implemented one? What was your experience?",
        Hindi: "मैं स्वचालित दुग्ध प्रणाली में निवेश करने पर विचार कर रहा हूँ। क्या यहाँ किसी ने इसे लागू किया है? आपका अनुभव कैसा रहा?"
      },
      upvotes: 156,
      comments: 28,
      timestamp: "5 hours ago",
      tags: {
        English: ["Technology", "Equipment"],
        Hindi: ["प्रौद्योगिकी", "उपकरण"]
      }
    },
    {
      id: 3,
      title: {
        English: "Market analysis: Organic vs. Regular milk pricing trends",
        Hindi: "बाजार विश्लेषण: ऑर्गेनिक बनाम नियमित दूध की मूल्य प्रवृत्तियाँ"
      },
      author: "EconExpert",
      isExpert: true,
      expertise: "Agricultural Economics",
      content: {
        English: "Based on the last quarter's data, we're seeing interesting trends in organic milk pricing...",
        Hindi: "पिछले तिमाही के डेटा के आधार पर, हम ऑर्गेनिक दूध की मूल्य प्रवृत्तियों में दिलचस्प बदलाव देख रहे हैं..."
      },
      upvotes: 189,
      comments: 32,
      timestamp: "1 day ago",
      tags: {
        English: ["Market Analysis", "Expert Insight"],
        Hindi: ["बाजार विश्लेषण", "विशेषज्ञ दृष्टिकोण"]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800">
            {translations[selectedLanguage].title}
          </h1>
          <p className="text-green-600">
            {translations[selectedLanguage].subtitle}
          </p>
        </div>
          
          {/* Language Selector */}
          
          <select 
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white border border-green-200 text-green-800"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>मराठी</option>
        </select>
        </div>

        {/* Sorting and Filtering */}
        <div className="flex items-center space-x-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
          <button 
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              sortBy === 'top' ? 'bg-green-600 text-white' : 'text-green-800 hover:bg-green-100'
            }`}
            onClick={() => setSortBy('top')}
          >
            Top
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              sortBy === 'new' ? 'bg-green-600 text-white' : 'text-green-800 hover:bg-green-100'
            }`}
            onClick={() => setSortBy('new')}
          >
            New
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              sortBy === 'experts' ? 'bg-green-600 text-white' : 'text-green-800 hover:bg-green-100'
            }`}
            onClick={() => setSortBy('experts')}
          >
            Expert Posts
          </button>
        </div>

        {/* Discussion List */}
        <div className="space-y-4">
          {discussions.map(discussion => (
            <div key={discussion.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              {/* Vote and Content Layout */}
              <div className="flex">
                {/* Voting */}
                <div className="flex flex-col items-center mr-4">
                  <button className="text-green-600 hover:text-green-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <span className="my-1 font-medium text-green-800">{discussion.upvotes}</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {discussion.isExpert && (
                      <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                        Expert
                      </span>
                    )}
                    {discussion.isSolution && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                        Solution
                      </span>
                    )}
                    <h2 className="text-xl font-semibold text-green-800">{discussion.title[selectedLanguage]}</h2>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="font-medium text-green-700">{discussion.author}</span>
                    {discussion.expertise && (
                      <span className="ml-2 text-gray-400">• {discussion.expertise}</span>
                    )}
                    <span className="ml-2 text-gray-400">• {discussion.timestamp}</span>
                  </div>

                  <p className="text-gray-600 mb-3">{discussion.content[selectedLanguage]}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {discussion.tags[selectedLanguage].map(tag => (
                        <span key={tag} className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="flex items-center text-gray-500 hover:text-green-600">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {discussion.comments} comments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Moderation Notice */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-700">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-medium">AI-Assisted Moderation Active</span>
          </div>
          <p>This forum is monitored by AI to ensure quality discussions and prevent spam. Similar threads are automatically suggested to users.</p>
        </div>
      </div>
    </div>
  );
};

export default DairyForumPage;
