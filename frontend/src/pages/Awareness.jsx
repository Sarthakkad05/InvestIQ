import React from "react";
import AwarenessNavbar from "../components/awareness/AwarenessNav";
import VideoSection from "../components/awareness/ComponentB";
import ExpertTipsSection from "../components/awareness/ComponentC";
import RecentScamsSection from "../components/awareness/ComponentD";
import FinancialSafetySection from "../components/awareness/ComponentE";
import FinancialAwarenessHero from "../components/awareness/ComponentA";
import Footer from "../components/home/Footer";

function AwarenessTab() {
  return (
    <div className="bg-[#121214] min-h-screen text-gray-100">
        <AwarenessNavbar/>
        <FinancialAwarenessHero/>
        <VideoSection/>
        <ExpertTipsSection/>
        <RecentScamsSection/>
        <FinancialSafetySection/>
        <Footer/>
    </div>
  );
}

export default AwarenessTab;
