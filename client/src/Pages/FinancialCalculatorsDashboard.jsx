import React, { useState } from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PPFCalculator from './PpfCalculator';
import SIPCalculator from './SIPCalculator';
import EMICalculator from './EMICalculator';
import RetirementCalculator from './RetirementCalculator';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import TaxCalculator from './TaxCalculator';

// Placeholder icons using emojis instead of Lucide
const icons = {
  ppf: '💰',
  sip: '📈',
  emi: '💳',
  retirement: '🏦',
  compoundInterest: '🧮',
  tax: '📋'
};

const CalculatorCard = ({ icon, title, description, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white/70 backdrop-blur-md hover:bg-green-50/80 transition-all duration-300 rounded-2xl shadow-xl p-8 cursor-pointer group border border-green-100 hover:border-green-300 hover:shadow-2xl transform hover:scale-105 animate-pop-in"
      style={{ minHeight: 220 }}
    >
      <div className="flex items-center mb-4">
        <span className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-green-200 to-emerald-200 text-4xl mr-4 shadow-lg">
          {icon}
        </span>
        <h3 className="text-2xl font-bold text-green-800 group-hover:text-green-600 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-gray-700 mb-4 text-base leading-relaxed">
        {description}
      </p>
      <div className="flex justify-end">
        <span className="text-green-500 font-semibold group-hover:translate-x-1 transition-transform">
          Calculate →
        </span>
      </div>
    </div>
  );
};

const FinancialCalculatorsDashboard = () => {
  const [activeCalculator, setActiveCalculator] = useState(null);
  const [language, setLanguage] = useState("en");

  const calculators = [
    {
      id: 'ppf',
      title: 'PPF Calculator',
      description: 'Calculate your Public Provident Fund investment growth and potential returns.',
      icon: icons.ppf,
      component: PPFCalculator
    },
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Estimate your Systematic Investment Plan returns and wealth creation potential.',
      icon: icons.sip,
      component: SIPCalculator
    },
    {
      id: 'emi',
      title: 'EMI Calculator',
      description: 'Calculate your Equated Monthly Installments for loans.',
      icon: icons.emi,
      component: EMICalculator
    },
    {
      id: 'retirement',
      title: 'Retirement Calculator',
      description: 'Plan your retirement corpus and understand future financial needs.',
      icon: icons.retirement,
      component: RetirementCalculator
    },
    {
      id: 'compoundInterest',
      title: 'Compound Interest Calculator',
      description: 'Understand the power of compounding on your investments.',
      icon: icons.compoundInterest,
      component: CompoundInterestCalculator
    },
    {
      id: 'tax',
      title: 'Tax Calculator',
      description: 'Estimate your tax liability and potential savings.',
      icon: icons.tax,
      component: TaxCalculator
    }
  ];

  const handleCalculatorSelect = (calculator) => {
    setActiveCalculator(calculator);
  };

  const handleBackToDashboard = () => {
    setActiveCalculator(null);
  };

  // Render selected calculator or dashboard
  if (activeCalculator) {
    const SelectedCalculator = activeCalculator.component;
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar language={language} toggleLanguage={() => setLanguage(language === 'en' ? 'hi' : 'en')} />
        <div className="flex-grow">
          <button 
            onClick={handleBackToDashboard}
            className="m-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            ← Back to Calculators
          </button>
          <SelectedCalculator />
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  // Default view: Calculator Cards
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-green-100 via-white to-emerald-50 mt-11">
      <NavBar language={language} toggleLanguage={() => setLanguage(language === 'en' ? 'hi' : 'en')} />
      <div className="flex-grow p-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-green-800 mb-2 text-center drop-shadow-lg animate-fade-in">Financial Calculators</h1>
          <p className="text-lg text-green-700 mb-8 text-center animate-fade-in-slow">Plan, calculate, and optimize your finances with our suite of smart calculators.</p>
          <div className="w-full h-1 bg-gradient-to-r from-green-200 via-emerald-200 to-green-100 rounded-full mb-10 opacity-60 animate-fade-in-slow"></div>
          <div className="grid md:grid-cols-3 gap-10 animate-fade-in">
            {calculators.map((calculator) => (
              <CalculatorCard
                key={calculator.id}
                title={calculator.title}
                description={calculator.description}
                icon={calculator.icon}
                onClick={() => handleCalculatorSelect(calculator)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default FinancialCalculatorsDashboard;