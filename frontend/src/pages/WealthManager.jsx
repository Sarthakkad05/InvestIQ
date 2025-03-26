import React, { useState } from 'react';
import Navbar from '../components/home/TopBar';

const WealthManager = () => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');
  const [goal, setGoal] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const calculatePlan = () => {
    const monthlySavings = income - expenses;
    const yearlySavings = monthlySavings * 12;
    let plan = '';

    if (yearlySavings > goal * 0.3) {
      plan = 'You’re on track! Consider investing in diversified assets like stocks and ETFs.';
    } else if (yearlySavings > goal * 0.1) {
      plan = 'You’re saving decently. Explore bonds and mutual funds to grow your savings steadily.';
    } else {
      plan = 'Your savings rate is low. Consider reducing expenses or exploring side income options.';
    }

    setRecommendation(plan);
  };

  return (
    <div className="w-screen bg-[#09090b] text-white h-screen">
      <Navbar />
      <div className="flex justify-center items-center pb-6 pt-10">
        <h1 className="text-3xl font-bold text-white text-center">Wealth Manager</h1>
      </div>

      <div className="flex flex-col items-center gap-4 bg-[#121214] p-5 rounded-lg border border-gray-800 w-[80%] mx-auto">
        <input
          type="number"
          placeholder="Monthly Income"
          className="p-3 w-full rounded-lg bg-[#09090b] border border-gray-600 outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af]"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Monthly Expenses"
          className="p-3 w-full rounded-lg bg-[#09090b] border border-gray-600 outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af]"
          value={expenses}
          onChange={(e) => setExpenses(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Current Savings"
          className="p-3 w-full rounded-lg bg-[#09090b] border border-gray-600 outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af]"
          value={savings}
          onChange={(e) => setSavings(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Financial Goal (Yearly)"
          className="p-3 w-full rounded-lg bg-[#09090b] border border-gray-600 outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af]"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
        />

        <button
          className="mt-6 py-2 px-4 bg-[#3c82f6] text-white font-medium rounded-lg hover:bg-[#047857]"
          onClick={calculatePlan}
        >
          Get Wealth Plan
        </button>
      </div>

      {recommendation && (
        <div className="mt-4 p-4 bg-[#121214] rounded-lg shadow-md w-[80%] mx-auto border border-gray-800">
          <h2 className="text-xl font-semibold mb-2">Personalized Plan</h2>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default WealthManager;