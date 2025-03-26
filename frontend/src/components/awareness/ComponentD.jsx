import React from "react";

const scamData = [
  {
    risk: "High Risk",
    riskColor: "text-orange-500",
    title: "Cryptocurrency Investment Scam",
    date: "June 15, 2023",
    description:
      "Fraudsters are creating fake cryptocurrency investment platforms promising unrealistic returns.",
    regions: ["North America", "Europe", "Asia"],
  },
  {
    risk: "Critical Risk",
    riskColor: "text-red-500",
    title: "Banking SMS Phishing",
    date: "July 3, 2023",
    description:
      "Text messages claiming to be from major banks asking users to verify account information through suspicious links.",
    regions: ["Global"],
  },
  {
    risk: "Medium Risk",
    riskColor: "text-yellow-500",
    title: "Fake Tax Refund Emails",
    date: "April 10, 2023",
    description:
      "Emails impersonating tax authorities offering refunds to collect personal and banking information.",
    regions: ["United States", "Canada", "Australia"],
  },
  {
    risk: "Medium Risk",
    riskColor: "text-yellow-500",
    title: "Investment Seminar Fraud",
    date: "May 22, 2023",
    description:
      "Free investment seminars that pressure attendees into high-fee, high-risk investments with misleading promises.",
    regions: ["United States", "United Kingdom"],
  },
  {
    risk: "High Risk",
    riskColor: "text-orange-500",
    title: "Pension Liberation Scheme",
    date: "June 30, 2023",
    description:
      "Scammers offering to help people access their pension before age 55, resulting in huge tax penalties.",
    regions: ["United Kingdom", "Australia"],
  },
  {
    risk: "Critical Risk",
    riskColor: "text-red-500",
    title: "Fake Banking Apps",
    date: "July 12, 2023",
    description:
      "Counterfeit banking applications on app stores that steal login credentials and financial information.",
    regions: ["Global"],
  },
];

const ScamCard = ({ scam }) => (
  <div className="bg-[#121214] border border-gray-700 rounded-lg p-4 shadow-md">
    <div className={`text-sm font-semibold ${scam.riskColor}`}>⚠️ {scam.risk}</div>
    <h3 className="text-white font-bold text-lg mt-2">{scam.title}</h3>
    <p className="text-gray-400 text-sm mb-2 mt-1">{scam.date}</p>
    <p className="text-gray-300 text-sm">{scam.description}</p>
    <div className="flex flex-wrap gap-2 mt-3">
      {scam.regions.map((region, index) => (
        <span
          key={index}
          className="text-gray-400 bg-gray-800 px-2 py-1 text-xs rounded-full"
        >
          {region}
        </span>
      ))}
    </div>
    <button className="mt-4 w-full text-gray-300 hover:text-white text-sm flex items-center justify-center gap-1 py-2 border border-gray-600 rounded-md">
      ℹ️ View Details
    </button>
  </div>
);

const RecentScamsSection = () => {
  return (
    <div id="scamreports" className="bg-[#09090b] py-24 text-center">
      <div className="text-blue-500 font-medium text-sm mb-2">🛡️ Scam Alerts</div>
      <h2 className="text-white text-4xl font-bold mb-2">Recent Financial Scams</h2>
      <p className="text-gray-400 mb-6">
        Stay informed about the latest scams and fraudulent schemes targeting consumers.
      </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-items-center px-14">
        {scamData.map((scam, index) => (
          <ScamCard key={index} scam={scam} />
        ))}
      </div>

    </div>
  );
};

export default RecentScamsSection;
