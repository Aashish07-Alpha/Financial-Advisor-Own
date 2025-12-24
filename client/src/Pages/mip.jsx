import React, { useState } from 'react';
import { 
  ArrowUpRight, Users, TrendingUp, Building, Landmark, 
   PiggyBank, Smartphone, Store, Globe,
  Tractor, Coins
} from 'lucide-react';

const MicroinvestmentPlatform = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [language, setLanguage] = useState('hi');

  const categories = {
    all: { hi: "सभी श्रेणियां", en: "All Categories" },
    banking: { hi: "बैंकिंग", en: "Banking" },
    community: { hi: "समुदाय", en: "Community" },
    business: { hi: "व्यवसाय", en: "Business" },
    gold: { hi: "सोना", en: "Gold" },
    agriculture: { hi: "कृषि", en: "Agriculture" },
    market: { hi: "बाजार", en: "Market" },
    digital: { hi: "डिजिटल", en: "Digital" },
    government: { hi: "सरकारी", en: "Government" },
    "rural-business": { hi: "ग्रामीण व्यवसाय", en: "Rural Business" }
  };

  const translations = {
    hi: {
      title: "सूक्ष्म निवेश के अवसर",
      subtitle: "ग्रामीण निवेश मित्र के साथ खोजें",
      description: "आसान और सुरक्षित निवेश से ग्रामीण भारत को मजबूत बनाएं",
      cta: "आज ही शुरू करें",
      startJourney: "शुरू करें अपनी निवेश यात्रा",
      expertGuide: "हमारे वित्तीय विशेषज्ञ आपकी निवेश यात्रा में मार्गदर्शन करने के लिए तैयार हैं",
      minimum: "न्यूनतम निवेश",
      returns: "संभावित रिटर्न"
    },
    en: {
      title: "Microinvestment opportunites",
      subtitle: "Explore with your personal Investment Friend",
      description: "Empowering rural India through accessible and secure investment options",
      cta: "Get Started Today",
      startJourney: "Start Your Investment Journey",
      expertGuide: "Our financial experts are here to guide you through your investment journey",
      minimum: "Minimum Investment",
      returns: "Expected Returns"
    }
  };

  const investmentOptions = [
    {
      title: {
        hi: "आवर्ती जमा (Recurring Deposit)",
        en: "Recurring Deposit (RD)"
      },
      description: {
        hi: "नियमित मासिक बचत के साथ सुरक्षित रिटर्न। बैंक और पोस्ट ऑफिस RD उपलब्ध।",
        en: "Secure returns with regular monthly savings. Available through banks and post offices."
      },
      minAmount: "₹100/month",
      returns: "5.5-6.5%",
      icon: <PiggyBank className="w-6 h-6" />,
      category: "banking"
    },
    {
      title: {
        hi: "स्वयं सहायता समूह (Self-Help Groups)",
        en: "Self-Help Groups (SHGs)"
      },
      description: {
        hi: "समुदाय-आधारित बचत और उधार। सामूहिक विकास के लिए।",
        en: "Community-based savings and lending for collective development."
      },
      minAmount: "₹50/month",
      returns: "Variable",
      icon: <Users className="w-6 h-6" />,
      category: "community"
    },
    {
      title: {
        hi: "माइक्रोफाइनेंस (Microfinance)",
        en: "Microfinance Institutions (MFIs)"
      },
      description: {
        hi: "छोटे व्यवसाय और स्वरोजगार के लिए वित्तीय सहायता।",
        en: "Financial assistance for small businesses and self-employment initiatives."
      },
      minAmount: "₹1000",
      returns: "10-15%",
      icon: <Building className="w-6 h-6" />,
      category: "business"
    },
    {
      title: {
        hi: "स्वर्ण योजना (Gold Scheme)",
        en: "Gold Investment Scheme"
      },
      description: {
        hi: "डिजिटल और फिजिकल गोल्ड में निवेश। सुरक्षित भविष्य।",
        en: "Invest in digital and physical gold for a secure future."
      },
      minAmount: "₹100",
      returns: "Market Linked",
      icon: <Coins className="w-6 h-6" />,
      category: "gold"
    },
    {
      title: {
        hi: "कृषि और पशुपालन (Agriculture & Livestock)",
        en: "Agriculture & Livestock Investment"
      },
      description: {
        hi: "कृषि और पशुपालन में निवेश। सतत आय का स्रोत।",
        en: "Invest in agriculture and livestock for sustainable income."
      },
      minAmount: "₹5000",
      returns: "15-25%",
      icon: <Tractor className="w-6 h-6" />,
      category: "agriculture"
    },
    {
      title: {
        hi: "म्यूचुअल फंड SIP",
        en: "Mutual Funds SIP"
      },
      description: {
        hi: "नियमित SIP के माध्यम से इक्विटी में निवेश।",
        en: "Equity investment through regular Systematic Investment Plans."
      },
      minAmount: "₹500/month",
      returns: "10-12%",
      icon: <TrendingUp className="w-6 h-6" />,
      category: "market"
    },
    {
      title: {
        hi: "डिजिटल निवेश ऐप्स",
        en: "Digital Investment Apps"
      },
      description: {
        hi: "स्मार्टफोन के माध्यम से आसान डिजिटल निवेश।",
        en: "Easy digital investments through smartphone applications."
      },
      minAmount: "₹10",
      returns: "Variable",
      icon: <Smartphone className="w-6 h-6" />,
      category: "digital"
    },
    {
      title: {
        hi: "लघु व्यवसाय",
        en: "Small Business Ventures"
      },
      description: {
        hi: "छोटे व्यवसाय में निवेश और विकास।",
        en: "Investment and growth in small business enterprises."
      },
      minAmount: "₹10000",
      returns: "20-30%",
      icon: <Store className="w-6 h-6" />,
      category: "business"
    },
    {
      title: {
        hi: "सरकारी योजनाएं",
        en: "Government Investment Schemes"
      },
      description: {
        hi: "PM-KISAN, अटल पेंशन योजना और अन्य सरकारी निवेश योजनाएं।",
        en: "PM-KISAN, Atal Pension Yojana and other government investment schemes."
      },
      minAmount: "Varies",
      returns: "8-9%",
      icon: <Landmark className="w-6 h-6" />,
      category: "government"
    },
    {
      title: {
        hi: "ग्रामीण व्यवसाय निवेश",
        en: "Rural Business Investment"
      },
      description: {
        hi: "पोल्ट्री फार्मिंग, डेयरी फार्मिंग और अन्य ग्रामीण व्यवसायों में निवेश।",
        en: "Investment in poultry farming, dairy farming, and other rural business ventures."
      },
      minAmount: "₹25,000",
      returns: "18-25%",
      icon: <Tractor className="w-6 h-6" />,
      category: "rural-business"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
          className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
        >
          <Globe className="w-4 h-4 text-green-600" />
          <span className="text-green-600 font-medium">
            {language === 'hi' ? 'English' : 'हिंदी'}
          </span>
        </button>
      </div>

      {/* Rest of the component structure remains the same, just update the content references */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-100 via-white to-green-50">
        {/* Geometric patterns section remains the same */}
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              {translations[language].title}
              <span className="block text-2xl font-normal text-gray-600 mt-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                {translations[language].subtitle}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
              {translations[language].description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(categories).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                }`}
              >
                {value[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Investment Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {investmentOptions
            .filter(option => selectedCategory === 'all' || option.category === selectedCategory)
            .map((option, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-green-100"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-gradient-to-br from-green-100 to-white rounded-xl group-hover:from-green-200 group-hover:to-green-50 transition-colors duration-300">
                    {React.cloneElement(option.icon, { 
                      className: 'w-7 h-7 text-green-600 group-hover:text-green-700 transition-colors duration-300' 
                    })}
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-green-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                  {option.title[language]}
                </h3>
                <p className="text-gray-600 mb-6 h-20 leading-relaxed">
                  {option.description[language]}
                </p>
                <div className="flex justify-between items-center text-sm pt-4 border-t border-green-100">
                  <div className="flex flex-col">
                    <span className="text-gray-500">{translations[language].minimum}</span>
                    <span className="font-semibold text-gray-900">{option.minAmount}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-gray-500">{translations[language].returns}</span>
                    <span className="font-semibold text-green-600">{option.returns}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-br from-green-100 via-green-50 to-white rounded-2xl p-16 shadow-xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {translations[language].startJourney}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {translations[language].expertGuide}
          </p>
          <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-10 py-4 rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
            {translations[language].cta}
          </button>
        </div>
      </main>

      {/* Footer structure remains the same */}
      
      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-b from-white to-green-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Contact Us</h4>
              <p className="text-gray-600 hover:text-green-600 transition-colors duration-300">1800-XXX-XXXX</p>
              <p className="text-gray-600 hover:text-green-600 transition-colors duration-300">support@grameennivesh.in</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Security</h4>
              <p className="text-gray-600">RBI Regulated</p>
              <p className="text-gray-600">256-bit Encryption</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Download App</h4>
              <p className="text-gray-600">Google Play & App Store</p>
            </div>
          </div>
          <div className="text-center mt-12 pt-8 border-t border-green-100">
            <p className="text-gray-600">
              © 2025 {translations[language].title}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MicroinvestmentPlatform;