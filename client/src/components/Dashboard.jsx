import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard = ({ stats, transactions }) => {
    if (!stats) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    const { totalIncome, totalExpense, balance } = stats;
    
    // Calculate trends (mock data for now)
    const incomeTrend = 12.5; // +12.5%
    const expenseTrend = -8.3; // -8.3%
    const balanceTrend = 15.2; // +15.2%

    // Get top expense categories
    const categoryBreakdown = stats.categoryBreakdown || {};
    const topCategories = Object.entries(categoryBreakdown)
        .filter(([category, data]) => data.expense > 0)
        .sort(([, a], [, b]) => b.expense - a.expense)
        .slice(0, 5);

    // Get recent transactions
    const recentTransactions = transactions?.slice(0, 5) || [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
                    <p className="text-gray-600 mt-1">Track your income, expenses, and financial health</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Last updated</p>
                    <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Income Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <ArrowUpRight className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Income</p>
                                <p className="text-lg lg:text-2xl font-bold text-gray-900">₹{totalIncome?.toLocaleString() || '0'}</p>
                            </div>
                        </div>
                        <div className={`flex items-center space-x-1 text-sm ${incomeTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {incomeTrend >= 0 ? (
                                <TrendingUp className="h-4 w-4" />
                            ) : (
                                <TrendingDown className="h-4 w-4" />
                            )}
                            <span className="font-medium">{Math.abs(incomeTrend)}%</span>
                        </div>
                    </div>
                </div>

                {/* Expense Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <ArrowDownRight className="h-5 w-5 lg:h-6 lg:w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                                <p className="text-lg lg:text-2xl font-bold text-gray-900">₹{totalExpense?.toLocaleString() || '0'}</p>
                            </div>
                        </div>
                        <div className={`flex items-center space-x-1 text-sm ${expenseTrend >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {expenseTrend >= 0 ? (
                                <TrendingUp className="h-4 w-4" />
                            ) : (
                                <TrendingDown className="h-4 w-4" />
                            )}
                            <span className="font-medium">{Math.abs(expenseTrend)}%</span>
                        </div>
                    </div>
                </div>

                {/* Balance Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <DollarSign className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Current Balance</p>
                                <p className={`text-lg lg:text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ₹{balance?.toLocaleString() || '0'}
                                </p>
                            </div>
                        </div>
                        <div className={`flex items-center space-x-1 text-sm ${balanceTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {balanceTrend >= 0 ? (
                                <TrendingUp className="h-4 w-4" />
                            ) : (
                                <TrendingDown className="h-4 w-4" />
                            )}
                            <span className="font-medium">{Math.abs(balanceTrend)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts and Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Expense Categories */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Expense Categories</h3>
                    <div className="space-y-4">
                        {topCategories.length > 0 ? (
                            topCategories.map(([category, data], index) => {
                                const percentage = (data.expense / totalExpense) * 100;
                                return (
                                    <div key={category} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{category}</p>
                                                <p className="text-xs text-gray-500">{percentage.toFixed(1)}% of total</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900">₹{data.expense.toLocaleString()}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-gray-500 text-center py-4">No expense data available</p>
                        )}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                    <div className="space-y-3">
                        {recentTransactions.length > 0 ? (
                            recentTransactions.map((transaction) => (
                                <div key={transaction._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-2 h-2 rounded-full ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{transaction.text}</p>
                                            <p className="text-xs text-gray-500">{transaction.category}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                            {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">No recent transactions</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions || 0}</p>
                    <p className="text-sm text-gray-600">Total Transactions</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{transactions?.filter(t => t.type === 'income').length || 0}</p>
                    <p className="text-sm text-gray-600">Income Entries</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{transactions?.filter(t => t.type === 'expense').length || 0}</p>
                    <p className="text-sm text-gray-600">Expense Entries</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">{transactions?.filter(t => t.source === 'receipt').length || 0}</p>
                    <p className="text-sm text-gray-600">Receipt Scans</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;