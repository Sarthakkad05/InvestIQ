import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StockProvider } from "./components/tools/StockContext";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot"
import Dashboard from "./pages/Dashboard";
import { CompanyDetails } from "./pages/CompanyDetails";
import StockCampare from "./pages/StockCampare";
import SEBIGuidelines from "./pages/Guidlines";
import AboutUs from "./pages/About";
import News from "./pages/News";
import ReportScam from "./pages/ReportScam";
import PortfolioManager from "./pages/PortfolioManager";
import ScreenerPage from "./pages/Screener";
import WealthManager from "./pages/WealthManager";
import TaxOptimization from "./pages/TaxOptimization";
import AwarenessTab from "./pages/Awareness";
import LanguageToggleButton from "./components/common/LanguageToggleButton";


function App() {
  return (
    <div>
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/chatbot" element={<Chatbot />} />
    
        
        
        <Route path="/guidlines" element={<SEBIGuidelines/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/news" element={<News/>} />

        <Route path="/company/:query" element={<CompanyDetails />} />
        <Route path="/compare" element={ <StockProvider><StockCampare /></StockProvider>} />
        <Route path="/portfolio" element={<PortfolioManager/>} />
        <Route path="/screener" element={<ScreenerPage/>} />
        <Route path="/Wealth" element={<WealthManager/>} />
        <Route path="/taxoptimize" element={<TaxOptimization/>} />
        <Route path="/report" element={<ReportScam/>} />
        <Route path="/awareness" element={<AwarenessTab/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
