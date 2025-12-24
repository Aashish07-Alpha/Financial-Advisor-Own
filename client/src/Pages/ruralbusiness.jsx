import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Globe, Store, Utensils, Scissors, 
  Leaf, Fish, Phone, Bike, Factory, 
  Truck, Coffee, Brush, Milk, Drumstick, 
  Egg, BookCheck, ScaleIcon, Shield, Wrench, Map, Zap, Sprout,
  Coins, TrendingUp, PiggyBank, ArrowUpRight, Users, Building, Landmark, Smartphone,
  Home, Car, GraduationCap, Heart, Briefcase, Globe2, ShieldCheck, Award, Target, DollarSign, Workflow
} from 'lucide-react';

const RuralBusinessOpportunities = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMIPCategory, setSelectedMIPCategory] = useState('all');
  const navigate = useNavigate();

  // Snake cursor functionality
  useEffect(() => {
    const cursor = document.querySelector('.snake-cursor');
    const trails = [];
    
    const updateCursor = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
      }
      
      // Create trail effect
      const trail = document.createElement('div');
      trail.className = 'snake-trail';
      trail.style.left = e.clientX - 3 + 'px';
      trail.style.top = e.clientY - 3 + 'px';
      document.body.appendChild(trail);
      trails.push(trail);
      
      // Remove old trails
      if (trails.length > 10) {
        const oldTrail = trails.shift();
        if (oldTrail && oldTrail.parentNode) {
          oldTrail.parentNode.removeChild(oldTrail);
        }
      }
      
      // Fade out trails
      setTimeout(() => {
        if (trail.parentNode) {
          trail.style.opacity = '0';
          trail.style.transform = 'scale(0.5)';
          setTimeout(() => {
            if (trail.parentNode) {
              trail.parentNode.removeChild(trail);
            }
          }, 300);
        }
      }, 100);
    };
    
    const hideCursor = () => {
      if (cursor) {
        cursor.style.opacity = '0';
      }
    };
    
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', hideCursor);
    
    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  const businessIdeas = [
    { title: "Poultry Farming", category: "agriculture", icon: <Egg /> },
    { title: "Dairy Farming", category: "agriculture", icon: <Milk /> },
    { title: "Grocery Shop", category: "retail", icon: <Store /> },
    { title: "Goat Farming", category: "agriculture", icon: <Drumstick /> },
    { title: "Vegetable Farming", category: "agriculture", icon: <Leaf /> },
    { title: "Fish Farming", category: "agriculture", icon: <Fish /> },
    { title: "Tailoring Shop", category: "services", icon: <Scissors /> },
    { title: "Beauty Parlour", category: "services", icon: <Scissors /> },
    { title: "Mobile Repair Shop", category: "services", icon: <Phone /> },
    { title: "Cycle Repair Shop", category: "services", icon: <Bike /> },
    { title: "Bee-Keeping", category: "agriculture", icon: <Leaf /> },
    { title: "Organic Fertilizer Production", category: "manufacturing", icon: <Factory /> },
    { title: "Papad and Pickle Making", category: "manufacturing", icon: <Utensils /> },
    { title: "Tea Shop", category: "retail", icon: <Coffee /> },
    { title: "Handicrafts", category: "manufacturing", icon: <Brush /> },
    { title: "Solar Panel Installation", category: "services", icon: <Factory /> },
    { title: "Seed and Fertilizer Store", category: "retail", icon: <Store /> },
    { title: "Animal Feed Business", category: "manufacturing", icon: <Factory /> },
    { title: "Transport Service", category: "services", icon: <Truck /> },
    { title: "Mushroom Farming", category: "agriculture", icon: <Leaf /> },
    { title: "Herbal Medicine Production", category: "manufacturing", icon: <Leaf /> },
    { title: "Bamboo Craft Business", category: "manufacturing", icon: <Brush /> },
    { title: "Poultry Feed Production", category: "manufacturing", icon: <Factory /> },
    { title: "Dairy Products Manufacturing", category: "manufacturing", icon: <Milk /> },
    { title: "Agricultural Consultancy", category: "services", icon: <BookCheck /> },
    { title: "Soil Testing Laboratory", category: "services", icon: <ScaleIcon /> },
    { title: "Organic Certification Agency", category: "services", icon: <Shield /> },
    { title: "Farm Equipment Rental", category: "services", icon: <Wrench /> },
    { title: "Agricultural Tourism", category: "services", icon: <Map /> },
    { title: "Bio-gas Plant Installation", category: "services", icon: <Zap /> },
    { title: "Seed Production Business", category: "agriculture", icon: <Sprout /> },
    { title: "Vermicompost Production", category: "manufacturing", icon: <Leaf /> },
    { title: "Poultry Vaccination Service", category: "services", icon: <Shield /> },
    { title: "Agricultural Insurance Agency", category: "services", icon: <Shield /> }
  ];

  const categories = {
        all: "All Categories",
        agriculture: "Agricultural Business",
        retail: "Retail Business",
        services: "Services",
    manufacturing: "Manufacturing",
    investment: "Investment & Finance"
  };

  const mipCategories = {
    all: "All Categories",
    banking: "Banking",
    community: "Community",
    business: "Business",
    gold: "Gold",
    agriculture: "Agriculture",
    market: "Market",
    digital: "Digital",
    government: "Government",
    "rural-business": "Rural Business",
    "real-estate": "Real Estate",
    "education": "Education",
    "healthcare": "Healthcare",
    "technology": "Technology"
  };

  const mipTranslations = {
    title: "Microinvestment Opportunities",
    subtitle: "Explore with your personal Investment Friend",
    description: "Empowering rural India through accessible and secure investment options",
    cta: "Get Started Today",
    startJourney: "Start Your Investment Journey",
    expertGuide: "Our financial experts are here to guide you through your investment journey",
    minimum: "Minimum Investment",
    returns: "Expected Returns"
  };

  const investmentOptions = [
    {
      title: "Recurring Deposit (RD)",
      description: "Secure returns with regular monthly savings. Available through banks and post offices.",
      minAmount: "₹100/month",
      returns: "5.5-6.5%",
      icon: <PiggyBank className="w-6 h-6" />,
      category: "banking"
    },
    {
      title: "Self-Help Groups (SHGs)",
      description: "Community-based savings and lending for collective development.",
      minAmount: "₹50/month",
      returns: "Variable",
      icon: <Users className="w-6 h-6" />,
      category: "community"
    },
    {
      title: "Microfinance Institutions (MFIs)",
      description: "Financial assistance for small businesses and self-employment initiatives.",
      minAmount: "₹1000",
      returns: "10-15%",
      icon: <Building className="w-6 h-6" />,
      category: "business"
    },
    {
      title: "Gold Investment Scheme",
      description: "Invest in digital and physical gold for a secure future.",
      minAmount: "₹100",
      returns: "Market Linked",
      icon: <Coins className="w-6 h-6" />,
      category: "gold"
    },
    {
      title: "Agriculture & Livestock Investment",
      description: "Invest in agriculture and livestock for sustainable income.",
      minAmount: "₹5000",
      returns: "15-25%",
      icon: <TrendingUp className="w-6 h-6" />,
      category: "agriculture"
    },
    {
      title: "Mutual Funds SIP",
      description: "Equity investment through regular Systematic Investment Plans.",
      minAmount: "₹500/month",
      returns: "10-12%",
      icon: <TrendingUp className="w-6 h-6" />,
      category: "market"
    },
    {
      title: "Digital Investment Apps",
      description: "Easy digital investments through smartphone applications.",
      minAmount: "₹10",
      returns: "Variable",
      icon: <Smartphone className="w-6 h-6" />,
      category: "digital"
    },
    {
      title: "Small Business Ventures",
      description: "Investment and growth in small business enterprises.",
      minAmount: "₹10000",
      returns: "20-30%",
      icon: <Store className="w-6 h-6" />,
      category: "business"
    },
    {
      title: "Government Investment Schemes",
      description: "PM-KISAN, Atal Pension Yojana and other government investment schemes.",
      minAmount: "Varies",
      returns: "8-9%",
      icon: <Landmark className="w-6 h-6" />,
      category: "government"
    },
    {
      title: "Rural Business Investment",
      description: "Investment in poultry farming, dairy farming, and other rural business ventures.",
      minAmount: "₹25,000",
      returns: "18-25%",
      icon: <TrendingUp className="w-6 h-6" />,
      category: "rural-business"
    },
    {
      title: "Real Estate Investment",
      description: "Invest in residential and commercial properties for long-term wealth creation.",
      minAmount: "₹50,000",
      returns: "12-18%",
      icon: <Home className="w-6 h-6" />,
      category: "real-estate"
    },
    {
      title: "Vehicle Investment Scheme",
      description: "Invest in commercial vehicles and earn from transportation business.",
      minAmount: "₹75,000",
      returns: "15-22%",
      icon: <Car className="w-6 h-6" />,
      category: "business"
    },
    {
      title: "Education Investment Fund",
      description: "Invest in educational institutions and skill development programs.",
      minAmount: "₹30,000",
      returns: "12-20%",
      icon: <GraduationCap className="w-6 h-6" />,
      category: "education"
    },
    {
      title: "Healthcare Investment",
      description: "Invest in medical facilities, pharmacies, and healthcare services.",
      minAmount: "₹40,000",
      returns: "16-24%",
      icon: <Heart className="w-6 h-6" />,
      category: "healthcare"
    },
    {
      title: "Technology Startups",
      description: "Invest in rural technology solutions and digital transformation projects.",
      minAmount: "₹60,000",
      returns: "25-35%",
      icon: <Globe2 className="w-6 h-6" />,
      category: "technology"
    },
    {
      title: "Insurance Investment",
      description: "Life insurance and health insurance schemes with investment benefits.",
      minAmount: "₹5,000/year",
      returns: "8-12%",
      icon: <ShieldCheck className="w-6 h-6" />,
      category: "government"
    },
    {
      title: "Skill Development Fund",
      description: "Invest in vocational training centers and skill development programs.",
      minAmount: "₹20,000",
      returns: "14-20%",
      icon: <Award className="w-6 h-6" />,
      category: "education"
    },
    {
      title: "Renewable Energy Investment",
      description: "Invest in solar power, biogas, and other renewable energy projects.",
      minAmount: "₹35,000",
      returns: "18-28%",
      icon: <Zap className="w-6 h-6" />,
      category: "technology"
    },
    {
      title: "Rural Tourism Investment",
      description: "Invest in homestays, farm tourism, and rural hospitality services.",
      minAmount: "₹45,000",
      returns: "16-25%",
      icon: <Map className="w-6 h-6" />,
      category: "business"
    },
    {
      title: "Organic Farming Investment",
      description: "Invest in organic farming, certification, and sustainable agriculture.",
      minAmount: "₹30,000",
      returns: "15-22%",
      icon: <Leaf className="w-6 h-6" />,
      category: "agriculture"
    }
  ];

  const filteredBusinessIdeas = activeCategory === 'all'
    ? businessIdeas
    : businessIdeas.filter(business => business.category === activeCategory);

  const filteredInvestmentOptions = selectedMIPCategory === 'all'
    ? investmentOptions
    : investmentOptions.filter(option => option.category === selectedMIPCategory);

  const renderMIPContent = () => (
    <div className="space-y-8">
      {/* MIP Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {mipTranslations.title}
          <span className="block text-xl font-normal text-gray-600 mt-2 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            {mipTranslations.subtitle}
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {mipTranslations.description}
        </p>
      </div>

      {/* MIP Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Object.entries(mipCategories).map(([key, value]) => (
          <button 
            key={key}
            onClick={() => setSelectedMIPCategory(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedMIPCategory === key
                ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Investment Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredInvestmentOptions.map((option, index) => (
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
                {option.title}
              </h3>
              <p className="text-gray-600 mb-6 h-20 leading-relaxed">
                {option.description}
              </p>
              <div className="flex justify-between items-center text-sm pt-4 border-t border-green-100">
                <div className="flex flex-col">
                  <span className="text-gray-500">{mipTranslations.minimum}</span>
                  <span className="font-semibold text-gray-900">{option.minAmount}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-gray-500">{mipTranslations.returns}</span>
                  <span className="font-semibold text-green-600">{option.returns}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Investment Guide Sections */}
      <div className="space-y-12 mt-16">
        {/* Overview Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
          <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
            <BookCheck className="w-6 h-6" />
            Investment Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-700">Why Invest?</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Build wealth through systematic investment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Generate passive income streams</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Secure your financial future</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Beat inflation and grow your money</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-700">Investment Principles</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Start early to benefit from compounding</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Diversify across different asset classes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Invest regularly (SIP approach)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Stay invested for the long term</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Planning Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
          <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
            <Target className="w-6 h-6" />
            Investment Planning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">Goal Setting</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Emergency fund (3-6 months expenses)</li>
                <li>• Short-term goals (1-3 years)</li>
                <li>• Medium-term goals (3-10 years)</li>
                <li>• Long-term goals (10+ years)</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">Risk Assessment</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Conservative (Low risk)</li>
                <li>• Moderate (Balanced risk)</li>
                <li>• Aggressive (High risk)</li>
                <li>• Time horizon consideration</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">Asset Allocation</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Equity investments (40-60%)</li>
                <li>• Fixed income (20-30%)</li>
                <li>• Gold/Commodities (10-15%)</li>
                <li>• Cash equivalents (5-10%)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Financing Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
          <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
            <DollarSign className="w-6 h-6" />
            Investment Financing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-green-700 mb-4">Funding Sources</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Personal Savings</span>
                  <span className="text-green-600 font-semibold">₹10,000 - ₹50,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Monthly Income</span>
                  <span className="text-green-600 font-semibold">₹2,000 - ₹10,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Government Schemes</span>
                  <span className="text-green-600 font-semibold">Subsidies Available</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Microfinance</span>
                  <span className="text-green-600 font-semibold">₹5,000 - ₹25,000</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-green-700 mb-4">Investment Strategy</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-800">Systematic Investment Plan (SIP)</h5>
                  <p className="text-sm text-blue-600">Invest fixed amounts regularly</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h5 className="font-medium text-purple-800">Lump Sum Investment</h5>
                  <p className="text-sm text-purple-600">Invest larger amounts at once</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h5 className="font-medium text-orange-800">Value Averaging</h5>
                  <p className="text-sm text-orange-600">Adjust investments based on market</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operations Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
          <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
            <Workflow className="w-6 h-6" />
            Investment Operations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-700">Daily Operations</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Monitor investment performance</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Track market movements</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Review portfolio allocation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Record transactions</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-700">Monthly Tasks</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Rebalance portfolio</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Review investment goals</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Analyze performance reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Update investment strategy</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-700">Quarterly Reviews</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Comprehensive portfolio review</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Risk assessment update</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Goal progress evaluation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Strategy adjustments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Risk Management Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
          <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6" />
            Risk Management
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-green-700 mb-4">Risk Types</h4>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg">
                  <h5 className="font-medium text-red-800">Market Risk</h5>
                  <p className="text-sm text-red-600">Fluctuations in market prices</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h5 className="font-medium text-yellow-800">Inflation Risk</h5>
                  <p className="text-sm text-yellow-600">Loss of purchasing power</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-800">Liquidity Risk</h5>
                  <p className="text-sm text-blue-600">Difficulty in selling assets</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h5 className="font-medium text-purple-800">Credit Risk</h5>
                  <p className="text-sm text-purple-600">Default by borrowers</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-green-700 mb-4">Risk Mitigation</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Diversification</span>
                    <p className="text-sm text-gray-600">Spread investments across different assets</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Insurance</span>
                    <p className="text-sm text-gray-600">Protect against major losses</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Regular Monitoring</span>
                    <p className="text-sm text-gray-600">Track performance and adjust strategy</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">Emergency Fund</span>
                    <p className="text-sm text-gray-600">Maintain 3-6 months of expenses</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Scaling & Growth Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
          <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
            <Sprout className="w-6 h-6" />
            Scaling & Growth
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-green-700 mb-4">Growth Strategy</h4>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">Phase 1: Foundation (0-2 years)</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Start with small investments</li>
                    <li>• Build emergency fund</li>
                    <li>• Learn investment basics</li>
                    <li>• Establish regular SIP</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">Phase 2: Expansion (2-5 years)</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Increase investment amounts</li>
                    <li>• Diversify portfolio</li>
                    <li>• Explore new opportunities</li>
                    <li>• Optimize asset allocation</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-medium text-purple-800 mb-2">Phase 3: Optimization (5+ years)</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Advanced investment strategies</li>
                    <li>• Tax optimization</li>
                    <li>• Estate planning</li>
                    <li>• Wealth preservation</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-green-700 mb-4">Performance Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Portfolio Value</span>
                  <span className="text-green-600 font-semibold">₹1,00,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Annual Returns</span>
                  <span className="text-green-600 font-semibold">12-15%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Risk Score</span>
                  <span className="text-yellow-600 font-semibold">Moderate</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Diversification</span>
                  <span className="text-blue-600 font-semibold">Good</span>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-green-700 mt-6 mb-4">Growth Opportunities</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span>Increase monthly investment amounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span>Explore international markets</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span>Invest in alternative assets</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span>Consider professional management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-br from-green-100 via-green-50 to-white rounded-2xl p-16 shadow-xl">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          {mipTranslations.startJourney}
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          {mipTranslations.expertGuide}
        </p>
        <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-10 py-4 rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
          {mipTranslations.cta}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Particle Effects */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Snake Cursor */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="snake-cursor"></div>
      </div>

      {/* Hero Section */}
      <div className="pt-16 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Business Opportunities
            </span>
          </h1>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up animation-delay-300">
              Discover innovative business options tailored for your region and unlock your entrepreneurial potential
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full mb-8 animate-width-expand"></div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {Object.entries(categories).map(([key, value], index) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-500 transform hover:scale-105 animate-fade-in-up ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200 scale-105 glow-effect'
                    : 'bg-white text-gray-600 hover:bg-green-50 shadow-md hover:shadow-lg border border-gray-100 hover:border-green-300'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {activeCategory === 'investment' ? (
          renderMIPContent()
        ) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredBusinessIdeas.map((business, index) => (
      <div
        key={index}
         className="group bg-gradient-to-br from-emerald-50 via-green-100 to-white rounded-xl hover:translate-y-[-6px] transition-all duration-500 hover:shadow-[0_30px_50px_-12px_rgba(16,185,129,0.12)] shadow-xl animate-fade-in-up hover:scale-105"
         style={{ animationDelay: `${index * 150}ms` }}
      >
                <div className="p-8 pb-6 cursor-pointer relative overflow-hidden" onClick={() => {
                  // Map business titles to their correct URL slugs
                  const titleToSlug = {
                    "Poultry Farming": "poultry-farming",
                    "Dairy Farming": "dairy-farming",
                    "Grocery Shop": "grocery-shop",
                    "Goat Farming": "goat-farming",
                    "Vegetable Farming": "vegetable-farming",
                    "Fish Farming": "fish-farming",
                    "Tailoring Shop": "tailoring-shop",
                    "Beauty Parlour": "beauty-parlour",
                    "Mobile Repair Shop": "mobile-repair",
                    "Cycle Repair Shop": "cycle-repair",
                    "Bee-Keeping": "bee-keeping",
                    "Organic Fertilizer Production": "organic-fertilizer-production",
                    "Papad and Pickle Making": "papad-and-pickle-making",
                    "Tea Shop": "tea-shop",
                    "Handicrafts": "handicrafts",
                    "Solar Panel Installation": "solar-panel-installation",
                    "Seed and Fertilizer Store": "seed-and-fertilizer-store",
                    "Animal Feed Business": "animal-feed-business",
                    "Transport Service": "transport-service",
                    "Mushroom Farming": "mushroom-farming",
                    "Herbal Medicine Production": "herbal-medicine",
                    "Bamboo Craft Business": "bamboo-craft",
                    "Poultry Feed Production": "poultry-feed-production",
                    "Dairy Products Manufacturing": "dairy-products",
                    "Agricultural Consultancy": "agri-consultancy",
                    "Soil Testing Laboratory": "soil-testing-lab",
                    "Organic Certification Agency": "organic-certification",
                    "Farm Equipment Rental": "farm-equipment-rental",
                    "Agricultural Tourism": "agricultural-tourism",
                    "Bio-gas Plant Installation": "bio-gas-plant",
                    "Seed Production Business": "seed-production",
                    "Vermicompost Production": "vermicompost-production",
                    "Poultry Vaccination Service": "poultry-vaccination",
                    "Agricultural Insurance Agency": "agricultural-insurance"
                  };
                  
                  const slug = titleToSlug[business.title] || business.title.toLowerCase().replace(/\s+/g, '-');
                  const url = `/business-guide/${slug}`;
                  navigate(url);
                }}>
                  {/* Hover overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-500"></div>
                  
                  <div className="flex items-start space-x-6 mb-3 relative z-10">
            <div className="p-4 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-all duration-500 group-hover:scale-110">
              {React.cloneElement(business.icon, { 
                        className: 'w-8 h-8 text-emerald-600 group-hover:text-emerald-700 transition-all duration-300'
              })}
            </div>
            <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 p-2 group-hover:text-emerald-700 transition-colors duration-300">
                        {business.title}
              </h3>
              <p className="text-sm text-gray-500 pl-2 group-hover:text-emerald-600 transition-colors duration-300">
                        {categories[business.category]}
              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    ))}
  </div>
        )}
</main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 RuralVentures
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors duration-300">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Add required animations and snake cursor styles
const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
  
  .animate-width-expand {
    animation: width-expand 1.5s ease-out forwards;
  }
  
  .animation-delay-300 {
    animation-delay: 0.3s;
  }
  
  /* Snake Cursor */
  .snake-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, #10b981, #059669);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
    opacity: 0;
  }
  
  .snake-cursor::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  
  .snake-cursor::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(16, 185, 129, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
  }
  
  /* Snake cursor trail */
  .snake-trail {
    position: fixed;
    width: 6px;
    height: 6px;
    background: rgba(16, 185, 129, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
  }

  /* New Particle Styles */
  .particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1; /* Ensure particles are behind other content */
  }

  .particle {
    position: absolute;
    background: rgba(16, 185, 129, 0.3); /* Green with opacity */
    border-radius: 50%;
    animation: float 10s infinite ease-in-out;
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) scale(0.5);
      opacity: 0;
    }
    25% {
      opacity: 0.7;
    }
    50% {
      transform: translateY(-20px) translateX(20px) scale(0.7);
      opacity: 0.5;
    }
    75% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(0) translateX(0) scale(0.5);
      opacity: 0;
    }
  }

  /* New Animation Styles */
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes width-expand {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  .glow-effect {
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5),
                 0 0 20px rgba(16, 185, 129, 0.3),
                 0 0 30px rgba(16, 185, 129, 0.2);
  }
`;
document.head.appendChild(style);

export default RuralBusinessOpportunities; 