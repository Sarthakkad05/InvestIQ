import { useState } from "react";
import axios from "axios";
import Navbar from "../components/home/TopBar";

const ReportScam = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setMessage({ type: "error", text: "Title and description are required." });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/report_scam", {
        title,
        description,
        evidence,
      });

      setMessage({ type: "success", text: "Scam reported successfully. Thank you!" });
      setTitle("");
      setDescription("");
      setEvidence("");
    } catch (error) {
      console.error("Error reporting scam:", error);
      setMessage({ type: "error", text: "Failed to report the scam. Please try again." });
    }
    setLoading(false);
  };

  return (
    <div>
        <Navbar/>
    <div className="h-screen bg-[#09090b] text-white flex items-center justify-center">
      <div className="bg-[#121214] p-6 rounded-lg shadow-lg w-[400px] border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-center">🚨 Report a Scam</h1>

        {message && (
          <div
            className={`text-center p-2 mb-4 rounded ${
              message.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Scam Title</label>
          <input
            type="text"
            placeholder="e.g. Fake investment scheme"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-3 bg-[#09090b] border border-gray-600 rounded outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af]"
          />

          <label className="block mb-2 text-sm font-medium">Description</label>
          <textarea
            placeholder="Describe the scam details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-3 bg-[#09090b] border border-gray-600 rounded outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af] resize-none h-24"
          ></textarea>

          <label className="block mb-2 text-sm font-medium">Evidence (Optional)</label>
          <input
            type="text"
            placeholder="Link or file URL (optional)"
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            className="w-full p-2 mb-4 bg-[#09090b] border border-gray-600 rounded outline-none text-sm text-[#e6e6e6] placeholder-[#9ca3af]"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#e63946] text-white font-medium rounded-lg hover:bg-[#b92d38] transition duration-200"
            disabled={loading}
          >
            {loading ? "Reporting..." : "Report Scam"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ReportScam;
