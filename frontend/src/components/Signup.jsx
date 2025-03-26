// import React, { useState } from "react";
// import { signup } from "../services/authService"; 


// const Signup = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await signup(email, password, name);
//       onClose(); 
//       navigate("/");
//     } catch (err) {
//       console.error("Signup Error:", err);
//       setError(err.response?.data?.detail || "Signup failed!");
//     }
//   };

//   if (!isOpen) return null; 

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <form className="flex flex-col" onSubmit={handleSignup}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
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
//             Sign Up
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

// export default Signup;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, login } from "../services/authService";
import { setToken } from "../utils/storage";

// Signup Component
const Signup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      onClose();
      navigate("/login", { state: { email } });
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data?.detail || "Signup failed!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form className="flex flex-col" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
            Sign Up
          </button>
        </form>

        <button onClick={onClose} className="mt-4 text-gray-600 hover:text-gray-900">
          Close
        </button>
      </div>
    </div>
  );
};

export default Signup;