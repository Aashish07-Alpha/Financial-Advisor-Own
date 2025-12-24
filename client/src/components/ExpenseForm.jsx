import React, { useState } from 'react'

function ExpenseForm({ addTransaction, transactionType = 'expense' }) {
    const [transactionInfo, setTransactionInfo] = useState({
        amount: '',
        text: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransactionInfo(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { amount, text } = transactionInfo;
        
        // Client-side validation
        if (!text.trim()) {
            alert('Please enter a transaction description');
            return;
        }

        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) === 0) {
            alert('Please enter a valid non-zero amount');
            return;
        }

        setIsSubmitting(true);
        
        try {
            await addTransaction(transactionInfo);
            // Clear form only on successful submission
            setTransactionInfo({ amount: '', text: '' });
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const isIncome = transactionType === 'income';

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                    isIncome 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-green-600 to-teal-600'
                }`}>
                    <span className="text-white text-xl">
                        {isIncome ? '💰' : '💸'}
                    </span>
                </div>
                <h3 className={`text-lg font-semibold ${
                    isIncome ? 'text-green-700' : 'text-green-700'
                }`}>
                    {isIncome ? 'Add Income' : 'Add Expense'}
                </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor='text' className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <input 
                        onChange={handleChange}
                        type='text' 
                        name='text' 
                        id='text'
                        placeholder={isIncome ? 'e.g., Salary, Freelance, Bonus' : 'e.g., Groceries, Rent, Utilities'} 
                        value={transactionInfo.text}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        maxLength={200}
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {transactionInfo.text.length}/200 characters
                    </p>
                </div>

                <div>
                    <label htmlFor='amount' className="block text-sm font-medium text-gray-700 mb-2">
                        Amount (₹) *
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <input 
                            onChange={handleChange}
                            type='number' 
                            name='amount' 
                            id='amount'
                            placeholder='0.00' 
                            value={transactionInfo.amount}
                            disabled={isSubmitting}
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                </div>

                <button 
                    type='submit'
                    disabled={isSubmitting || !transactionInfo.text.trim() || !transactionInfo.amount}
                    className={`w-full font-semibold py-3 px-6 rounded-xl transition duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center ${
                        isIncome
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white'
                            : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white'
                    } disabled:cursor-not-allowed`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Adding...
                        </>
                    ) : (
                        <>
                            <span className="mr-2">{isIncome ? '➕' : '➖'}</span>
                            Add {isIncome ? 'Income' : 'Expense'}
                        </>
                    )}
                </button>
            </form>

            <div className="space-y-3">
                <div className={`p-4 rounded-xl ${
                    isIncome 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-green-50 border border-green-200'
                }`}>
                    <p className={`text-sm ${
                        isIncome ? 'text-green-700' : 'text-green-700'
                    }`}>
                        💡 <strong>Tip:</strong> {isIncome 
                            ? 'Record all your income sources including salary, bonuses, and side hustles' 
                            : 'Track all your expenses to understand your spending patterns'
                        }
                    </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">
                        📝 <strong>Examples:</strong> {isIncome 
                            ? 'Salary (₹50000), Freelance (₹15000), Bonus (₹25000)' 
                            : 'Groceries (₹1200), Rent (₹25000), Utilities (₹800)'
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ExpenseForm