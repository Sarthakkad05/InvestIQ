import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SearchIcon from "../../icons/SearchIcon";

const SearchBar = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    function handleChange(){
        if(message.trim()){
            navigate("/chatbot" , {state : {initialMessage: message}})
        }
    }

  return (
            <div className="flex items-center py-3 px-4 border border-gray-800 rounded-xl gap-6 bg-[#09090b] shadow-lg w-full max-w-xl mx-auto mb-14">
            <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChange()}
                placeholder="Search ..." 
                className="flex-grow p-3 rounded-full bg-[#09090b] border-none outline-none text-gray-500 placeholder-gray-300"
            />
            <button 
            onClick={handleChange}
            className="p-2 bg-[#3c82f6] rounded-full hover:bg-[#047857]"
            ><SearchIcon/></button>
            </div>
    );
  };
  
  export default SearchBar;




//   #09090b