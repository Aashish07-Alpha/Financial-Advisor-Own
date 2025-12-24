import React from "react";
import { Layout } from "lucide-react";
import { UserCircle } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import "../LandingPage/Hero/Hero.css";

const HomePage = () => {
  const features = [
    {
      icon: UserCircle,
      title: "User Profiles",
      description: "View and manage detailed user profiles",
      link: "/profiles",
    },
    {
      icon: BookOpen,
      title: "Learning Center",
      description: "Access courses and educational content",
      link: "/learn",
    },
    {
      icon: BookOpen,
      title: "Roadmap",
      description: "Access courses and educational content",
      link: "/road",
    },
    {
      icon: Newspaper,
      title: "Daily Tech News",
      description: "Stay updated with the latest tech news",
      link: "/news",
    },

  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 relative overflow-x-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-32 -left-32 w-[22rem] h-[22rem] bg-green-200 opacity-30 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-[26rem] h-[26rem] bg-green-400 opacity-20 rounded-full blur-3xl z-0"></div>
      {/* Header */}
      <div className="flex items-center justify-center mb-12 pt-16 animate-fade-in-slow">
        <Layout className="w-12 h-12 text-white mr-4 drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">Central Hub</h1>
      </div>
      <div className="flex justify-center mb-8 animate-fade-in">
        <Link to="/login" className="button bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-green-600 hover:to-blue-600 transition text-lg">Login</Link>
      </div>
      {/* Feature Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <a
                key={feature.title}
                href={feature.link}
                className="group p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-lg hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20 shadow-xl hover:shadow-2xl flex flex-col items-center text-center animate-pop-in"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <Icon className="w-14 h-14 text-blue-200 group-hover:text-blue-100 mb-4 drop-shadow" />
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow">
                  {feature.title}
                </h3>
                <p className="text-blue-100 text-lg">{feature.description}</p>
              </a>
            );
          })}
        </div>
        {/* Footer */}
        <footer className="mt-16 text-center text-blue-100 text-base animate-fade-in-slow">
          <p>© 2024 Central Hub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
