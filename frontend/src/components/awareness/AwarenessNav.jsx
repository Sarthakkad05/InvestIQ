import React from "react";
import logo from "../..//icons/logo.png"
import { Link } from "react-router-dom";
import Logout from "../Logout";

const AwarenessNavbar = () => {
  return (
    <nav className="bg-[#09090b] text-white px-10 p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center">
      <img src={logo} alt="InvestIQ Logo" className="h-10 w-auto" />
          <Link to="/" className="text-3xl font-semibold text-[#3c82f6]">
            InvestIQ
          </Link>
      </div>

      <div className="flex gap-8 text-gray-300 text-sm">
        <a href="#videosection" className="hover:text-white transition">
          Videos
        </a>
        <a href="#experttips" className="hover:text-white transition">
          Expert Tips
        </a>
        <a href="#scamreports" className="hover:text-white transition">
          Scam Reports
        </a>
        <a href="#financialsafety" className="hover:text-white transition">
          Precautions
        </a>
      </div>

      <Link to="/dashboard" className="px-4 py-2 bg-[#3c82f6] text-white rounded-lg">Profile</Link>

    </nav>
  );
};

export default AwarenessNavbar;
