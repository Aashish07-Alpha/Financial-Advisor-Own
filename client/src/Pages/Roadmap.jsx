import React, { useState, useEffect } from "react";
import {
  CircleDollarSign,
  CheckCircle2,
  ChevronDown,
  X,
  ExternalLink,
  BookOpen,
  Play,
  Eye,
  Star,
  PiggyBank,
  CreditCard,
  Save,
  Shield,
  PhoneCall,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../LandingPage/Footer/Footer";

const RoadmapWithModals = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("learningProgress");
    return saved ? JSON.parse(saved) : {};
  });

   const steps = [
    {
      id: 1,
      title: "Basic Financial Literacy",
      icon: CircleDollarSign,
      description: "Learn to manage money properly and develop saving habits",
      videoId: "WN9Mks1s4tM",
      article: {
        intro: "Start your financial journey with basic money management knowledge.",
        sections: [
          {
            title: "Understanding Income and Expenses",
            content: "Track your income and expenses systematically.",
            points: [
              "Create a monthly income and expense list",
              "Start small savings, like ₹10 daily"
            ],
          },
          {
            title: "Benefits of Banking",
            content: "Learn the advantages of opening a bank account and using banking services.",
            points: [
              "Open a basic savings account",
              "Learn cash deposit and withdrawal methods"
            ],
          },
        ],
      },
    },
    {
      id: 2,
      title: "Opening a Bank Account",
      icon: PiggyBank,
      description: "Open a bank account to keep your money safe and secure",
      videoId: "abc67890",
      article: {
        intro: "After opening a bank account, explore savings and investment options.",
        sections: [
          {
            title: "Savings Deposits and Fixed Deposits",
            content: "Understand depositing money in banks and secure investments.",
            points: [
              "Learn about Fixed Deposits and Recurring Deposits",
              "Learn to deposit money in banks"
            ],
          },
        ],
      },
    },
    {
      id: 3,
      title: "Understanding Loans and Credit",
      icon: CreditCard,
      description: "Use loans and credit properly and repay on time",
      videoId: "def11223",
      article: {
        intro: "Understand the proper use of loans and importance of timely repayment.",
        sections: [
          {
            title: "Difference Between Good and Bad Loans",
            content: "Use loans for the right purposes.",
            points: [
              "Take loans for agriculture, business, or education",
              "Avoid informal loans"
            ],
          },
        ],
      },
    },
    {
      id: 4,
      title: "Emergency Fund and Future Savings",
      icon: Save,
      description: "Develop habits of saving and investing for emergencies and future needs",
      videoId: "ghi45678",
      article: {
        intro: "Understand the importance of securing funds for emergencies and future.",
        sections: [
          {
            title: "Creating Emergency Fund",
            content: "Save money for unexpected problems.",
            points: [
              "Start saving for essential expenses",
              "Make regular deposits"
            ],
          },
        ],
      },
    },
    {
      id: 5,
      title: "Insurance and Secure Investments",
      icon: Shield,
      description: "Learn the importance of health, life, and crop insurance and make secure investments",
      videoId: "jkl78901",
      article: {
        intro: "Get information about insurance and secure investments.",
        sections: [
          {
            title: "Health and Life Insurance",
            content: "Insurance provides protection to the family.",
            points: [
              "Join government insurance schemes",
              "Explore agricultural insurance options"
            ],
          },
        ],
      },
    },
    {
      id: 6,
      title: "Using Digital Tools",
      icon: PhoneCall,
      description: "Learn to conduct transactions through mobile banking and online payments",
      videoId: "mno34567",
      article: {
        intro: "Learn to conduct secure transactions with digital tools.",
        sections: [
          {
            title: "Mobile Banking and UPI",
            content: "Learn to send and receive money on digital platforms.",
            points: [
              "Set up UPI for easy payments",
              "Use mobile banking apps safely"
            ],
          },
        ],
      },
    },
    {
      id: 7,
      title: "Government Schemes and Benefits",
      icon: BookOpen,
      description: "Learn about government financial schemes and how to benefit from them",
      videoId: "pqr89012",
      article: {
        intro: "Explore government schemes designed for financial inclusion.",
        sections: [
          {
            title: "PMJDY and Financial Inclusion",
            content: "Access to basic banking services for all.",
            points: [
              "Open Jan Dhan Yojana account",
              "Avail government subsidies directly"
            ],
          },
        ],
      },
    },
    {
      id: 8,
      title: "Investment Planning",
      icon: Star,
      description: "Plan your investments based on goals and risk tolerance",
      videoId: "stu23456",
      article: {
        intro: "Create a personalized investment strategy for your financial goals.",
        sections: [
          {
            title: "Setting Financial Goals",
            content: "Define clear financial objectives and timelines.",
            points: [
              "Short-term goals (1-3 years)",
              "Long-term goals (5+ years)"
            ],
          },
        ],
      },
    },
    {
      id: 9,
      title: "Tax Planning and Compliance",
      icon: CheckCircle2,
      description: "Understand tax obligations and plan your finances accordingly",
      videoId: "vwx56789",
      article: {
        intro: "Learn about tax planning and compliance requirements.",
        sections: [
          {
            title: "Income Tax Basics",
            content: "Understand your tax obligations and benefits.",
            points: [
              "File income tax returns on time",
              "Claim eligible deductions"
            ],
          },
        ],
      },
    },
    {
      id: 10,
      title: "Retirement Planning",
      icon: Eye,
      description: "Start planning for retirement early with proper investment strategies",
      videoId: "yza12345",
      article: {
        intro: "Begin retirement planning early for a secure financial future.",
        sections: [
          {
            title: "Pension Schemes and NPS",
            content: "Explore government and private pension options.",
            points: [
              "Join National Pension System (NPS)",
              "Consider EPF and PPF options"
            ],
          },
        ],
      },
    },
  ];
  useEffect(() => {
    localStorage.setItem("learningProgress", JSON.stringify(progress));
  }, [progress]);

  const markComplete = (stepId, type) => {
    setProgress((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [type]: true,
      },
    }));
  };

  const getStepProgress = (stepId) => {
    const stepProgress = progress[stepId] || {};
    return {
      video: stepProgress.video || false,
      article: stepProgress.article || false,
    };
  };

  const openVideo = (step) => {
    setSelectedContent(step);
    setShowVideoModal(true);
    markComplete(step.id, "video");
  };

  const openArticle = (step) => {
    setSelectedContent(step);
    setShowArticleModal(true);
    markComplete(step.id, "article");
  };

  // Progress calculation
  const totalTasks = steps.length * 2;
  const completedTasks = steps.reduce((acc, step) => {
    const prog = getStepProgress(step.id);
    return acc + (prog.video ? 1 : 0) + (prog.article ? 1 : 0);
  }, 0);
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <>
      <NavBar language="en" toggleLanguage={() => {}} />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-2 sm:px-4">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl relative overflow-hidden">

          {/* Progress Bar */}
          <div className="px-8 pt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-700 font-semibold text-lg">Progress</span>
              <span className="text-green-700 font-semibold text-lg">{progressPercent}%</span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-t-3xl p-10 text-white shadow-lg mt-4 animate-fadeIn">
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-lg">Financial Education Journey</h1>
            <p className="text-green-100 text-lg">Advance your financial journey and learn</p>
          </div>

          {/* Main Roadmap */}
          <div className="relative p-8">
            {/* Timeline */}
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-green-300 via-green-100 to-transparent rounded-full shadow-md" />
            <div className="relative space-y-20">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const stepProgress = getStepProgress(step.id);
                const isCompleted = stepProgress.video && stepProgress.article;
                const isPartial = stepProgress.video || stepProgress.article;
                const isLast = index === steps.length - 1;

                return (
                  <div key={step.id} className="relative flex flex-col sm:flex-row items-center gap-8 group animate-fadeIn">
                    {/* Step Number & Icon */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white transition-all duration-300 group-hover:scale-105
                          ${isCompleted
                            ? "bg-gradient-to-br from-green-400 to-green-600 animate-bounceIn"
                            : isPartial
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-600 animate-bounceIn"
                            : "bg-gradient-to-br from-gray-300 to-gray-400"
                          }`}
                        style={{ boxShadow: "0 8px 32px 0 rgba(34,197,94,0.15)" }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold bg-white text-green-700 px-3 py-1 rounded-full shadow border border-green-100">
                          Step {index + 1}
                        </span>
                        {isCompleted ? (
                          <CheckCircle2 size={40} className="drop-shadow-md animate-bounce" />
                        ) : (
                          <Icon size={40} className="drop-shadow-md group-hover:animate-pulse" />
                        )}
                      </div>
                      {isPartial && !isCompleted && (
                        <div className="absolute -bottom-3 right-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center shadow-md border-2 border-white animate-bounceIn">
                          <Eye size={18} className="text-yellow-600" />
                        </div>
                      )}
                    </div>

                    {/* Step Card */}
                    <div className="flex-1 bg-gradient-to-br from-white via-green-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-green-100 p-8">
                      <h3 className="font-bold text-2xl mb-2 text-gray-800 flex items-center gap-2">
                        <Star className="text-yellow-400" size={20} /> {step.title}
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg">{step.description}</p>
                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() => openVideo(step)}
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow
                            ${stepProgress.video
                              ? "bg-green-50 text-green-700 border-2 border-green-300 hover:bg-green-100"
                              : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                            }`}
                        >
                          {stepProgress.video ? <CheckCircle2 size={20} /> : <Play size={20} />}
                          <span>{stepProgress.video ? "Completed" : "Watch Video"}</span>
                        </button>
                        <button
                          onClick={() => openArticle(step)}
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow
                            ${stepProgress.article
                              ? "bg-green-50 text-green-700 border-2 border-green-300 hover:bg-green-100"
                              : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800"
                            }`}
                        >
                          {stepProgress.article ? <CheckCircle2 size={20} /> : <BookOpen size={20} />}
                          <span>{stepProgress.article ? "Read" : "Read Article"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Timeline Arrow */}
                    {!isLast && (
                      <div className="absolute left-1/2 top-full transform -translate-x-1/2 mt-4 z-0">
                        <ChevronDown size={32} className="text-green-300 animate-bounce" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Video Modal */}
          {showVideoModal && selectedContent && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border-2 border-green-200 relative">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center rounded-t-2xl bg-gradient-to-r from-green-50 to-green-100">
                  <h3 className="font-bold text-2xl text-gray-800 flex items-center gap-2">
                    <Play className="text-blue-500" /> {selectedContent.title}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href={`https://www.youtube.com/watch?v=${selectedContent.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                      title="YouTube पर खोलें"
                    >
                      <ExternalLink size={24} />
                    </a>
                    <button
                      onClick={() => setShowVideoModal(false)}
                      className="text-gray-500 hover:text-red-500 transition-colors rounded-full p-1 bg-gray-100"
                      title="बंद करें"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedContent.videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-b-2xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Article Modal */}
          {showArticleModal && selectedContent && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border-2 border-green-200 relative">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-green-50 to-green-100 rounded-t-2xl sticky top-0 z-10">
                  <h3 className="font-bold text-2xl text-gray-800 flex items-center gap-2">
                    <BookOpen className="text-gray-700" /> {selectedContent.title}
                  </h3>
                  <button
                    onClick={() => setShowArticleModal(false)}
                    className="text-gray-500 hover:text-red-500 transition-colors rounded-full p-1 bg-gray-100"
                    title="बंद करें"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-8 overflow-y-auto max-h-[calc(80vh-5rem)]">
                  <div className="prose max-w-none">
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                      {selectedContent.article.intro}
                    </p>
                    {selectedContent.article.sections.map((section, idx) => (
                      <div key={idx} className="mb-10">
                        <h4 className="text-2xl font-semibold mb-4 text-green-700 flex items-center gap-2">
                          <Star className="text-yellow-400" size={18} /> {section.title}
                        </h4>
                        <p className="mb-6 text-gray-600 text-lg leading-relaxed">
                          {section.content}
                        </p>
                        <ul className="space-y-4">
                          {section.points.map((point, pidx) => (
                            <li key={pidx} className="flex items-start gap-3">
                              <div className="mt-2">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                              </div>
                              <span className="text-gray-700 text-lg">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoadmapWithModals;