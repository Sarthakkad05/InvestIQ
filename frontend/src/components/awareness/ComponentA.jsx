import React from "react";

const FinancialAwarenessHero = () => {
  return (
    <div id="financialAwareness" className="bg-[#121214] h-[400px] flex items-center justify-center px-8 py-2">
    <div className="text-center text-white max-w-2xl">
      <h1 className="text-4xl font-bold leading-tight mb-4">
        Financial Awareness & Protection
      </h1>
      <p className="text-gray-400 mb-6">
        Stay informed, protect your finances, and make smarter decisions with our comprehensive resources.
      </p>
  
      <div className="flex justify-center gap-4">
        <button className="bg-[#3b82f6] text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">
          Watch Videos ➜
        </button>
        <button className="bg-[#09090b] text-white px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-800 transition">
          Safety Tips 🛡️
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default FinancialAwarenessHero;
