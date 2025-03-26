import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useStockData } from "./StockContext";


const Valuation = () => {
   const { stockData } = useStockData();
    const stockKeys = stockData ? Object.keys(stockData["General Information"]["Company Name"]) : [];
    const stock1 = stockKeys[0];
    const stock2 = stockKeys[1];
  
    const dividend1 = stockData["Valuation & Dividends"]["Dividend Yield"][stock1];
    const dividend2 = stockData["Valuation & Dividends"]["Dividend Yield"][stock2];
    const assets1 = stockData["Valuation & Dividends"]["Book Value"][stock1];
    const assets2 = stockData["Valuation & Dividends"]["Book Value"][stock2];

  const dividendYieldData = {
    labels: [stock1, stock2],
    datasets: [
      {
        data: [dividend1, dividend2],
        backgroundColor: ["#4A90E2", "#7ED321"],
      },
    ],
  };

  const bookValueData = {
    labels: [stock1, stock2],
    datasets: [
      {
        label: "Book Value (₹)",
        data: [assets1, assets2],
        backgroundColor: ["#4A90E2", "#7ED321"],
      },
    ],
  };

  return (
    <div className="bg-[#09090b] text-white p-8">

      <div className="grid grid-cols-2 gap-8 mb-4">
        <div className="flex border border-gray-600 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-2">Dividend Yield (%)</h2>
          <div className="w-[300px] h-[300px] pt-6 "><Pie data={dividendYieldData} /></div>
        </div>
        <div className="border border-gray-600 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-2">Book Value (₹)</h2>
          <Bar data={bookValueData} />
        </div>
      </div>
    </div>
  );
};

export default Valuation;
