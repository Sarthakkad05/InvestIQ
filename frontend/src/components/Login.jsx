
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../services/authService"
import { setToken } from "../utils/storage";

// const Login = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login(email, password);
//       setToken(response.idToken); 
//       localStorage.setItem("userId", response.user_id);
//       onClose();
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.detail || "Login failed!");
//     }
//   };

//   if (!isOpen) return null; 

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-semibold mb-4">Login</h2>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//         <form className="flex flex-col" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>
//         <button
//           onClick={onClose}
//           className="mt-4 text-gray-600 hover:text-gray-900"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;


const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Autofill email from Signup redirect
  React.useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      setToken(response.idToken);
      localStorage.setItem("userId", response.user_id);
      onClose();
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <button onClick={onClose} className="mt-4 text-gray-600 hover:text-gray-900">
          Close
        </button>
      </div>
    </div>
  );
};

export default Login ;
