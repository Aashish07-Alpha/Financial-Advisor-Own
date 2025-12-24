import React, { useState } from "react";
import { Book, Award, ChevronDown, ChevronUp } from "lucide-react";
import NavBar from "../components/NavBar"; // Import NavBar
import Footer from "../components/Footer";
import women1 from './women1.webp';
import women2 from './women2.jpg';
import women3 from './women3.webp';
import women4 from './women1.webp';

// Add this array before the WomenEmpowerment component
const microinvestments = [
  {
    id: 1,
    title: "Micro SIP Investment",
    amount: "₹500/month",
    description: "Start investing in mutual funds with as little as ₹500 per month",
    returns: "12-15% expected annual returns",
    risk: "Moderate",
    duration: "Flexible"
  },
  {
    id: 2,
    title: "Small Business Group Fund",
    amount: "₹1000/month",
    description: "Join group investment pools for small business funding",
    returns: "15-18% expected annual returns",
    risk: "Moderate to High",
    duration: "2-3 years"
  },
  {
    id: 3,
    title: "Digital Gold Savings",
    amount: "₹100/day",
    description: "Invest in digital gold with daily micro-payments",
    returns: "8-10% expected annual returns",
    risk: "Low",
    duration: "Flexible"
  },
  {
    id: 4,
    title: "P2P Lending",
    amount: "₹750/month",
    description: "Participate in peer-to-peer lending networks",
    returns: "14-16% expected annual returns",
    risk: "High",
    duration: "6-12 months"
  }
];

// Add this array with the other data arrays
const successStories = [
  {
    id: 1,
    name: "Pushpa Devi",
    business: "Dairy Cooperative Leader",
    image: women1,
    story: "Started with two cows, now leads a 100-member women's dairy cooperative in rural Bihar",
    achievement: "Monthly turnover of ₹15 lakhs through milk production",
    quote: "Our village's women are now self-reliant through dairy farming."
  },
  {
    id: 2,
    name: "Lalita Bai",
    business: "Handicraft Collective",
    image: women2,
    story: "Transformed traditional bamboo crafting into a profitable rural enterprise",
    achievement: "Employs 30 village women in sustainable crafts",
    quote: "Traditional skills can create modern opportunities."
  },
  {
    id: 3,
    name: "Savitri Devi",
    business: "Organic Farming Group",
    image: women3,
    story: "Led 25 women to convert barren land into organic vegetable farms",
    achievement: "Supplies organic produce to 5 nearby towns",
    quote: "Organic farming brought prosperity to our village women."
  },
  {
    id: 4,
    name: "Meena Kumari",
    business: "Rural Food Processing Unit",
    image: women4,
    story: "Started pickle-making from home, now runs a small food processing unit",
    achievement: "Products sold in 3 districts through self-help groups",
    quote: "Traditional recipes became our path to success."
  }
];

