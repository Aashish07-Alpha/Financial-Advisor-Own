import React from 'react'
import "./LandingPage.css"
import { LandNavbar } from './Navbar/LandNavbar';
import Hero from './Hero/Hero';
import Programs from './Programs/Programs';
import Title from './Title/Title';
import About from './About/About';
import Campus from './Campus/Campus';
import Testimonials from './Testimonials/Testimonials';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';
import useScrollVideoPlay from '../hooks/useScrollVideoPlay';

import {
  BookOpen,
  Users,
  Shield,
  Briefcase,
  GraduationCap,
  Award,
  FileText, 
  Bot, 
  Receipt
} from "lucide-react";

import LandingPageCards from "../components/LandingPageCards";

const TimelineItem = ({ step, index }) => {
  const { videoRef, isInView, hasPlayed } = useScrollVideoPlay({
    threshold: 0.6,
    rootMargin: '50px',
    autoplayOnce: true
  });

  return (
    <div
      className={`flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8 mb-16 relative`}
    >
      {/* Timeline connector */}
      <div className="hidden md:block absolute h-full w-0.5 bg-green-200 left-1/2 transform -translate-x-1/2 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-green-400 rounded-full border-4 border-white shadow" />
      </div>

      {/* YouTube Video Container */}
      <div className="w-full md:w-1/2 relative" ref={videoRef}>
        <div
          className="relative rounded-xl overflow-hidden shadow-lg"
          style={{ height: "315px" }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${step.youtubeId}?start=1&autoplay=${isInView && !hasPlayed ? 1 : 0}&mute=0`}
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
  );
};

const SuccessStoryTimeline = ({ steps }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
      {steps.map((step, index) => (
        <TimelineItem key={index} step={step} index={index} />
      ))}
    </div>
  );
};


const LandingPage = () => {
  return (
    <div className='bg-green-50'>
      <LandNavbar/>
      <Hero/>
      <div className="container mt-0">
      <Title subTitle='Our PROGRAM' title='What We Offer'/>
      <Programs/>
      <About/>
      <Title subTitle='Memories' title='Overview'/>
      <Campus/>
     
     <div className='testimonials-container'>
     <Testimonials/>
     </div>

     <LandingPageCards items={[
       {
         title: "Financial Advisor - Chatbot",
         description: "Get personalized financial advice from our AI-powered chatbot",
         features: [
           "24/7 AI-powered assistance",
           "Personalized investment advice",
           "Risk assessment & planning",
           "Real-time market insights"
         ],
         benefits: "Save time and get expert financial guidance anytime, anywhere",
         link: "/advisor",
         icon: Bot,
       },
       {
         title: "Business Opportunities",
         description: "Explore business opportunities in India",
         features: [
           "Rural business ideas",
           "Government schemes info",
           "Market analysis reports",
           "Success story examples"
         ],
         benefits: "Discover profitable ventures and government support for entrepreneurs",
         link: "/rural",
         icon: Briefcase,
       },
       {
         title: "Schemes & Benefits",
         description: "View and manage detailed government schemes and benefits",
         features: [
           "Central government schemes",
           "State-specific benefits",
           "Application procedures",
           "Eligibility criteria"
         ],
         benefits: "Access comprehensive information about government financial support",
         link: "/scheme",
         icon: Shield,
       },
       {
         title: "Community",
         description: "Join the community to discuss and share ideas with other users",
         features: [
           "Discussion forums",
           "Expert Q&A sessions",
           "Peer networking",
           "Knowledge sharing"
         ],
         benefits: "Connect with like-minded individuals and financial experts",
         link: "/community",
         icon: Users,
       },
       {
         title: "QnA Sessions",
         description: "Participate in live QnA sessions with financial experts",
         features: [
           "Live expert sessions",
           "Interactive discussions",
           "Topic-specific Q&A",
           "Recorded sessions"
         ],
         benefits: "Get direct answers from certified financial professionals",
         link: "/qna",
         icon: GraduationCap,
       },
       {
         title: "Success Stories",
         description: "Read inspiring stories of individuals who have overcome adversity",
         features: [
           "Real-life case studies",
           "Step-by-step journeys",
           "Lessons learned",
           "Motivational content"
         ],
         benefits: "Learn from real experiences and find motivation for your journey",
         link: "/stories",
         icon: Award,
       },
       {
         title: "OCR Based Finance Doc Reading",
         description: "Scan and understand financial documents with AI-powered OCR",
         features: [
           "Document scanning",
           "Text extraction",
           "Data analysis",
           "Report generation"
         ],
         benefits: "Digitize and analyze financial documents instantly",
         link: "/ocr",
         icon: FileText,
       },
       {
         title: "Expense Tracker",
         description: "Track and manage your daily expenses with smart categorization",
         features: [
           "Expense categorization",
           "Budget tracking",
           "Spending insights",
           "Financial reports"
         ],
         benefits: "Gain control over your spending and improve financial habits",
         link: "/expenses",
         icon: Receipt,
       },
       {
         title: "Financial Scams", 
         description: "Learn financial scams through interactive visualisations",
         features: [
           "Common scam types",
           "Prevention tips",
           "Interactive examples",
           "Reporting procedures"
         ],
         benefits: "Protect yourself from financial fraud and scams",
         link: "/scams",
         icon: Shield,
       },
       {
         title: "Fun And Learn", 
         description: "Learn financial concepts through interactive games and quizzes",
         features: [
           "Educational games",
           "Interactive quizzes",
           "Progress tracking",
           "Rewards system"
         ],
         benefits: "Make learning finance engaging and enjoyable",
         link: "/game",
         icon: BookOpen,
       },
     ]} />
        <section className="py-12 bg-white text-center">
          <h2 className="text-2xl font-bold text-green-800">
            Success Stories of the Underprivileged
          </h2>
          <p className="mt-2 text-green-600">Inspiring journeys of overcoming adversity</p>
          <SuccessStoryTimeline steps={[
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
          ]} />
        </section>
     
      <Title subTitle='Contact Us' title='Get in  Touch'/>
      <Contact/>
      <Footer/>
      
      </div>
      
    </div>
  )
}

export default LandingPage