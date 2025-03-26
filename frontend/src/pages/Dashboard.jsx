import React from "react";
import Logout from "../components/Logout";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-bold mb-4 animate-fade-in">Welcome to Dashboard</h2>
      <p className="text-gray-400 mb-8 text-lg">
        Manage your investments, track your progress, and stay updated.
      </p>
      <Logout />
    </div>
  );
};

export default Dashboard;
