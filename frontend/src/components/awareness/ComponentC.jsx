import React, { useState } from "react";

const tipsData = {
  Investing: [
    {
      name: "Sarah Johnson",
      role: "Investment Advisor",
      advice:
        "Diversification is key to reducing investment risk. Don't put all your eggs in one basket, especially when markets are volatile.",
    },
    {
      name: "Michael Chen",
      role: "Portfolio Manager",
      advice:
        "Before investing in any opportunity, research the company thoroughly and verify their credentials with regulatory bodies.",
    },
    {
      name: "Priya Patel",
      role: "Financial Analyst",
      advice:
        "Be wary of investments promising unusually high returns with 'no risk.' If it sounds too good to be true, it probably is.",
    },
  ],
  Saving: [
    {
      name: "Alex Green",
      role: "Savings Consultant",
      advice:
        "Build an emergency fund with at least 3-6 months' worth of expenses to ensure financial stability in uncertain times.",
    },
  ],
  Security: [
    {
      name: "Jordan Lee",
      role: "Cybersecurity Expert",
      advice:
        "Always use two-factor authentication (2FA) on financial accounts to protect your money from online attacks.",
    },
  ],
  Planning: [
    {
      name: "Emily Davis",
      role: "Financial Planner",
      advice:
        "Start retirement planning early to leverage the power of compound interest and secure a comfortable future.",
    },
  ],
};

const TipCard = ({ name, role, advice }) => (
  <div className="bg-[#121214] border border-gray-600 rounded-lg p-4 w-80 shadow-md">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 bg-gray-400 rounded-full" />
      <div>
        <h4 className="text-white font-semibold text-md">{name}</h4>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
    </div>
    <p className="text-gray-300 mb-4 text-sm italic">"{advice}"</p>
    <a href="#" className="text-blue-500 text-sm hover:underline">
      Read More Advice
    </a>
  </div>
);

const ExpertTipsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Investing");

  return (
    <div id="experttips" className="bg-[#121214] py-24 text-center">
      <div className="text-blue-500 font-medium text-sm mb-2">👥 Expert Insights</div>
      <h2 className="text-white text-4xl font-bold mb-2">Financial Expert Tips</h2>
      <p className="text-gray-400 mb-6">
        Advice and guidance from certified financial professionals to help you make informed decisions.
      </p>

      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(tipsData).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md text-sm ${
              activeCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-6 flex-wrap">
        {tipsData[activeCategory].map((tip, index) => (
          <TipCard key={index} {...tip} />
        ))}
      </div>
    </div>
  );
};

export default ExpertTipsSection;