const WomenEmpowerment = () => {
  const [expandedScheme, setExpandedScheme] = useState(null);
  const [language, setLanguage] = useState("en");

  const schemes = [
    {
      id: 1,
      title: "Mahila Samridhi Yojana",
      description:
        "A micro-credit facility for women to start their own businesses with loans up to ₹60,000.",
      benefits: [
        "Low interest rates at 4% per annum",
        "No collateral required for loans",
        "Quick loan processing within 15 days",
        "Business training and support provided",
      ],
      eligibility: "Women aged 18-55 years from low-income households",
    },
    {
      id: 2,
      title: "Pradhan Mantri Matru Vandana Yojana",
      description:
        "Maternity benefit program providing financial assistance to pregnant and lactating mothers.",
      benefits: [
        "Cash incentive of ₹5,000 in three installments",
        "Direct bank transfer to beneficiary",
        "Compensation for wage loss",
        "Promotes proper nutrition and feeding practices",
      ],
      eligibility: "Pregnant and lactating mothers for first live birth",
    },
    {
      id: 3,
      title: "Beti Bachao Beti Padhao",
      description:
        "Initiative to promote girl child education and improve child sex ratio.",
      benefits: [
        "Free education for girl child",
        "Scholarship programs",
        "Health and nutrition support",
        "Awareness campaigns against gender bias",
      ],
      eligibility: "All girl children and their families",
    },
    {
      id: 4,
      title: "Sukanya Samriddhi Yojana",
      description:
        "Government-backed saving scheme for girl child education and marriage expenses.",
      benefits: [
        "High interest rate of 7.6% per annum",
        "Tax benefits under Section 80C",
        "Partial withdrawal allowed for education",
        "Maturity period of 21 years",
      ],
      eligibility: "Parents/guardians of girl child below 10 years",
    },
  ];

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "hi" : "en"));
  };

  return (
    <>
      <NavBar language={language} toggleLanguage={toggleLanguage} />
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-pink-50 to-lavender-50">
        {/* Update header gradient */}
        <header className="bg-gradient-to-r from-fuchsia-600 via-pink-500 to-purple-500 text-white py-12 px-6 mt-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Women Empowerment Portal
            </h1>
            <p className="text-lg opacity-90">
              Empowering women through financial independence and support
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Government Schemes Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pink-500">
              <div className="flex items-center space-x-3 text-pink-600 mb-2">
                <Book className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Government Schemes</h2>
              </div>
              <p className="text-gray-600">
                Explore various government initiatives designed to support
                women.
              </p>
            </div>

            {/* Microfinance Investment Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pink-500 cursor-pointer hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 text-pink-600 mb-2">
                <Book className="w-6 h-6" />
                <h2 className="text-xl font-semibold">
                  Microfinance Investment
                </h2>
              </div>
              <p className="text-gray-600">
                Coming soon: Discover micro-investment opportunities tailored
                for women.
              </p>
            </div>

            {/* Success Stories Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pink-500 cursor-pointer hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 text-pink-600 mb-2">
                <Award className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Success Stories</h2>
              </div>
              <p className="text-gray-600">
                Coming soon: Get inspired by stories of successful women
                entrepreneurs.
              </p>
            </div>
          </div>

          {/* Government Schemes Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Available Government Schemes
            </h2>

            {schemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left hover:bg-pink-50 transition-colors duration-200"
                  onClick={() =>
                    setExpandedScheme(
                      expandedScheme === scheme.id ? null : scheme.id
                    )
                  }
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {scheme.title}
                    </h3>
                    {expandedScheme === scheme.id ? (
                      <ChevronUp className="w-5 h-5 text-pink-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-pink-500" />
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{scheme.description}</p>
                </button>

                {expandedScheme === scheme.id && (
                  <div className="px-6 py-4 bg-pink-50 border-t border-pink-100">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-pink-600 mb-2">
                          Benefits:
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {scheme.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-pink-600 mb-2">
                          Eligibility:
                        </h4>
                        <p className="text-gray-700">{scheme.eligibility}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Microinvestment Opportunities Section */}
          <section className="space-y-4 mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Microinvestment Opportunities
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {microinvestments.map((investment) => (
                <div
                  key={investment.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-pink-600">
                        {investment.title}
                      </h3>
                      <span className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
                        {investment.amount}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{investment.description}</p>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Returns:</span>
                        <p className="font-medium text-green-600">{investment.returns}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Risk Level:</span>
                        <p className="font-medium text-orange-600">{investment.risk}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <p className="font-medium text-blue-600">{investment.duration}</p>
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Add Success Stories Section */}
          <section className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-100/50 to-purple-100/50 rounded-3xl -z-10"></div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Inspiring Success Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8 p-6">
              {successStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0  z-50"></div>
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 text-white z-20">
                      <h3 className="text-xl font-bold">{story.name}</h3>
                      <p className="text-sm text-fuchsia-100">{story.business}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{story.story}</p>
                    <div className="bg-gradient-to-r from-fuchsia-50 to-purple-50 rounded-lg p-4">
                      <p className="text-fuchsia-700 font-medium">"{story.quote}"</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">Achievement:</span>
                      <span className="text-sm font-medium text-fuchsia-600">
                        {story.achievement}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default WomenEmpowerment;
