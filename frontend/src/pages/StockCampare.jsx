import axios from "axios";
import { useState, useEffect } from "react";
import { useStockData } from "../components/tools/StockContext";
import StockInfo from "../components/tools/stockInfo";
import BalanceSheet from "../components/tools/BalanceSheet";
import Valuation from "../components/tools/Valuation";
import Financial from "../components/tools/Financial";
import Navbar from "../components/home/TopBar";

const API_URL = "http://localhost:8000/compare_stocks";


const StockCompare = () => {
  const [stock1, setStock1] = useState("");
  const [stock2, setStock2] = useState("");
  const [userId, setUserId] = useState(null);
  const { stockData, setStockData } = useStockData();

  const tabs = ["General Info", "Financial Performance", "Balance Sheet", "Valuation & Dividends"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const fetchStockDetails = async () => {
    try {
      const response = await axios.post(API_URL, {
        user_id: userId,
        stock1: stock1,
        stock2: stock2,
      });
      setStockData(response.data);
      setShowContent(true);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch company data", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "General Info":
        return <StockInfo />;
      case "Financial Performance":
        return <Financial />;
      case "Balance Sheet":
        return <BalanceSheet />;
      case "Valuation & Dividends":
        return <Valuation />;
      default:
        return <StockInfo />;
    }
  };

  return (
    <div className={`w-screen bg-[#09090b] text-white ${showContent ? "h-full" : "h-screen"}`}>
      <Navbar />
      <div className="flex justify-center items-center pb-6 pt-10">
        <h1 className="text-3xl font-bold text-white text-center">
          Compare Stocks with Graphical Insights
        </h1>
      </div>

      {/* Stock Input Section */}
      <div className="flex justify-center items-center mb-5">
        <div className="flex justify-center items-center gap-2 bg-[#121214] p-5 rounded-lg border border-gray-800">
          <div>
            <h3>Stock 1</h3>
            <input
              type="text"
              className="p-3 mr-2 mt-2 rounded-lg bg-[#09090b] border border-gray-600 outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af]"
              placeholder="Symbol eg.(Reliance)"
              value={stock1}
              onChange={(e) => setStock1(e.target.value)}
            />
          </div>
          <div>
            <h3>Stock 2</h3>
            <input
              type="text"
              className="p-3 mx-2 mt-2 rounded-lg bg-[#09090b] border border-gray-600 outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af]"
              placeholder="Symbol eg.(TCS)"
              value={stock2}
              onChange={(e) => setStock2(e.target.value)}
            />
            <button
              className="py-2 px-4 bg-[#3c82f6] text-white font-medium rounded-lg hover:bg-[#047857]"
              onClick={fetchStockDetails}
            >
              Compare
            </button>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      {showContent && (
        <div className="flex flex-col items-center p-4 mt-5">
          <div className="flex gap-4 bg-[#121212] rounded-lg shadow-md p-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gray-500 text-white rounded-md shadow-inner"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="w-full h-full p-4">{renderContent()}</div>
        </div>
      )}
    </div>
  );
};

export default StockCompare;
