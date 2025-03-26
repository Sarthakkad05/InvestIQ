import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import { useTranslation } from "../context/TranslationContext"; 
import SearchIcon from "../icons/SearchIcon";
import remarkGfm from "remark-gfm";
import axios from "axios";
import Navbar from "../components/home/TopBar";

const API_URL = "http://localhost:8000/chat";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const { translateText, language } = useTranslation(); 

  const location = useLocation();
  const initialMessage = location.state?.initialMessage || "";

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (initialMessage) {
      setInput(initialMessage);
      sendMessage(initialMessage);
    }
  }, [initialMessage]);

  const sendMessage = async (msg = input) => {
    if (!msg.trim()) return;
  
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setLoading(true);
  
    try {
      const response = await axios.post(
        API_URL,
        { user_id: userId || "guest", message: msg },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const botMessage = {
        sender: "bot",
        text: response.data.reply || "⚠️ Error: No response received.",
      };
  

      const translatedBotMessage = {
        sender: "bot",
        text: await translateText(botMessage.text),
      };
  
      setMessages((prev) => [...prev, translatedBotMessage]);
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
  
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error fetching response. Try again!" },
      ]);
    }
  
    setLoading(false);
    setInput("");
  };
  

  return (
    <div className="flex bg-[#09090b] flex-col h-screen text-white">
      <Navbar />
      <div className="flex-1 overflow-y-auto m-2 p-4 mx-[300px] space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 ${
              msg.sender === "user"
                ? "bg-[#121214] border border-gray-700 px-8 rounded-full text-white ml-auto max-w-xs"
                : "text-left text-gray-300 overflow-y-auto leading-loose w-full  px-8 py-6"
            }`}
          >
            {msg.sender === "bot" ? (
              <TypingEffect text={msg.text} />
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.text}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {loading && (
          <div className="text-left text-[#b6c2cf] overflow-y-auto leading-loose w-full">
            <TypingLoader />
          </div>
        )}
      </div>

      <div className="flex items-center py-3 px-4 border border-gray-800 rounded-xl gap-6 bg-[#121214] shadow-lg w-full max-w-xl mx-auto mb-8">
        <input
          type="text"
          className="flex-grow p-3 rounded-full bg-[#121214] border-none outline-none text-gray-500 placeholder-gray-300"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="p-2 bg-[#3c82f6] rounded-full hover:bg-[#047857] disabled:bg-gray-500"
          onClick={sendMessage}
          disabled={loading}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

const TypingEffect = ({ text, speed = 5 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;

      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>
  );
};

const TypingLoader = () => {
  return (
    <div className="flex items-center gap-1 mt-2">
      <span className="w-2 h-2 bg-[#b6c2cf] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-[#b6c2cf] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-[#b6c2cf] rounded-full animate-bounce"></span>
    </div>
  );
};
