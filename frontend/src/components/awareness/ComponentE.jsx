import React from "react";

const safetyTips = [
  {
    title: "Online Banking Safety",
    subtitle: "Protect your digital financial presence",
    points: [
      "Use strong, unique passwords for each financial account",
      "Enable two-factor authentication whenever available",
      "Only access banking sites through official apps or by typing the URL",
      "Never click on links in emails claiming to be from your bank",
      "Use secure, private networks when accessing financial accounts",
      "Keep your devices' operating systems and security software updated",
    ],
  },
  {
    title: "Identity Protection",
    subtitle: "Safeguard your personal information",
    points: [
      "Regularly check your credit report for unauthorized accounts",
      "Shred documents containing personal or financial information",
      "Be cautious about sharing personal details on social media",
      "Consider placing a security freeze on your credit file",
      "Use credit monitoring services to detect suspicious activity",
      "Be wary of unsolicited calls or emails requesting personal information",
    ],
  },
];

const FinancialSafetySection = () => {
  return (
    <div id="financialsafety" className="bg-[#121214] py-10 px-6 text-center">
      <div className="text-blue-500 font-medium text-sm mb-2">📘 Safety Guide</div>
      <h2 className="text-white text-4xl font-bold mb-2">Financial Safety Precautions</h2>
      <p className="text-gray-400 mb-8">
        Essential steps to protect yourself from financial fraud and scams.
      </p>

      <div className="flex justify-center flex-wrap gap-6">
        {safetyTips.map((tip, index) => (
          <div
            key={index}
            className="bg-[#1c1c1e] border border-gray-700 rounded-lg p-6 w-80 shadow-md text-left"
          >
            <h3 className="text-white font-bold text-lg">{tip.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{tip.subtitle}</p>
            <ul className="text-gray-300 text-sm space-y-1">
              {tip.points.map((point, idx) => (
                <li key={idx}>• {point}</li>
              ))}
            </ul>
            <button className="mt-4 w-full text-gray-300 hover:text-white text-sm flex items-center justify-center gap-1 py-2 border border-gray-600 rounded-md">
              Learn More ➜
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialSafetySection;
