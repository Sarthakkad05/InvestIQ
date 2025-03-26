import React, { useEffect, useState } from "react";
import { useTranslation } from "../../context/TranslationContext";

const topics = [
  {
    icon: "📈",
    title: "Tech Stocks Rally",
    description: "Tech giants showing strong momentum with AI advancements driving unprecedented growth in the sector.",
    link: "Read Analysis",
  },
  {
    icon: "🏘️",
    title: "Real Estate Demand",
    description: "Housing market showing resilience with increasing demand in suburban areas and tier-2 cities.",
    link: "View Trends",
  },
     { icon: "🏦",
    title: "Banking Sector Outlook",
    description: "Financial institutions reporting strong quarterly results amid changing interest rate environment.",
    link: "See Forecast",
  },
  {
    icon: "🌱",
    title: "Renewable Energy Investments",
    description: "Green energy stocks gaining momentum as global focus shifts to sustainable development.",
    link: "Explore Opportunities",
  },
  {
    icon: "💊",
    title: "Pharma Breakthroughs",
    description: "Healthcare companies making significant advances in drug development and medical technologies.",
    link: "Research Stocks",
  },
  {
    icon: "₿",
    title: "Crypto Market Volatility",
    description: "Digital currencies experiencing significant price fluctuations amid regulatory developments.",
    link: "Track Movements",
  },
  {
    icon: "🌍",
    title: "Global Trade Impacts",
    description: "International trade policies and geopolitical tensions affecting market dynamics and commodity prices.",
    link: "Global Insights",
  },
  {
    icon: "👁️",
    title: "IPO Watch",
    description: "Upcoming public offerings generating investor interest with potential for significant market debuts.",
    link: "Upcoming IPOs",
  },
];

const HotTopics = () => {
  const { translateText } = useTranslation();
  const [translatedTopics, setTranslatedTopics] = useState([]);

  useEffect(() => {
    const translateTopics = async () => {
      const translations = await Promise.all(
        topics.map(async (topic) => ({
          icon: topic.icon,
          title: await translateText(topic.title),
          description: await translateText(topic.description),
          link: await translateText(topic.link),
        }))
      );
      setTranslatedTopics(translations);
    };

    translateTopics();
  }, [translateText]);

  return (
    <div className="p-12 bg-[#09090b]">
      <div className="flex justify-center items-center">
        <h2 className="text-2xl font-bold text-white mb-8">Hot Investment Topics</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {translatedTopics.map((topic, index) => (
          <div key={index} className="relative group bg-[#121214] p-5 rounded-lg shadow-md border border-gray-800 cursor-pointer transition-transform transform hover:scale-105">
            <span className="text-2xl mb-2">{topic.icon}</span>
            <h3 className="text-xl font-semibold text-white mb-2">{topic.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{topic.description}</p>
            <a href="#" className="text-blue-400 hover:underline text-sm font-medium">
              {topic.link}
            </a>
            <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-100 text-white p-4 rounded-lg opacity-0 scale-100 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 flex flex-col justify-center">
              <span className="text-2xl mb-2">{topic.icon}</span>
              <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
              <p className="text-sm mb-4">{topic.description}</p>
              <a href="#" className="text-blue-400 hover:underline text-sm font-medium">
                {topic.link}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotTopics;


