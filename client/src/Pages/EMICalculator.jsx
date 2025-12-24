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

const EMICalculator = () => {
  const [principalAmount, setPrincipalAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(15);
  const [results, setResults] = useState({
    monthlyEMI: 0,
    totalInterest: 0,
    totalPayment: 0,
    yearlyBreakdown: [],
  });
  const [language, setLanguage] = useState("en");
  const [comparisonScenarios, setComparisonScenarios] = useState([]);

  // EMI Calculation with Detailed Breakdown
  const calculateEMI = () => {
    const P = principalAmount;
    const r = interestRate / 12 / 100;  // Monthly interest rate
    const n = loanTenure * 12;  // Total number of months

    // EMI Calculation Formula
    const monthlyEMI = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyEMI * n;
    const totalInterest = totalPayment - P;

    // Yearly Breakdown
    const yearlyBreakdown = Array.from({ length: loanTenure }, (_, year) => {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      let remainingPrincipal = P;

      // Calculate yearly interest and principal for each year
      for (let month = 0; month < 12; month++) {
        const monthlyInterest = remainingPrincipal * r;
        const monthlyPrincipal = monthlyEMI - monthlyInterest;

        yearlyInterest += monthlyInterest;
        yearlyPrincipal += monthlyPrincipal;
        remainingPrincipal -= monthlyPrincipal;
      }

      return {
        year: year + 1,
        principalPaid: Math.round(yearlyPrincipal),
        interestPaid: Math.round(yearlyInterest),
        remainingPrincipal: Math.round(remainingPrincipal)
      };
    });

    setResults({
      monthlyEMI: Math.round(monthlyEMI),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      yearlyBreakdown: yearlyBreakdown
    });
  };

  // Add Comparison Scenario
  const addComparisonScenario = () => {
    const newScenario = {
      id: Date.now(),
      principalAmount: principalAmount,
      interestRate: interestRate,
      loanTenure: loanTenure,
      monthlyEMI: results.monthlyEMI,
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
    calculateEMI();
  }, [principalAmount, interestRate, loanTenure]);

  const chartData = [
    { name: "Principal Amount", value: principalAmount },
    { name: "Total Interest", value: results.totalInterest },
  ];

  const COLORS = ["#2563EB", "#10B981"];

  return (
    <>
      <NavBar language={language} toggleLanguage={() => {}} />
      
      <div className="mx-auto p-6 space-y-8 bg-gradient-to-tr from-purple-300 to-purple-50 min-h-screen">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 space-y-6 mt-16">
          <h2 className="text-2xl font-bold text-gray-800">EMI Calculator</h2>

          {/* Monthly EMI Display */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Monthly EMI
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              ₹{results.monthlyEMI.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              For ₹{principalAmount.toLocaleString()} loan at {interestRate}% for {loanTenure} years
            </p>
          </div>

          {/* Input Sections */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Principal Amount Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-blue-500 text-xl">💸</span>
                <label className="text-gray-700 font-semibold">
                  Loan Amount
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={principalAmount}
                  onChange={(e) => setPrincipalAmount(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  ₹{principalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">%</span>
                <label className="text-gray-700 font-semibold">
                  Interest Rate
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="bg-green-50 text-green-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {interestRate.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Loan Tenure Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-purple-500 text-xl">⏰</span>
                <label className="text-gray-700 font-semibold">
                  Loan Tenure
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {loanTenure} Yr
                </span>
              </div>
            </div>
          </div>

          {/* Key Results Summary */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-700 mb-1">Monthly EMI</h3>
              <p className="text-xl font-bold text-blue-800">
                ₹{results.monthlyEMI.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-700 mb-1">Total Interest</h3>
              <p className="text-xl font-bold text-green-800">
                ₹{results.totalInterest.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-700 mb-1">Total Payment</h3>
              <p className="text-xl font-bold text-purple-800">
                ₹{results.totalPayment.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Comparative Visualization */}
          <div className="bg-white border rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scenario Comparison</h3>
              <button 
                onClick={addComparisonScenario}
                className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
              >
                Add Scenario
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Loan Amount</th>
                    <th className="p-2">Interest Rate</th>
                    <th className="p-2">Loan Tenure</th>
                    <th className="p-2">Monthly EMI</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonScenarios.map((scenario) => (
                    <tr key={scenario.id} className="border-b">
                      <td className="p-2 text-center">₹{scenario.principalAmount.toLocaleString()}</td>
                      <td className="p-2 text-center">{scenario.interestRate}%</td>
                      <td className="p-2 text-center">{scenario.loanTenure} Years</td>
                      <td className="p-2 text-center">
                        ₹{scenario.monthlyEMI.toLocaleString()}
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
                    dataKey="principalPaid" 
                    stackId="a" 
                    fill="#2563EB" 
                    name="Principal Paid" 
                  />
                  <Bar 
                    dataKey="interestPaid" 
                    stackId="a" 
                    fill="#10B981" 
                    name="Interest Paid" 
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

export default EMICalculator;