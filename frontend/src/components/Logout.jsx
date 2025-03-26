import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/storage";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full font-semibold shadow-md hover:scale-105 hover:from-red-600 hover:to-red-800 transition-all duration-300 ease-in-out"
    >
      Logout
    </button>
  );
};

export default Logout;
