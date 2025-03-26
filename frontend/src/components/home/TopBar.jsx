import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/storage";
import { useTranslation } from "../../context/TranslationContext";
import Signup from "../Signup";
import Login from "../Login";
import logo from "../../icons/logo.png";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  let timeoutId = null;

  const navigate = useNavigate();
  const isLoggedIn = getToken();

  const { language, toggleLanguage } = useTranslation();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, []);

  const handlePress = () => {
    navigate(`/company/${query}`, { state: { userId } });
  };

  return (
    <nav className="bg-[#09090b]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center gap-2 py-4">
          <div className="flex justify-between gap-2 items-center">
            <img src={logo} alt="InvestIQ Logo" className="h-10 w-auto" />
            <Link to="/" className="text-3xl font-semibold text-[#3c82f6] mr-[100px]">
              InvestIQ
            </Link>

            <div className="mt-1">
              <Link to="/" className="text-md hover:text-[#3c82f6] hover:underline text-white mr-4">
                Home
              </Link>

              <Link
                className="relative cursor-pointer text-md hover:text-[#3c82f6] hover:underline text-white mr-4"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Tools
                {isOpen && (
                  <ul
                    className={`absolute top-full left-0 mt-1 w-60 bg-white text-black shadow-lg rounded-lg 
                      origin-top scale-y-90 opacity-0 animate-dropdown`}
                  >
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <Link to="/compare">Compare</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <Link to="/portfolio">Portfolio Manager</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <Link to="/screener">Screener</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <Link to="/wealth">Wealth Manager</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <Link to="/taxoptimize">Tax Optimization</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <Link to="/report">Report Scam</Link>
                    </li>
                  </ul>
                )}
              </Link>

              <Link to="/chatbot" className="text-md hover:text-[#3c82f6] text-white hover:underline mr-4">
                Chatbot
              </Link>
              <Link to="/news" className="text-md hover:text-[#3c82f6] text-white hover:underline mr-4">
                News
              </Link>
              <Link to="/guidlines" className="text-md hover:text-[#3c82f6] text-white  hover:underline mr-4">
                Guidelines
              </Link>
              <Link to="/awareness" className="text-md hover:text-[#3c82f6] text-white hover:underline">
                Awareness
              </Link>
            </div>

            <style>
              {`
              @keyframes dropdown {
                from {
                  transform: scaleY(0.9);
                  opacity: 0;
                }
                to {
                  transform: scaleY(1);
                  opacity: 1;
                }
              }

              .animate-dropdown {
                animation: dropdown 0.2s ease-out forwards;
              }
            `}
            </style>
          </div>

          <div className="space-x-1 ml-5 flex">
            <input
              type="text"
              placeholder="Search company..."
              value={query}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim().toUpperCase() !== "") handlePress(e);
              }}
              onChange={(e) => setQuery(e.target.value)}
              className="w-60 px-5 mr-6 text-black bg-gray-100 border placeholder-gray-400 border-black rounded-lg focus:outline-none"
            />

            {isLoggedIn ? (
              <Link to="/dashboard" className="px-4 py-2 bg-[#3c82f6] text-white rounded-lg">
                Profile
              </Link>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="px-6 py-2 bg-white text-[#030712] rounded-lg shadow-md hover:bg-blue-500 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="px-5 py-2 bg-[#3c82f6] text-white rounded-lg shadow-md hover:bg-blue-500 transition"
                  >
                    Sign Up
                  </button>
                </div>
                <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
                <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
              </div>
            )}

            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-[#3c82f6] text-white rounded-lg"
            >
              {language === "en" ? "தமிழ்" : "English"}
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-700" />
    </nav>
  );
};

export default Navbar;
