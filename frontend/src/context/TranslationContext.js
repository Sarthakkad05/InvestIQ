import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Replace with your actual Google Translate API Key
const API_KEY = "AIzaSyC-rk7NEswIXwT8bSFvK9P2-a2e8bwFJjU";
const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const translateText = async (text) => {
    if (language === "en") return text;

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
          q: text,
          target: language,
        }
      );

      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation failed:", error);
      return text; // Fallback to original text if translation fails
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ta" : "en"));
  };

  return (
    <TranslationContext.Provider value={{ language, translateText, toggleLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
