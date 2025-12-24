import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import NavBar from "../components/NavBar";

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentAnnualIncome, setCurrentAnnualIncome] = useState(500000);
  const [currentSavings, setCurrentSavings] = useState(200000);
  const [expectedInflation, setExpectedInflation] = useState(6);
  const [expectedReturnRate, setExpectedReturnRate] = useState(12);
  const [monthlyExpensesPostRetirement, setMonthlyExpensesPostRetirement] = useState(30000);

  const [results, setResults] = useState({
    yearsToRetirement: 0,
    retirementCorpus: 0,
    monthlyIncomeNeeded: 0,
    annualIncomeNeeded: 0,
    totalRetirementFundRequired: 0,
    yearlyBreakdown: [],
  });

  const [language, setLanguage] = useState("en");
  const [comparisonScenarios, setComparisonScenarios] = useState([]);

  // Detailed Retirement Calculation
  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const monthlyExpensesAdjustedForInflation = monthlyExpensesPostRetirement * Math.pow((1 + expectedInflation / 100), yearsToRetirement);
    const annualIncomeNeeded = monthlyExpensesAdjustedForInflation * 12;
    
    // Assuming retirement lasts 30 years post-retirement
    const retirementYears = 30;
    
    // Calculate total retirement fund required (considering inflation)
    const totalRetirementFundRequired = annualIncomeNeeded * retirementYears;
    
    // Calculate future value of current savings
    const futureValueOfCurrentSavings = currentSavings * Math.pow((1 + expectedReturnRate / 100), yearsToRetirement);
    
    // Calculate required retirement corpus
    const requiredRetirementCorpus = totalRetirementFundRequired / Math.pow((1 + expectedReturnRate / 100), retirementYears);

    // Yearly Breakdown of Savings Growth
    const yearlyBreakdown = Array.from({ length: yearsToRetirement }, (_, year) => {
      const yearlyContribution = currentAnnualIncome * 0.2; // Assuming 20% savings rate
      const cumulativeSavings = currentSavings + (yearlyContribution * (year + 1));
      const futureValue = cumulativeSavings * Math.pow((1 + expectedReturnRate / 100), yearsToRetirement - year);
      
      return {
        year: year + 1,
        yearlyContribution: Math.round(yearlyContribution),
        cumulativeSavings: Math.round(cumulativeSavings),
        futureValue: Math.round(futureValue)
      };
    });

    setResults({
      yearsToRetirement: yearsToRetirement,
      retirementCorpus: Math.round(requiredRetirementCorpus),
      monthlyIncomeNeeded: Math.round(monthlyExpensesAdjustedForInflation),
      annualIncomeNeeded: Math.round(annualIncomeNeeded),
      totalRetirementFundRequired: Math.round(totalRetirementFundRequired),
      yearlyBreakdown: yearlyBreakdown
    });
  };

  // Add Comparison Scenario
  const addComparisonScenario = () => {
    const newScenario = {
      id: Date.now(),
      currentAge: currentAge,
      retirementAge: retirementAge,
      currentAnnualIncome: currentAnnualIncome,
      retirementCorpus: results.retirementCorpus,
      monthlyIncomeNeeded: results.monthlyIncomeNeeded
    };

    setComparisonScenarios([...comparisonScenarios, newScenario]);
  };

  // Remove Comparison Scenario
  const removeComparisonScenario = (id) => {
    setComparisonScenarios(
      comparisonScenarios.filter(scenario => scenario.id !== id)
    );
  };

  useEffect(() => {
    calculateRetirement();
  }, [
    currentAge, 
    retirementAge, 
    currentAnnualIncome, 
    currentSavings,
    expectedInflation,
    expectedReturnRate,
    monthlyExpensesPostRetirement
  ]);

  const chartData = [
    { name: "Current Savings", value: currentSavings },
    { name: "Required Corpus", value: results.retirementCorpus },
  ];

  const COLORS = ["#2563EB", "#10B981"];

  return (
    <>
      <NavBar language={language} toggleLanguage={() => {}} />
      
      <div className="mx-auto p-6 space-y-8 bg-gradient-to-tr from-orange-300 to-orange-50 min-h-screen">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 space-y-6 mt-16">
          <h2 className="text-2xl font-bold text-gray-800">Retirement Planning Calculator</h2>

          {/* Retirement Corpus Display */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Required Retirement Corpus
            </h3>
            <p className="text-3xl font-bold text-orange-600">
              ₹{results.retirementCorpus.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              From age {currentAge} to {retirementAge}, with {expectedReturnRate}% returns
            </p>
          </div>

          {/* Input Sections */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Current Age Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-blue-500 text-xl">🎂</span>
                <label className="text-gray-700 font-semibold">
                  Current Age
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="25"
                  max="55"
                  step="1"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {currentAge} Yrs
                </span>
              </div>
            </div>

            {/* Retirement Age Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">⏰</span>
                <label className="text-gray-700 font-semibold">
                  Retirement Age
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="55"
                  max="70"
                  step="1"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <span className="bg-green-50 text-green-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {retirementAge} Yrs
                </span>
              </div>
            </div>

            {/* Current Annual Income Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-purple-500 text-xl">💰</span>
                <label className="text-gray-700 font-semibold">
                  Annual Income
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={currentAnnualIncome}
                  onChange={(e) => setCurrentAnnualIncome(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <span className="bg-purple-50 text-purple-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  ₹{currentAnnualIncome.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Input Sections */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Current Savings Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-red-500 text-xl">📈</span>
                <label className="text-gray-700 font-semibold">
                  Current Savings
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="50000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <span className="bg-red-50 text-red-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  ₹{currentSavings.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Expected Inflation Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">📊</span>
                <label className="text-gray-700 font-semibold">
                  Expected Inflation
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="4"
                  max="8"
                  step="0.5"
                  value={expectedInflation}
                  onChange={(e) => setExpectedInflation(Number(e.target.value))}
                  className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <span className="bg-yellow-50 text-yellow-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {expectedInflation}%
                </span>
              </div>
            </div>

            {/* Expected Return Rate Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">%</span>
                <label className="text-gray-700 font-semibold">
                  Expected Returns
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="8"
                  max="15"
                  step="0.5"
                  value={expectedReturnRate}
                  onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <span className="bg-green-50 text-green-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {expectedReturnRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Key Results Summary */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-700 mb-1">Monthly Income Needed</h3>
              <p className="text-xl font-bold text-blue-800">
                ₹{results.monthlyIncomeNeeded.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-700 mb-1">Years to Retirement</h3>
              <p className="text-xl font-bold text-green-800">
                {results.yearsToRetirement} Years
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-700 mb-1">Total Retirement Fund</h3>
              <p className="text-xl font-bold text-purple-800">
                ₹{results.totalRetirementFundRequired.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Comparative Visualization */}
          <div className="bg-white border rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scenario Comparison</h3>
              <button 
                onClick={addComparisonScenario}
                className="bg-orange-500 text-white px-3 py-1 rounded text-sm"
              >
                Add Scenario
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Current Age</th>
                    <th className="p-2">Retirement Age</th>
                    <th className="p-2">Annual Income</th>
                    <th className="p-2">Retirement Corpus</th>
                    <th className="p-2">Monthly Income</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonScenarios.map((scenario) => (
                    <tr key={scenario.id} className="border-b">
                      <td className="p-2 text-center">{scenario.currentAge} Yrs</td>
                      <td className="p-2 text-center">{scenario.retirementAge} Yrs</td>
                      <td className="p-2 text-center">₹{scenario.currentAnnualIncome.toLocaleString()}</td>
                      <td className="p-2 text-center">₹{scenario.retirementCorpus.toLocaleString()}</td>
                      <td className="p-2 text-center">₹{scenario.monthlyIncomeNeeded.toLocaleString()}</td>
                      <td className="p-2 text-center">
                        <button 
                          onClick={() => removeComparisonScenario(scenario.id)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Breakup Visualization */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-sm text-gray-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Year-by-Year Breakdown */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results.yearlyBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Bar 
                    dataKey="yearlyContribution" 
                    stackId="a" 
                    fill="#2563EB" 
                    name="Yearly Contribution" 
                  />
                  <Bar 
                    dataKey="futureValue" 
                    stackId="a" 
                    fill="#10B981" 
                    name="Future Value" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>      
    </>
  );
};

export default RetirementCalculator;