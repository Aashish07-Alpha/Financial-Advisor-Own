import React, { useState, useMemo } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, ComposedChart
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Filter } from 'lucide-react';

const AnalyticsDashboard = ({ transactions, stats }) => {
    const [timeRange, setTimeRange] = useState('6months');
    const [chartType, setChartType] = useState('bar');

    // Generate chart data
    const chartData = useMemo(() => {
        if (!transactions || transactions.length === 0) return [];

        const now = new Date();
        let months = 6;
        
        switch (timeRange) {
            case '3months':
                months = 3;
                break;
            case '6months':
                months = 6;
                break;
            case '12months':
                months = 12;
                break;
            default:
                months = 6;
        }

        const data = [];
        const categoryData = {};
        const monthlyData = {};

        // Initialize monthly data
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
            monthlyData[monthKey] = {
                month: monthKey,
                income: 0,
                expense: 0,
                balance: 0,
                transactions: 0
            };
        }

        // Process transactions
        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            const monthKey = transactionDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
            
            // Only include transactions within the selected time range
            const monthsDiff = (now.getFullYear() - transactionDate.getFullYear()) * 12 + 
                             (now.getMonth() - transactionDate.getMonth());
            
            if (monthsDiff < months) {
                if (monthlyData[monthKey]) {
                    if (transaction.type === 'income') {
                        monthlyData[monthKey].income += transaction.amount;
                    } else {
                        monthlyData[monthKey].expense += transaction.amount;
                    }
                    monthlyData[monthKey].transactions += 1;
                }

                // Category data
                if (transaction.type === 'expense') {
                    categoryData[transaction.category] = (categoryData[transaction.category] || 0) + transaction.amount;
                }
            }
        });

        // Calculate balance and format data
        Object.values(monthlyData).forEach(month => {
            month.balance = month.income - month.expense;
            data.push(month);
        });

        return data;
    }, [transactions, timeRange]);

    // Category breakdown data
    const categoryData = useMemo(() => {
        if (!transactions || transactions.length === 0) return [];

        const categoryTotals = {};
        transactions.forEach(transaction => {
            if (transaction.type === 'expense') {
                categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
            }
        });

        return Object.entries(categoryTotals)
            .map(([category, amount]) => ({ category, amount }))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 8); // Top 8 categories
    }, [transactions]);

    // Color palette for charts
    const colors = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
        '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
    ];

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-900">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm">
                            {entry.name}: ₹{entry.value?.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Custom legend
    const CustomLegend = ({ payload }) => (
        <div className="flex justify-center space-x-4 mt-4">
            {payload.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-gray-600">{entry.value}</span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-gray-600 mt-1">Visual insights into your financial patterns</p>
                </div>
                <div className="flex items-center space-x-4">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="3months">Last 3 Months</option>
                        <option value="6months">Last 6 Months</option>
                        <option value="12months">Last 12 Months</option>
                    </select>
                    <select
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                        <option value="area">Area Chart</option>
                        <option value="composed">Composed Chart</option>
                    </select>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {transactions?.length || 0}
                            </p>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Average Monthly Expense</p>
                            <p className="text-2xl font-bold text-red-600">
                                ₹{stats?.averageMonthlyExpense?.toLocaleString() || '0'}
                            </p>
                        </div>
                        <div className="p-2 bg-red-100 rounded-lg">
                            <TrendingDown className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Savings Rate</p>
                            <p className="text-2xl font-bold text-green-600">
                                {stats?.savingsRate ? `${(stats.savingsRate * 100).toFixed(1)}%` : '0%'}
                            </p>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses Trend</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'bar' ? (
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend content={<CustomLegend />} />
                                <Bar dataKey="income" fill="#10B981" name="Income" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expense" fill="#EF4444" name="Expense" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        ) : chartType === 'line' ? (
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend content={<CustomLegend />} />
                                <Line 
                                    type="monotone" 
                                    dataKey="income" 
                                    stroke="#10B981" 
                                    strokeWidth={3}
                                    name="Income"
                                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="expense" 
                                    stroke="#EF4444" 
                                    strokeWidth={3}
                                    name="Expense"
                                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        ) : chartType === 'area' ? (
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend content={<CustomLegend />} />
                                <Area 
                                    type="monotone" 
                                    dataKey="income" 
                                    stackId="1"
                                    stroke="#10B981" 
                                    fill="#10B981" 
                                    fillOpacity={0.6}
                                    name="Income"
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="expense" 
                                    stackId="1"
                                    stroke="#EF4444" 
                                    fill="#EF4444" 
                                    fillOpacity={0.6}
                                    name="Expense"
                                />
                            </AreaChart>
                        ) : (
                            <ComposedChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend content={<CustomLegend />} />
                                <Bar dataKey="expense" fill="#EF4444" name="Expense" radius={[4, 4, 0, 0]} />
                                <Line 
                                    type="monotone" 
                                    dataKey="income" 
                                    stroke="#10B981" 
                                    strokeWidth={3}
                                    name="Income"
                                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                />
                            </ComposedChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Breakdown */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense by Category</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="amount"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                                    labelFormatter={(label) => `Category: ${label}`}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Balance Trend */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Balance Trend</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip 
                                    content={<CustomTooltip />}
                                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Balance']}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="balance" 
                                    stroke="#10B981" 
                                    fill="#10B981" 
                                    fillOpacity={0.3}
                                    name="Balance"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Top Spending Category</h4>
                        <p className="text-blue-700">
                            {categoryData[0]?.category || 'No data'} - 
                            ₹{categoryData[0]?.amount?.toLocaleString() || '0'}
                        </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Best Month</h4>
                        <p className="text-green-700">
                            {chartData.reduce((best, current) => 
                                current.balance > best.balance ? current : best, 
                                { balance: -Infinity, month: 'No data' }
                            ).month}
                        </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">Transaction Frequency</h4>
                        <p className="text-purple-700">
                            {chartData.reduce((total, month) => total + month.transactions, 0)} transactions
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;