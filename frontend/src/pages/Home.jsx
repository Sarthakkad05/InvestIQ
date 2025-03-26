import React, { useEffect, useState } from "react";
import Navbar from "../components/home/TopBar";
import SearchBar from "../components/home/Searchbar";
import HotTopics from "../components/home/HotTopics";
import MarketSnapshot from "../components/home/MarketSnapshot";
import Footer from "../components/home/Footer";
import Features from "../components/home/Features";
import { useTranslation } from "../context/TranslationContext";

const Home = () => {
  const { translateText } = useTranslation();
  const [translatedContent, setTranslatedContent] = useState({
    heading: "",
    paragraphs: [],
  });

  useEffect(() => {
    const translateContent = async () => {
      const heading = await translateText("Smart Investments Start Here");
      const paragraphs = await Promise.all([
        translateText("InvestIQ provides intelligent investment solutions powered by advanced analytics and market insights."),
        translateText("We help you make informed financial decisions for a secure future."),
      ]);

      setTranslatedContent({ heading, paragraphs });
    };

    translateContent();
  }, [translateText]);

  return (
    <div className="h-full bg-[#121214]">
      <Navbar />
      <div className="flex flex-col items-center text-center container py-14 mx-auto">
        <h1 className="text-5xl mb-8 font-semibold text-white">
          {translatedContent.heading.split(" ")[0]}{" "}
          <span className="text-[#3c82f6]">{translatedContent.heading.split(" ")[1]}</span>{" "}
          {translatedContent.heading.split(" ").slice(2).join(" ")}
        </h1>
        <div className="block text-lg text-gray-400">
          {translatedContent.paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>
      <SearchBar />
      <MarketSnapshot />
      <HotTopics />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;

