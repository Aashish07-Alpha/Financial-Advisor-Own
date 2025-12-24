import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import NavBar from "../components/NavBar";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(8);
  const [compoundFrequency, setCompoundFrequency] = useState(12);
  const [investmentDuration, setInvestmentDuration] = useState(5);
  const [language, setLanguage] = useState("en");

  const [results, setResults] = useState({
    totalAmount: 0,
    totalInterest: 0,
    yearlyBreakdown: []
  });

  const calculateCompoundInterest = () => {
    // Formula: A = P * (1 + r/n)^(n*t)
    const P = principal;
    const r = interestRate / 100;
    const n = compoundFrequency;
    const t = investmentDuration;

    const totalAmount = P * Math.pow((1 + r/n), (n*t));
    const totalInterest = totalAmount - P;

    // Yearly breakdown
    const yearlyBreakdown = Array.from({ length: investmentDuration }, (_, year) => {
      const yearAmount = P * Math.pow((1 + r/n), (n*(year+1)));
      return {
        year: year + 1,
        amount: Math.round(yearAmount),
        interestEarned: Math.round(yearAmount - P)
      };
    });

    setResults({
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      yearlyBreakdown: yearlyBreakdown
    });
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, interestRate, compoundFrequency, investmentDuration]);

  return (
    <>
      <NavBar language={language} toggleLanguage={() => {}} />
      
      <div className="mx-auto p-6 space-y-8 bg-gradient-to-tr from-blue-300 to-blue-50 min-h-screen">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 space-y-6 mt-16">
          <h2 className="text-2xl font-bold text-gray-800">Compound Interest Calculator</h2>

          {/* Total Amount Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Total Investment Value
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              ₹{results.totalAmount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {compoundFrequency} times compounded per year
            </p>
          </div>

          {/* Input Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Principal Amount Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">💰</span>
                <label className="text-gray-700 font-semibold">
                  Principal Amount
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="bg-green-50 text-green-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  ₹{principal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-purple-500 text-xl">📈</span>
                <label className="text-gray-700 font-semibold">
                  Interest Rate
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="4"
                  max="15"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="bg-purple-50 text-purple-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {interestRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Additional Inputs */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Compound Frequency Dropdown */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">♻️</span>
                <label className="text-gray-700 font-semibold">
                  Compounding Frequency
                </label>
              </div>
              <select
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              >
                <option value={1}>Annually</option>
                <option value={2}>Semi-Annually</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
                <option value={365}>Daily</option>
              </select>
            </div>

            {/* Investment Duration Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-blue-500 text-xl">⏳</span>
                <label className="text-gray-700 font-semibold">
                  Investment Duration
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={investmentDuration}
                  onChange={(e) => setInvestmentDuration(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {investmentDuration} Years
                </span>
              </div>
            </div>
          </div>

          {/* Key Results Summary */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-700 mb-1">Total Interest Earned</h3>
              <p className="text-xl font-bold text-green-800">
                ₹{results.totalInterest.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-700 mb-1">Compounding Frequency</h3>
              <p className="text-xl font-bold text-purple-800">
                {compoundFrequency} times/year
              </p>
            </div>
          </div>

          {/* Interactive Line Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.yearlyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#2563EB" 
                  name="Total Amount" 
                />
                <Line 
                  type="monotone" 
                  dataKey="interestEarned" 
                  stroke="#10B981" 
                  name="Interest Earned" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompoundInterestCalculator;