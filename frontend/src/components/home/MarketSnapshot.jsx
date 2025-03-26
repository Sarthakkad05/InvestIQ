import React, { useEffect, useState } from "react";
import { useTranslation } from "../../context/TranslationContext";

const marketData = [
  { name: "NIFTY 50", value: "22,456.80", change: "+1.2%", isPositive: true },
  { name: "SENSEX", value: "73,942.15", change: "+0.9%", isPositive: true },
  { name: "Gold (10g)", value: "₹68,250", change: "+0.5%", isPositive: true },
  { name: "Silver (1kg)", value: "₹78,500", change: "-0.3%", isPositive: false },
  { name: "USD/INR", value: "83.25", change: "-0.1%", isPositive: false },
  { name: "NIFTYBANK", value: "₹51,607", change: "-0.19%", isPositive: false },
  { name: "Reliance", value: "₹1285.25", change: "-1.29%", isPositive: false },
  { name: "Crude Oil", value: "₹69.52", change: "+0.51%", isPositive: true },
  { name: "ETH", value: "$2070.61", change: "-0.41%", isPositive: false },
  { name: "Bitcoin", value: "$68,420", change: "+2.3%", isPositive: true },
];

function MarketSnapshot() {
  const { translateText, language } = useTranslation();
  const [translatedHeading, setTranslatedHeading] = useState("");
  const [translatedMarketData, setTranslatedMarketData] = useState([]);
  const [translatedButtonText, setTranslatedButtonText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const translateContent = async () => {
      try {
        setLoading(true);

        const [headingTranslation, buttonTranslation] = await Promise.all([
          translateText("Market Snapshot"),
          translateText("View Detailed Market Data"),
        ]);

        setTranslatedHeading(headingTranslation);
        setTranslatedButtonText(buttonTranslation);

        const translatedData = await Promise.all(
          marketData.map(async (item) => ({
            ...item,
            name: await translateText(item.name),
          }))
        );

        setTranslatedMarketData(translatedData);
      } catch (error) {
        console.error("Translation error:", error);
      } finally {
        setLoading(false); 
      }
    };

    translateContent();
  }, [translateText, language]);

  if (loading) {
    return (
      <div className="text-center text-white py-8">
        <p className="animate-pulse text-lg">Loading market data...</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-12 bg-[#09090b]">
      <div className="flex justify-center items-center">
        <h2 className="text-2xl font-bold text-white mb-4">{translatedHeading}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
        {translatedMarketData.map((item, index) => (
          <div
            key={index}
            className="bg-[#121214] p-4 rounded-md shadow-lg text-white border border-gray-800 hover:scale-105 transition-transform"
          >
            <h3 className="text-md mb-2">{item.name}</h3>
            <div className="flex gap-4">
              <p className="text-xl font-bold">{item.value}</p>
              <p className={`text-sm ${item.isPositive ? "text-green-400" : "text-red-400"}`}>
                {item.isPositive ? "↗" : "↘"} {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <button className="border border-gray-800 rounded-lg text-white p-2 text-sm hover:bg-[#3c82f6] transition-colors">
          {translatedButtonText}
        </button>
      </div>
    </div>
  );
}

export default MarketSnapshot;
