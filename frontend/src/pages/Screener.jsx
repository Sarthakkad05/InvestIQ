import React, { useState } from 'react';
import Navbar from '../components/home/TopBar';

const ScreenerPage = () => {
  const [filters, setFilters] = useState({
    marketCap: 'All',
    peRatio: [0, 100],
    sector: 'All',
    dividendYield: [0, 10],
    riskLevel: 'All',
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleRangeChange = (key, index, value) => {
    const updatedRange = [...filters[key]];
    updatedRange[index] = value;
    setFilters((prev) => ({ ...prev, [key]: updatedRange }));
  };

  const handleSubmit = () => {
    console.log('Applied Filters:', filters);
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-[#09090b] text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Stock Screener</h1>

        <div className="grid grid-cols-1 gap-4 w-full max-w-md">
          <div>
            <label className="block mb-2 text-gray-400">Market Cap</label>
            <select
              className="w-full p-3 bg-[#121214] border border-gray-700 rounded text-white"
              value={filters.marketCap}
              onChange={(e) => handleFilterChange('marketCap', e.target.value)}
            >
              <option>All</option>
              <option>Small</option>
              <option>Mid</option>
              <option>Large</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-400">P/E Ratio</label>
            <div className="flex justify-between gap-2">
              <input
                type="number"
                className="w-1/2 p-2 bg-[#121214] border border-gray-700 rounded text-white text-center"
                value={filters.peRatio[0]}
                onChange={(e) => handleRangeChange('peRatio', 0, Number(e.target.value))}
              />
              <span className="text-gray-400 self-center">to</span>
              <input
                type="number"
                className="w-1/2 p-2 bg-[#121214] border border-gray-700 rounded text-white text-center"
                value={filters.peRatio[1]}
                onChange={(e) => handleRangeChange('peRatio', 1, Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-400">Sector</label>
            <select
              className="w-full p-3 bg-[#121214] border border-gray-700 rounded text-white"
              value={filters.sector}
              onChange={(e) => handleFilterChange('sector', e.target.value)}
            >
              <option>All</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Energy</option>
              <option>Consumer Goods</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-400">Dividend Yield (%)</label>
            <div className="flex justify-between gap-2">
              <input
                type="number"
                className="w-1/2 p-2 bg-[#121214] border border-gray-700 rounded text-white text-center"
                value={filters.dividendYield[0]}
                onChange={(e) => handleRangeChange('dividendYield', 0, Number(e.target.value))}
              />
              <span className="text-gray-400 self-center">to</span>
              <input
                type="number"
                className="w-1/2 p-2 bg-[#121214] border border-gray-700 rounded text-white text-center"
                value={filters.dividendYield[1]}
                onChange={(e) => handleRangeChange('dividendYield', 1, Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-400">Risk Level</label>
            <select
              className="w-full p-3 bg-[#121214] border border-gray-700 rounded text-white"
              value={filters.riskLevel}
              onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <button
          className="mt-6 bg-[#3c82f6] hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
          onClick={handleSubmit}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ScreenerPage;
