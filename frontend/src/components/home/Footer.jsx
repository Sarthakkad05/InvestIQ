import React, { useState, useEffect } from "react";
import { useTranslation } from "../../context/TranslationContext";
import { Link } from "react-router-dom";


function Footer() {
  const { translateText } = useTranslation();
  const [translated, setTranslated] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      const keys = [
        "InvestIQ",
        "Making investment decisions simpler and smarter with data-driven insights and tools.",
        "Quick Links",
        "Home",
        "About",
        "Tools",
        "Knowledge Base",
        "Resources",
        "News & Reports",
        "Financial Awareness",
        "SEBI Guidelines",
        "Report Scam",
        "Contact Us",
        "Have questions or feedback? We'd love to hear from you.",
        "Contact Support",
        "All rights reserved.",
      ];

      const translations = {};
      for (const key of keys) {
        translations[key] = await translateText(key);
      }
      setTranslated(translations);
    };

    loadTranslations();
  }, [translateText]);

  if (Object.keys(translated).length === 0) return <p>Loading...</p>;

  return (
    <footer className="bg-[#31363F] text-white p-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
            <span>📘</span> {translated["InvestIQ"]}
          </h2>
          <p className="text-gray-400 mt-2">{translated["Making investment decisions simpler and smarter with data-driven insights and tools."]}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">{translated["Quick Links"]}</h3>
          <ul className="text-gray-400 text-sm space-y-3">
            <li><Link to="/" className="hover:text-white">{translated["Home"]}</Link></li>
            <li><Link to="/about" className="hover:text-white">{translated["About"]}</Link></li>
            <li><a href="#features" className="hover:text-white">{translated["Tools"]}</a></li>
            <li><Link to="" className="hover:text-white">{translated["Knowledge Base"]}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">{translated["Resources"]}</h3>
          <ul className="text-gray-400 text-sm space-y-3">
            <li><Link to="/news" className="hover:text-white">{translated["News & Reports"]}</Link></li>
            <li><Link to="" className="hover:text-white">{translated["Financial Awareness"]}</Link></li>
            <li><Link to="/guidlines" className="hover:text-white">{translated["SEBI Guidelines"]}</Link></li>
            <li><Link to="/report" className="hover:text-white">{translated["Report Scam"]}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">{translated["Contact Us"]}</h3>
          <p className="text-gray-400 mb-6">{translated["Have questions or feedback? We'd love to hear from you."]}</p>
          <button className="bg-[#3c82f6] text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
            {translated["Contact Support"]}
          </button>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © 2025 InvestIQ. {translated["All rights reserved."]}
      </div>
    </footer>
  );
}

export default Footer;
