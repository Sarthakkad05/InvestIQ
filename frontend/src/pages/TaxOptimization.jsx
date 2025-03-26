import React, { useState } from 'react';
import Navbar from '../components/home/TopBar';

const TaxOptimization = () => {
  const [income, setIncome] = useState('');
  const [investments, setInvestments] = useState('');
  const [deductions, setDeductions] = useState('');
  const [taxableIncome, setTaxableIncome] = useState(null);
  const [taxSavings, setTaxSavings] = useState(null);

  const calculateTaxOptimization = () => {
    const totalDeductions = Number(investments) + Number(deductions);
    const taxable = Math.max(0, Number(income) - totalDeductions);
    const savings = totalDeductions * 0.2;

    setTaxableIncome(taxable);
    setTaxSavings(savings);
  };

  return (
    <div className="w-screen bg-[#09090b] text-white h-screen">
      <Navbar />
      <div className="flex justify-center items-center pb-6 pt-10">
        <h1 className="text-3xl font-bold text-white text-center">Tax Optimization</h1>
      </div>

      <div className="flex flex-col items-center gap-4 bg-[#121214] p-5 rounded-lg border border-gray-800 w-[80%] mx-auto">
        <input
          type="number"
          placeholder="Annual Income"
          className="p-3 w-full rounded-lg bg-[#09090b] border border-gray-600 outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af]"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />

        <input
          type="number"
          placeholder="Investments (Tax-Saving)"
          className="p-3 w-full rounded-lg bg-[#09090b] border border-gray-600 outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af]"
          value={investments}
          onChange={(e) => setInvestments(e.target.value)}
        />

        <input
          type="number"
          placeholder="Other Deductions"
          className="p-3 w-full rounded-lg bg-[#09090b] border border-gray-600 outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af]"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
        />

        <button
          className="py-2 px-4 bg-[#3c82f6] text-white font-medium rounded-lg hover:bg-[#047857]"
          onClick={calculateTaxOptimization}
        >
          Calculate Tax Savings
        </button>
      </div>

      {taxableIncome !== null && taxSavings !== null && (
        <div className="mt-4 p-4 bg-[#121214] rounded-lg shadow-md w-[80%] mx-auto border border-gray-800">
          <h2 className="text-xl font-semibold mb-2">Tax Optimization Result</h2>
          <p>Taxable Income: ${taxableIncome.toLocaleString()}</p>
          <p>Estimated Tax Savings: ${taxSavings.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default TaxOptimization;