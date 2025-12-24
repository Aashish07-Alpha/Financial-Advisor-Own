import React, { useState } from "react";
import {
  Menu,
  X,
  Globe,
  BookOpen,
  Users,
  Shield,
  BadgeDollarSign,
  Play,
  Pause,
  ArrowUpRight,
  User,
  Briefcase,
  GraduationCap,
  Map,
  Newspaper,
  Calculator,
  UserCheck,
  Award,
  Book,
  Compass,
  Newspaper as News,
  Calculator as Calc,
  BadgeSwissFranc, FileText, Bot ,Receipt
} from "lucide-react";

import Features from "../components/Features";
import NavBar from "../components/NavBar"; // Import NavBar
import Footer from "../components/Footer";
import "../LandingPage/Hero/Hero.css";


const translations = {
  en: {
    nav: {
      home: "Home",
      features: "Features",
      community: "Community",
      learning: "Learning",
      contact: "Contact",
    },
    hero: {
      title: "Smart Financial Planning for Your Future",
      subtitle:
        "Expert guidance, micro-investments, and government schemes all in one place",
      cta: "Get Started",
    },
    features: {
      // title: "Why Choose Us",
      // description:
      //   "Discover the tools and resources that make us your ideal partner in your journey to success.",
      // items: [
      //   {
      //     title: "User Profiles",
      //     description: "View and manage detailed user profiles",
      //     link: "/profiles",
      //     icon: User,
      //   },
      //   {
      //     title: "Schemes & Benefits",
      //     description: "View and manage detailed user profiles",
      //     link: "/scheme",
      //     icon: Shield,
      //   },
      //   {
      //     title: "Learning Center",
      //     description: "Access courses and educational content",
      //     link: "/learn",
      //     icon: BookOpen,
      //   },
      //   {
      //     title: "Roadmap",
      //     description: "Access courses and educational content",
      //     link: "/road",
      //     icon: Map,
      //   },
      //   {
      //     title: "Daily Tech News",
      //     description: "Stay updated with the latest tech news",
      //     link: "/news",
      //     icon: Newspaper,
      //   },
      //   {
      //     title: "PPF Calculator",
      //     description: "Calculate your PPF investments and returns",
      //     link: "/ppf",
      //     icon: Calculator,
      //   },
      //   {
      //     title: "Women's Portal",
      //     description:
      //       "Empowering women through financial independence and support",
      //     link: "/womens",
      //     icon: Users,
      //   },
      //   {
      //     title: "Microinvestment Opportunities",
      //     description:
      //       "Explore the latest investment opportunities for small investors",
      //     link: "/mip",
      //     icon: BadgeDollarSign,
      //   },
      //   {
      //     title: "Rural Business Opportunities",
      //     description:
      //       "Explore the latest investment opportunities for small investors",
      //     link: "/rural",
      //     icon: Briefcase,
      //   },
      //   {
      //     title: "Community ",
      //     description:
      //       "Join the community to discuss and share ideas with other users",
      //     link: "/community",
      //     icon: Users,
      //   },
      //   {
      //     title: "Success Stories",
      //     description:
      //       "Read inspiring stories of individuals who have overcome adversity",
      //     link: "/stories",
      //     icon: Award,
      //   },
      //   {
      //     title: "QnA Sessions",
      //     description:
      //       "Participate in live QnA sessions with financial experts",
      //     link: "/qna",
      //     icon: GraduationCap,
      //   },
      // ],
      items: [
        {
          title: "Financial Advisor - Chatbot",
          description: "Get personalized financial advice from our AI-powered chatbot",
          link: "/advisor",
          icon: Bot,
        },
        // {
        //   title: "Learning Center",
        //   description: "Access courses and educational content",
        //   link: "/learn",
        //   icon: BookOpen,
        // },
        // {
        //   title: "Roadmap",
        //   description: "Explore a tailored roadmap to financial success",
        //   link: "/road",
        //   icon: Map,
        // },

        {
          title: "Business Opportunities",
          description: "Explore business opportunities in India",
          link: "/rural",
          icon: Briefcase,
        },
        {
          title: "Schemes & Benefits",
          description: "View and manage detailed government schemes and benefits",
          link: "/scheme",
          icon: Shield,
        },
        {
          title: "Community",
          description: "Join the community to discuss and share ideas with other users",
          link: "/community",
          icon: Users,
        },
        {
          title: "QnA Sessions",
          description: "Participate in live QnA sessions with financial experts",
          link: "/qna",
          icon: GraduationCap,
        },
        {
          title: "Success Stories",
          description: "Read inspiring stories of individuals who have overcome adversity",
          link: "/stories",
          icon: Award,
        },
        // {
        //   title: "Women's Portal",
        //   description: "Empowering women through financial independence and support",
        //   link: "/womens",
        //   icon: Users,
        // },
        {
          title: "OCR Based Finance Doc Reading",
          description: "Scan and understand financial documents with AI-powered OCR",
          link: "/ocr",
          icon: FileText,
        },
        {
          title: "Expense Tracker", // Added expense tracker
          description: "Track and manage your daily expenses with smart categorization and budget insights",
          link: "/expenses",
          icon: Receipt,
        },
        {
          title: "Financial Scams", 
          description: "Learn financial scams through interactive visulisations",
          link: "/scams",
          icon: Shield,
        },
        // {
        //   title: "Security Checker", 
        //   description: "Verify the security of financial websites and protect yourself from online fraud",
        //   link: "/securitycheck",
        //   icon: Shield,
        // },

        {
          title: "Fun And Learn", 
          description: "Learn financial concepts through interactive games and quizzes",
          link: "/game",
          icon: BookOpen,
        },
      ]
      
    },
    successStories: {
      title: "Success Stories of the Underprivileged",
      subtitle: "Inspiring journeys of overcoming adversity",
      steps: [
        {
          title: "Rising from Poverty",
          description:
            "A story of determination and hard work leading to financial stability",
          icon: "🌟",
          youtubeId: "zZ-VeqYPxoA",
        },
        {
          title: "Empowering Women",
          description:
            "How micro-financing helped women start their own businesses",
          icon: "👩‍💼",
          youtubeId: "i9UYbJ2xMTI",
        },
        {
          title: "Education for All",
          description: "Providing education to children in impoverished areas",
          icon: "📚",
          youtubeId: "VILohre4Q6w",
        },
        {
          title: "Community Support",
          description:
            "Building a support network to uplift entire communities",
          icon: "🤝",
          youtubeId: "EsrJ_NKBkww",
        },
        {
          title: "Community Support",
          description:
            "Building a support network to uplift entire communities",
          icon: "🤝",
          youtubeId: "EsrJ_NKBkww",
        },
      ],
    },
  },
  hi: {
    nav: {
      home: "होम",
      features: "सुविधाएं",
      community: "समुदाय",
      learning: "शिक्षा",
      contact: "संपर्क",
    },
    hero: {
      title: "आपके भविष्य के लिए स्मार्ट वित्तीय योजना",
      subtitle:
        "विशेषज्ञ मार्गदर्शन, माइक्रो-निवेश और सरकारी योजनाएं एक ही जगह पर",
      cta: "शुरू करें",
    },
    features: {
      title: "हमें क्यों चुनें",
      description:
        "सफलता की यात्रा में आपका आदर्श साथी बनने के लिए हमारे उपकरण और संसाधनों की खोज करें।",
      items: [
        {
          title: "उपयोगकर्ता प्रोफाइल",
          description: "विस्तृत उपयोगकर्ता प्रोफाइल देखें और प्रबंधित करें",
          link: "/profiles",
          icon: <UserCheck />,
        },
        {
          title: "योजना आणि लाभ",
          description: "विस्तृत वापरकर्ता प्रोफाइल पहा आणि व्यवस्थापित करा",
          link: "/scheme",
          icon: <Award />,
        },
        {
          title: "लर्निंग सेंटर",
          description: "पाठ्यक्रमों और शैक्षिक सामग्री तक पहुंचें",
          link: "/learn",
          icon: <Book />,
        },
        {
          title: "रोडमैप",
          description: "पाठ्यक्रमों और शैक्षिक सामग्री तक पहुंचें",
          link: "/road",
          icon: <Compass />,
        },
        {
          title: "दैनिक टेक समाचार",
          description: "नवीनतम तकनीकी समाचारों से अपडेट रहें",
          link: "/news",
          icon: <News />,
        },
        {
          title: "पीपीएफ कैलकुलेटर",
          description: "अपने पीपीएफ निवेश और रिटर्न की गणना करें",
          link: "/ppf",
          icon: <Calc />,
        },
        {
          title: "महिला पोर्टल",
          description:
            "वित्तीय स्वतंत्रता और समर्थन के माध्यम से महिलाओं को सशक्त बनाना",
          link: "/womens-portal",
          icon: <BadgeSwissFranc />,
        },
      ],
    },
    successStories: {
      title: "सफलता की यात्रा",
      subtitle: "हमारी चरण-दर-चरण प्रक्रिया",
      steps: [
        {
          title: "खोज और व्यक्तिगतकरण",
          description: "हम आपके वित्तीय लक्ष्यों का विश्लेषण करते हैं",
          icon: "🎯",
        },
        {
          title: "डिज़ाइन में साझेदार",
          description: "हम साथ मिलकर आपकी निवेश रणनीति बनाते हैं",
          icon: "🤝",
        },
        {
          title: "कार्यान्वयन",
          description: "विशेषज्ञ मार्गदर्शन के साथ योजना को लागू करें",
          icon: "⚡",
        },
        {
          title: "निरंतर विकास",
          description: "नियमित निगरानी और अनुकूलन",
          icon: "📈",
        },
      ],
    },
  },
};

