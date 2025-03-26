import React, { useState } from "react";

const Watchlist = () => {
  const [stocks, setStocks] = useState([
    { symbol: "AAPL", price: 175.23, change: "+1.25%" },
    { symbol: "GOOGL", price: 2800.75, change: "-0.45%" },
    { symbol: "TSLA", price: 950.50, change: "+2.30%" },
    { symbol: "AMZN", price: 3300.10, change: "-1.12%" },
  ]);

  return (
    <div className="bg-[#1f2937] p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">📈 Watchlist</h2>
      <ul className="space-y-2">
        {stocks.map((stock, index) => (
          <li
            key={index}
            className="flex justify-between p-3 bg-[#374151] rounded-lg"
          >
            <span className="text-white font-semibold">{stock.symbol}</span>
            <span className="text-[#b6c2cf]">{stock.price}</span>
            <span
              className={`font-medium ${
                stock.change.startsWith("+") ? "text-green-400" : "text-red-400"
              }`}
            >
              {stock.change}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
