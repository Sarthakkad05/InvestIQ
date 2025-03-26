import React from "react";
import { useTranslation } from "../../context/TranslationContext";

const LanguageToggleButton = () => {
  const { toggleLanguage, language } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-200 fixed top-4 right-4 z-50"
    >
      {language === "en" ? "हिंदी में बदलें" : "Switch to English"}
    </button>
  );
};

export default LanguageToggleButton;
