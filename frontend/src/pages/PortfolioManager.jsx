import React, { useState, useEffect } from "react";
import Navbar from "../components/home/TopBar";

const getPortfolioData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    assets: [
      { name: "AAPL", type: "Stock", allocation: 40, value: 12000 },
      { name: "GOOGL", type: "Stock", allocation: 30, value: 9000 },
      { name: "BTC", type: "Crypto", allocation: 30, value: 8000 },
    ],
  };
};

const PortfolioManager = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolioData();
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setPortfolio({ assets: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-[#09090b] text-white min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Portfolio Manager</h1>

        {portfolio && portfolio.assets.length > 0 ? (
          <div className="grid gap-4 w-full max-w-4xl">
            {portfolio.assets.map((asset, index) => (
              <div
                key={index}
                className="bg-[#121214] rounded-xl shadow p-4 border border-gray-700 hover:scale-[1.02] transition-transform"
              >
                <h2 className="text-xl font-semibold text-[#3c82f6]">{asset.name}</h2>
                <p className="text-gray-400 mb-2">{asset.type}</p>

                <div className="w-full h-2 bg-gray-700 rounded-full mb-2">
                  <div
                    className="h-full bg-[#3c82f6] rounded-full"
                    style={{ width: `${asset.allocation}%` }}
                  ></div>
                </div>

                <p className="text-green-400 font-medium">${asset.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">No portfolio data available</div>
        )}

        <button
          className="mt-6 bg-[#3c82f6] hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all"
          onClick={() => console.log("Rebalance portfolio")}
        >
          Rebalance Portfolio
        </button>
      </div>
    </div>
  );
};

export default PortfolioManager;
