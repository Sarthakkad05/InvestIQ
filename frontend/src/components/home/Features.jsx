import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../context/TranslationContext";

const topicsData = [
  { icon: "📈", title: "Compare", description: "Easily compare stocks, mutual funds, and other assets side by side to make informed decisions faster.", path: "/compare", bgColor: "bg-[#F0F8FF]" },
  { icon: "💰", title: "Wealth Manager", description: "Get personalized strategies to grow and manage your wealth, tailored to your financial goals and risk profile.", path: "/wealth", bgColor: "bg-[#F0F8FF]" },
  { icon: "🔍", title: "Screener", description: "Filter stocks and funds based on market cap, P/E ratio, sectors, dividend yield, and risk levels — all in one place.", path: "/screener", bgColor: "bg-[#F0F8FF]" },
  { icon: "📊", title: "Portfolio Manager", description: "Track your investments, monitor performance, and rebalance your portfolio for optimal returns.", path: "/portfolio", bgColor: "bg-[#F0F8FF]" },
  { icon: "💸", title: "Tax Optimization", description: "Discover strategies to reduce tax liabilities while maximizing investment returns.", path: "/taxoptimize", bgColor: "bg-[#F0F8FF]" },
  { icon: "⚠️", title: "Report Scam", description: "Stay safe from fraud! Report suspicious activities and scams directly through our platform.", path: "/report", bgColor: "bg-red-400" },
];

function Features() {
  const navigate = useNavigate();
  const { translateText, language } = useTranslation();

  const [translatedHeading, setTranslatedHeading] = useState("Our Features");
  const [translatedTopics, setTranslatedTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const translateContent = async () => {
      try {
        setLoading(true);

        const headingTranslation = await translateText("Our Features");
        setTranslatedHeading(headingTranslation);

        const translatedData = await Promise.all(
          topicsData.map(async (topic) => ({
            ...topic,
            title: await translateText(topic.title),
            description: await translateText(topic.description),
          }))
        );

        setTranslatedTopics(translatedData);
      } catch (error) {
        console.error("Translation error:", error);
      } finally {
        setLoading(false);
      }
    };

    translateContent();
  }, [translateText, language]);

  const handleNavigate = (path) => navigate(path);

  if (loading) {
    return (
      <div className="text-center text-white py-8">
        <p className="animate-pulse text-lg">Loading features...</p>
      </div>
    );
  }

  return (
    <div id="features" className="px-24 py-12 bg-[#09090b]">
      <h2 className="text-2xl font-semibold text-white mb-8 text-center">{translatedHeading}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {translatedTopics.map((topic, index) => (
          <div
            key={index}
            onClick={() => handleNavigate(topic.path)}
            className="relative group bg-[#1a1a1d] p-4 rounded-lg shadow-md border border-gray-800 cursor-pointer transition-transform transform hover:scale-110 w-96 h-60 flex flex-col justify-center items-center text-center"
          >
            <span className="text-3xl mb-2">{topic.icon}</span>
            <h3 className="text-lg font-semibold text-white mb-2">{topic.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{topic.description}</p>

            <div
              className={`absolute top-0 left-0 w-full h-full ${topic.bgColor} bg-opacity-100 text-black p-4 rounded-lg opacity-0 scale-100 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 flex flex-col justify-center items-center`}
            >
              <span className="text-4xl mb-2">{topic.icon}</span>
              <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
              <p className="text-sm mb-4 text-gray-700">{topic.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
