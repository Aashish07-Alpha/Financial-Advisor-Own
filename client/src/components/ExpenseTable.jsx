import React, { useState } from 'react';

const ExpenseTable = ({ expenses, deleteExpense, loading }) => {
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            setDeletingId(id);
            try {
                await deleteExpense(id);
            } catch (error) {
                console.error('Delete failed:', error);
            } finally {
                setDeletingId(null);
            }
        }
    };

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Transaction History
                </h2>
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-500">Loading transactions...</p>
                </div>
            </div>
        );
    }

    if (!expenses || expenses.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Transaction History
                </h2>
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No transactions yet</h3>
                    <p className="text-gray-500 text-lg">Add your first transaction to get started!</p>
                    <p className="text-gray-400 text-sm mt-2">Track your income and expenses to better manage your finances</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Transaction History
                </h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {expenses.length} transactions
                </span>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {expenses.map((expense) => (
                    <div 
                        key={expense._id} 
                        className={`flex items-center justify-between p-4 rounded-xl border-l-4 transition duration-200 hover:shadow-md ${
                            expense.amount > 0 
                                ? 'bg-green-50 border-green-500 hover:bg-green-100' 
                                : 'bg-red-50 border-red-500 hover:bg-red-100'
                        }`}
                    >
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-800 mb-1 truncate">
                                {expense.text}
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span className={`px-2 py-1 rounded-full ${
                                    expense.amount > 0 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-red-100 text-red-700'
                                }`}>
                                    {expense.amount > 0 ? 'Income' : 'Expense'}
                                </span>
                                {expense.createdAt && (
                                    <span>{formatDate(expense.createdAt)}</span>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 ml-4">
                            <div className={`text-lg font-bold whitespace-nowrap ${
                                expense.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {expense.amount > 0 ? '+' : ''}₹{Math.abs(expense.amount).toLocaleString('en-IN')}
                            </div>
                            
                            <button 
                                className={`p-2 rounded-lg transition duration-200 transform hover:scale-110 shadow-md ${
                                    deletingId === expense._id 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                                onClick={() => handleDelete(expense._id)}
                                disabled={deletingId === expense._id}
                                title={deletingId === expense._id ? 'Deleting...' : 'Delete transaction'}
                            >
                                {deletingId === expense._id ? (
                                    <svg className="animate-spin w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Total Transactions: {expenses.length}</span>
                    <span>
                        Latest: {expenses.length > 0 && expenses[0].createdAt 
                            ? formatDate(expenses[0].createdAt) 
                            : 'N/A'}
                    </span>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            `}</style>
        </div>
    );
};

export default ExpenseTable;