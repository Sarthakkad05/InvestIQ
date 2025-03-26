import { FaShieldAlt } from "react-icons/fa";
import Navbar from "../components/home/TopBar";
import sebi from "../icons/sebi.png"
import rbi from "../icons/rbi.png"

export default function SEBIGuidelines() {
  const guidelines = [
    {
      title: "Investor Protection",
      description:
        "Learn about the measures SEBI has implemented to protect investor interests in the financial markets.",
      link: "https://www.sebi.gov.in/sebi_data/commondocs/pt1b2c_h.html",
    },
    {
      title: "Market Regulations",
      description:
        "Understand the regulatory framework that governs securities markets in India to make compliant investment decisions.",
      link: "#",
    },
    {
      title: "Disclosure Requirements",
      description:
        "Explore the disclosure norms that companies must adhere to, ensuring transparency for investors.",
      link: "#",
    },
    {
      title: "Corporate Governance",
      description:
        "Guidelines on board composition, audit committees, and shareholder rights to ensure ethical corporate management.",
      link: "#",
    },
    {
      title: "Mutual Fund Regulations",
      description:
        "Comprehensive framework governing mutual fund operations, investment restrictions, and investor reporting requirements.",
      link: "#",
    },
    {
      title: "Insider Trading Prevention",
      description: "Regulations to prevent unfair trading practices based on unpublished price-sensitive information.",
      link: "#",
    },
  ];


  const rbiReports = [
    {
      title: "Monetary Policy Report",
      description:
        "Bi-annual assessment of macroeconomic developments and projections including inflation, growth, and monetary measures.",
      link: "#",
      date: "April 2023",
    },
    {
      title: "Financial Stability Report",
      description:
        "Analysis of risks to financial stability, resilience of the banking sector, and stress test results.",
      link: "#",
      date: "December 2022",
    },
    {
      title: "Banking Trends & Progress",
      description: "Annual report on the performance, regulations, and emerging trends in the Indian banking sector.",
      link: "#",
      date: "February 2023",
    },
    {
      title: "Payment Systems Vision",
      description:
        "Strategic initiatives and framework for the development of safe, secure, and efficient payment ecosystems.",
      link: "#",
      date: "March 2023",
    },
    {
      title: "Foreign Exchange Management",
      description:
        "Guidelines on foreign exchange transactions, overseas investments, and external commercial borrowings.",
      link: "#",
      date: "January 2023",
    },
    {
      title: "Currency Management Report",
      description: "Details on currency circulation, counterfeit detection, and clean note policy implementation.",
      link: "#",
      date: "November 2022",
    },
  ]

  return (
    <div className="h-full bg-[#09090b]">
    <Navbar/>
    <div className="text-white p-6 ">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <img src={sebi} alt="sebi"  className="h-10 w-auto"/> SEBI Guidelines & Regulations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guidelines.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-gray-700 rounded-lg hover:border-gray-500 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400 mb-3">{item.description}</p>
            <a href={item.link} className="text-blue-400 hover:underline">
              View Guidelines
            </a>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold flex items-center gap-2 mt-8 mb-10">
      <img src={rbi} alt="sebi"  className="h-10 w-auto"/>  RBI Reports
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rbiReports.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-gray-700 rounded-lg hover:border-gray-500 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400 mb-3">{item.description}</p>
            <a href={item.link} className="text-blue-400 hover:underline">
              View Guidelines
            </a>
            <p>{item.date}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
