import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import NavBar from "../components/NavBar";

const TaxCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(1000000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [taxRegime, setTaxRegime] = useState("new");
  const [language, setLanguage] = useState("en");

  const [taxCalculation, setTaxCalculation] = useState({
    totalIncome: 0,
    standardDeduction: 0,
    taxableIncome: 0,
    taxAmount: 0,
    netTaxPayable: 0,
    taxSavings: []
  });

  const calculateTax = () => {
    const totalIncome = annualIncome + otherIncome;
    const standardDeduction = 50000;
    let taxableIncome = totalIncome - standardDeduction;

    let taxAmount = 0;

    if (taxRegime === "old") {
      // Old Tax Regime Tax Slabs
      const oldTaxSlabs = [
        { min: 0, max: 250000, rate: 0 },
        { min: 250001, max: 500000, rate: 0.05 },
        { min: 500001, max: 1000000, rate: 0.20 },
        { min: 1000001, max: Infinity, rate: 0.30 }
      ];

      taxAmount = calculateTaxUsingSlabs(taxableIncome, oldTaxSlabs);
    } else {
      // New Tax Regime Tax Slabs
      const newTaxSlabs = [
        { min: 0, max: 300000, rate: 0 },
        { min: 300001, max: 600000, rate: 0.05 },
        { min: 600001, max: 900000, rate: 0.10 },
        { min: 900001, max: 1200000, rate: 0.15 },
        { min: 1200001, max: 1500000, rate: 0.20 },
        { min: 1500001, max: Infinity, rate: 0.30 }
      ];

      taxAmount = calculateTaxUsingSlabs(taxableIncome, newTaxSlabs);
    }

    const netTaxPayable = taxAmount;

    // Tax Savings Comparison (simplified)
    const taxSavings = [
      { name: 'Income Tax', value: netTaxPayable },
      { name: 'Potential Savings', value: calculatePotentialSavings(netTaxPayable) }
    ];

    setTaxCalculation({
      totalIncome,
      standardDeduction,
      taxableIncome,
      taxAmount: Math.round(taxAmount),
      netTaxPayable: Math.round(netTaxPayable),
      taxSavings
    });
  };

  const calculateTaxUsingSlabs = (income, slabs) => {
    let tax = 0;
    for (let slab of slabs) {
      if (income > slab.min) {
        const taxableAmount = Math.min(income - slab.min, slab.max - slab.min);
        tax += taxableAmount * slab.rate;
      }
    }
    return tax;
  };

  const calculatePotentialSavings = (currentTax) => {
    // Simplified potential savings calculation
    return Math.round(currentTax * 0.2);
  };

  useEffect(() => {
    calculateTax();
  }, [annualIncome, otherIncome, taxRegime]);

  const COLORS = ['#2563EB', '#10B981'];

  return (
    <>
      <NavBar language={language} toggleLanguage={() => {}} />
      
      <div className="mx-auto p-6 space-y-8 bg-gradient-to-tr from-green-300 to-green-50 min-h-screen">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 space-y-6 mt-16">
          <h2 className="text-2xl font-bold text-gray-800">Income Tax Calculator</h2>

          {/* Tax Amount Display */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Net Tax Payable
            </h3>
            <p className="text-3xl font-bold text-green-600">
              ₹{taxCalculation.netTaxPayable.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {taxRegime === 'new' ? 'New Tax Regime' : 'Old Tax Regime'}
            </p>
          </div>

          {/* Input Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Annual Income Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-purple-500 text-xl">💼</span>
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
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="bg-purple-50 text-purple-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  ₹{annualIncome.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Other Income Slider */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">💰</span>
                <label className="text-gray-700 font-semibold">
                  Other Income
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(Number(e.target.value))}
                  className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="bg-yellow-50 text-yellow-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  ₹{otherIncome.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Tax Regime Selection */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-blue-500 text-xl">📋</span>
              <label className="text-gray-700 font-semibold">
                Select Tax Regime
              </label>
            </div>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="new"
                  checked={taxRegime === 'new'}
                  onChange={() => setTaxRegime('new')}
                />
                <span>New Tax Regime</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="old"
                  checked={taxRegime === 'old'}
                  onChange={() => setTaxRegime('old')}
                />
                <span>Old Tax Regime</span>
              </label>
            </div>
          </div>

          {/* Key Results Summary */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-700 mb-1">Total Income</h3>
              <p className="text-xl font-bold text-blue-800">
                ₹{taxCalculation.totalIncome.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-700 mb-1">Taxable Income</h3>
              <p className="text-xl font-bold text-green-800">
                ₹{taxCalculation.taxableIncome.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-700 mb-1">Tax Amount</h3>
              <p className="text-xl font-bold text-purple-800">
                ₹{taxCalculation.netTaxPayable.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Tax Savings Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taxCalculation.taxSavings}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {taxCalculation.taxSavings.map((entry, index) => (
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
        </div>
      </div>
    </>
  );
};

export default TaxCalculator;