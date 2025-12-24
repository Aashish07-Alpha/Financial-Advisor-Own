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

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [timePeriod, setTimePeriod] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [results, setResults] = useState({
    totalInvested: 0,
    totalInterest: 0,
    maturityValue: 0,
    yearlyBreakdown: [],
  });
  const [language, setLanguage] = useState("en");
  const [comparisonScenarios, setComparisonScenarios] = useState([]);

  // Enhanced SIP Calculation with Yearly Breakdown
  const calculateSIP = () => {
    const P = monthlyInvestment;
    const r = expectedReturn / 100 / 12;  // Monthly interest rate
    const n = timePeriod * 12;  // Total number of months

    // Future Value of SIP Formula
    const maturityValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    const totalInterest = maturityValue - totalInvested;

    // Yearly Breakdown
    const yearlyBreakdown = Array.from({ length: timePeriod }, (_, year) => {
      const yearlyInvested = P * 12;
      const yearlyInvestedTotal = yearlyInvested * (year + 1);
      const yearlyCompoundValue = yearlyInvestedTotal * Math.pow(1 + r, (timePeriod - year) * 12);
      
      return {
        year: year + 1,
        invested: Math.round(yearlyInvested),
        totalInvested: Math.round(yearlyInvestedTotal),
        currentValue: Math.round(yearlyCompoundValue)
      };
    });

    setResults({
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalInterest),
      maturityValue: Math.round(maturityValue),
      yearlyBreakdown: yearlyBreakdown
    });
  };

  // Add Comparison Scenario
  const addComparisonScenario = () => {
    const newScenario = {
      id: Date.now(),
      monthlyInvestment: monthlyInvestment,
      period: timePeriod,
      expectedReturn: expectedReturn,
      maturityValue: results.maturityValue,
      totalInterest: results.totalInterest
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
    calculateSIP();
  }, [monthlyInvestment, timePeriod, expectedReturn]);

  const chartData = [
    { name: "Total Investment", value: results.totalInvested },
    { name: "Total Interest", value: results.totalInterest },
  ];

  const COLORS = ["#2563EB", "#10B981"];

  return (
    <>
      <NavBar language={language} toggleLanguage={() => {}} />
      
      <div className="mx-auto p-6 space-y-8 bg-gradient-to-tr from-blue-300 to-blue-50 min-h-screen">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 space-y-6 mt-16">
          <h2 className="text-2xl font-bold text-gray-800">SIP Calculator</h2>

          {/* Maturity Value Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Projected Maturity Value
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              ₹{results.maturityValue.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              For ₹{monthlyInvestment.toLocaleString()} invested monthly at {expectedReturn}% for {timePeriod} years
            </p>
          </div>

          {/* Input Sections */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Monthly Investment Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-blue-500 text-xl">💰</span>
                <label className="text-gray-700 font-semibold">
                  Monthly Investment
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  ₹{monthlyInvestment.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Time Period Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">⏰</span>
                <label className="text-gray-700 font-semibold">
                  Investment Period (Years)
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="3"
                  max="30"
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="bg-green-50 text-green-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {timePeriod} Yr
                </span>
              </div>
            </div>

            {/* Expected Return Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-purple-500 text-xl">%</span>
                <label className="text-gray-700 font-semibold">
                  Expected Return
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="6"
                  max="20"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {expectedReturn.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Key Results Summary */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-700 mb-1">Total Investment</h3>
              <p className="text-xl font-bold text-blue-800">
                ₹{results.totalInvested.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-700 mb-1">Total Interest</h3>
              <p className="text-xl font-bold text-green-800">
                ₹{results.totalInterest.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-700 mb-1">Returns Multiple</h3>
              <p className="text-xl font-bold text-purple-800">
                {(results.maturityValue / results.totalInvested).toFixed(2)}x
              </p>
            </div>
          </div>

          {/* Comparative Visualization */}
          <div className="bg-white border rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scenario Comparison</h3>
              <button 
                onClick={addComparisonScenario}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Add Scenario
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Monthly Investment</th>
                    <th className="p-2">Time Period</th>
                    <th className="p-2">Return Rate</th>
                    <th className="p-2">Maturity Value</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonScenarios.map((scenario) => (
                    <tr key={scenario.id} className="border-b">
                      <td className="p-2 text-center">₹{scenario.monthlyInvestment}</td>
                      <td className="p-2 text-center">{scenario.period} Years</td>
                      <td className="p-2 text-center">{scenario.expectedReturn}%</td>
                      <td className="p-2 text-center">
                        ₹{scenario.maturityValue.toLocaleString()}
                      </td>
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
                    dataKey="invested" 
                    stackId="a" 
                    fill="#2563EB" 
                    name="Yearly Investment" 
                  />
                  <Bar 
                    dataKey="currentValue" 
                    stackId="a" 
                    fill="#10B981" 
                    name="Current Value" 
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

export default SIPCalculator;