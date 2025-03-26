import React from "react";

function AboutUs() {
  return (
    <div className="py-8 px-20 bg-[#121214] text-white min-h-screen flex items-center justify-start">
      <div className="max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-blue-400">About Us - InvestIQ</h1>

        <p className="text-gray-300 text-lg">
          At <span className="text-blue-400 font-semibold">InvestIQ</span>, we believe that smart investing should be accessible to everyone — from beginners looking to build wealth to seasoned investors optimizing their portfolios.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">Our Mission</h2>
          <p className="text-gray-300">
            We’re on a mission to <span className="font-semibold">democratize financial literacy</span> and help users <span className="font-semibold">grow their investments intelligently</span>. By blending technology with human-centric design, we offer personalized recommendations, market analysis, and educational resources — all in one place.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">Why Choose InvestIQ?</h2>
          <ul className="space-y-2 text-gray-300 list-disc list-inside">
            <li><span className="font-semibold">Education First:</span> We’re not just about investing; we help you learn and grow along the way.</li>
            <li><span className="font-semibold">Personalized Investment Plans:</span> Tailored to your financial goals, risk appetite, and experience.</li>
            <li><span className="font-semibold">AI-Powered Chatbot:</span> Get instant, data-driven answers to your financial questions.</li>
            <li><span className="font-semibold">Real-Time Market Insights:</span> Stay updated with stock screeners, finance news, and sector analysis.</li>
            <li><span className="font-semibold">User-Friendly Design:</span> A clean, intuitive platform — no financial jargon, just clarity.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">Our Vision</h2>
          <p className="text-gray-300">
            We envision a future where <span className="font-semibold">everyone</span> — no matter their background — has the confidence and tools to <span className="font-semibold">achieve financial independence</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