const SuccessStoryTimeline = ({ steps }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-8 mb-16 relative`}
        >
          {/* Timeline connector */}
          <div className="hidden md:block absolute h-full w-0.5 bg-green-200 left-1/2 transform -translate-x-1/2 -z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-green-400 rounded-full border-4 border-white shadow" />
          </div>

          {/* YouTube Video Container */}
          <div className="w-full md:w-1/2 relative">
            <div
              className="relative rounded-xl overflow-hidden shadow-lg"
              style={{ height: "315px" }}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${step.youtubeId}?start=1&autoplay=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="backdrop-blur-sm bg-white/50 rounded-xl p-6">
              {/* Step Number */}
              <div className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-4">
                Step {index + 1}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {step.description}
              </p>

              <div className="pt-4 border-t border-gray-100/20">
                <p className="text-gray-500 text-sm">{step.extraDescription}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white relative overflow-x-hidden">
        <NavBar language={language} toggleLanguage={toggleLanguage} t={t.nav} />
        <header className="text-center pt-24">
          <h1 className="text-4xl font-bold text-green-800">{t.hero.title}</h1>
          <p className="mt-4 text-green-600">{t.hero.subtitle}</p>
        </header>
        <Features t={t.features} />
        {/* All sections flow naturally, no scroll snap or sticky */}
      </div>
    </>
  );
};

export default LandingPage;