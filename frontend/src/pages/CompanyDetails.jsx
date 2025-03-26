import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/home/TopBar";

const API_URL = "http://localhost:8000/stock";

export const CompanyDetails = () => {
    const { query } = useParams();
    const [companyData, setCompanyData] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const userId = location.state?.userId;

    useEffect(() => {
      if (!query) return;
  
      const fetchCompanyDetails = async () => {
          setLoading(true); // Move this here to indicate loading starts
  
          try {
              const response = await axios.get(`${API_URL}/${query}`, {
                  headers: { "user_id": userId }
              });
              setCompanyData(response.data);
          } catch (err) {
              console.error("Failed to fetch company data", err);
          } finally {
              setLoading(false); // Ensure loading ends after success or error
          }
      };
  
      fetchCompanyDetails();
  }, [query]);
  
    //company data
    const companyInfo = companyData?.["Company Info"] || {};

    //Balance sheet
    const equityCapital = companyData?.["Balance Sheet"]?.["Equity Capital"] || {};
    const reserves = companyData?.["Balance Sheet"]?.["Reserves"] || {};
    const borrowings = companyData?.["Balance Sheet"]?.["Borrowings"] || {};
    const Oliabilities = companyData?.["Balance Sheet"]?.["Other Liabilities"] || {};
    const Tliabilities = companyData?.["Balance Sheet"]?.["Total Liabilities"] || {};
    const fixedAssets = companyData?.["Balance Sheet"]?.["Fixed Assets"] || {};
    const cwip = companyData?.["Balance Sheet"]?.["CWIP"] || {};
    const investments = companyData?.["Balance Sheet"]?.["Investments"] || {};
    const otherAssets = companyData?.["Balance Sheet"]?.["Other Assets"] || {};
    const totalAssets = companyData?.["Balance Sheet"]?.["Total Assets"] || {};

    //Cash flow
    const operatingCF = companyData?.["Cash Flow"]?.["Cash from Operating Activity"] || {};
    const investingCF = companyData?.["Cash Flow"]?.["Cash from Investing Activity"] || {};
    const finaningCF = companyData?.["Cash Flow"]?.["Cash from Financing Activity"] || {};
    const netCF = companyData?.["Cash Flow"]?.["Net Cash Flow"] || {};

    //Income statement
    const sales = companyData?.["Income Statement"]?.["Sales"] || {};
    const Expense = companyData?.["Income Statement"]?.["Expense"] || {};
    const operatingProfit = companyData?.["Income Statement"]?.["Operating Profit"] || {};
    const OPM = companyData?.["Income Statement"]?.["OPM %"] || {};
    const otherIncome = companyData?.["Income Statement"]?.["Other Income"] || {};
    const interest = companyData?.["Income Statement"]?.["Interest"] || {};
    const depreciation = companyData?.["Income Statement"]?.["Depreciation"] || {};
    const profitBeforeTax = companyData?.["Income Statement"]?.["Profit Before Tax"] || {};
    const tax = companyData?.["Income Statement"]?.["Tax %"] || {};
    const netProfit = companyData?.["Income Statement"]?.["Net Profit"] || {};

    const {
      "Company Name": companyName,
      "Sector": sector,
      "Current Price": currentPrice,
      "52-Week High": weekHigh,
      "52-Week Low": weekLow,
      "Market Cap": marketCap,
      "PE Ratio": pERatio,
      "Book Value": bookValue,
      "Dividend Yield": dividendYield,
      "ROCE": rOCE,
      "Face Value": faceValue,
      "About": about
    } = companyInfo;

    const equityCapitalData = Object.fromEntries(
        Object.entries(equityCapital).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const reservesData = Object.fromEntries(
        Object.entries(reserves).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const borrowingData = Object.fromEntries(
        Object.entries(borrowings).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const OliabilitiesData = Object.fromEntries(
        Object.entries(Oliabilities).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const TliabilitiesData = Object.fromEntries(
        Object.entries(Tliabilities).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const fixedAssetsData = Object.fromEntries(
        Object.entries(fixedAssets).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const cwipData = Object.fromEntries(
        Object.entries(cwip).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const investmentsData = Object.fromEntries(
        Object.entries(investments).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const otherAssetsData = Object.fromEntries(
        Object.entries(otherAssets).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const totalAssetsData = Object.fromEntries(
        Object.entries(totalAssets).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const operatingCFData = Object.fromEntries(
        Object.entries(operatingCF).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const investingCFData = Object.fromEntries(
        Object.entries(investingCF).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const finaningCFData = Object.fromEntries(
        Object.entries(finaningCF).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const netCFData = Object.fromEntries(
        Object.entries(netCF).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const salesData = Object.fromEntries(
        Object.entries(sales).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const ExpenseData = Object.fromEntries(
        Object.entries(Expense).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const operatingProfitData = Object.fromEntries(
        Object.entries(operatingProfit).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const OPMData = Object.fromEntries(
        Object.entries(OPM).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const otherIncomeData = Object.fromEntries(
        Object.entries(otherIncome).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const interestData = Object.fromEntries(
        Object.entries(interest).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const depreciationData = Object.fromEntries(
        Object.entries(depreciation).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const profitBeforeTaxData = Object.fromEntries(
        Object.entries(profitBeforeTax).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const taxData = Object.fromEntries(
        Object.entries(tax).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );

      const netProfitData = Object.fromEntries(
        Object.entries(netProfit).map(([key, value]) => [
          `ec${key.substring(0, 4)}`,
          value,
        ])
      );salesData

      const previewText = about ? about.slice(0, 400) : "";

    return (

    <div className="bg-[#09090b] pb-8 h-full w-screen">
        <Navbar/>
        {loading ?(
          <div className="flex justify-center items-center bg-[#09090b] h-screen">
            <div className="text-center text-white text-3xl">Loading company data...</div>
            </div>
        ) : 
       ( <div className="m-10">
            <div className="border bg-[#121214] border-gray-800 rounded-2xl p-4 mx-auto w-full">

                <div className="flex mx-5">
                    <h1 className="text-4xl mr-5 text-white font-semibold">{companyName}</h1>
                    <span className="text-xl text-white font-bold">₹ {currentPrice}</span>
                </div>

                <div className="mt-5 border border-gray-400 mx-5 px-5 py-2 rounded-lg">
                    <div className=" grid grid-cols-3 gap-2">
                        <div className="flex p-4 rounded-md">
                            <p className="text-gray-400">Market Cap</p>
                            <p className="font-semibold text-white ml-auto">₹ {marketCap} Cr.</p>
                        </div>
                        <div className="flex p-4 rounded-md">
                            <p className="text-gray-400">Current Price</p>
                            <p className="font-semibold text-white ml-auto">₹ {currentPrice}</p>
                        </div>            
                        <div className="flex p-4 rounded-md">
                            <p className="text-gray-400">High / Low</p>
                            <p className="font-semibold text-white ml-auto">₹ {weekHigh} / {weekLow}</p>
                        </div>            
                        <div className="flex p-4 rounded-md bg-[#09090b]">
                            <p className="text-gray-300">Stock P/E</p>
                            <p className="font-semibold text-white ml-auto">{pERatio} %</p>
                        </div>            
                        <div className="flex p-4 rounded-md bg-[#09090b]">
                            <p className="text-gray-300">Book Value</p>
                            <p className="font-semibold text-white ml-auto">₹ {bookValue}</p>
                        </div>            
                        <div className="flex p-4 rounded-md bg-[#09090b]">
                            <p className="text-gray-300">Dividend Yeild</p>
                            <p className="font-semibold text-white ml-auto">{dividendYield} %</p>
                        </div>            
                        <div className="flex p-4 rounded-md ">
                            <p className="text-gray-400">ROCE</p>
                            <p className="font-semibold text-white ml-auto">{rOCE}</p>
                        </div>            
                        <div className="flex p-4 rounded-md">
                            <p className="text-gray-400">Face Value</p>
                            <p className="font-semibold text-white ml-auto">₹ {faceValue}</p>
                        </div>  
                        <div className="flex p-4 rounded-md">
                            <p className="text-gray-400">Sector</p>
                            <p className="font-semibold text-white ml-auto">{sector}</p>
                        </div>           
                    </div>
                </div>

                <div className="p-2 mt-4 mx-3"> 
                    <h3 className="text-lg text-white font-semibold">About</h3>
                    <p className="text-gray-400 text-sm">
                        {isExpanded ? about : previewText}...
                            {about && about.length > 400 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-500 font-medium mt-2"
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        )}
                    </p>
                </div>
            </div>

            <div className="border bg-[#121214] border-gray-800 rounded-2xl p-8 mx-auto mt-10">

                <h2 className="text-4xl text-white mb-4">Balance Sheet</h2>
        
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-gray-700">
                    <thead className="bg-[#121214]">
                        <tr>
                        {['', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024'].map((head) => (
                            <th key={head} className="px-4 py-2 font-medium text-gray-300">{head}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                        ['Equity Capital', equityCapitalData.ec2021, equityCapitalData.ec2022, equityCapitalData.ec2023, equityCapitalData.ec2024],
                        ['Reserves', reservesData.ec2021, reservesData.ec2022, reservesData.ec2023, reservesData.ec2024],
                        ['Force Motors', '7515.00', '19.56', '9902.54', '0.26'],
                        ['Other Liabilities', OliabilitiesData.ec2021, OliabilitiesData.ec2022, OliabilitiesData.ec2023, OliabilitiesData.ec2024],
                        ['Total Liabilities', TliabilitiesData.ec2021, TliabilitiesData.ec2022, TliabilitiesData.ec2023, TliabilitiesData.ec2024],
                        ['Fixed Assets', fixedAssetsData.ec2021, fixedAssetsData.ec2022, fixedAssetsData.ec2023, fixedAssetsData.ec2024],
                        ['CWIP', cwipData.ec2021, cwipData.ec2022, cwipData.ec2023, cwipData.ec2024],
                        ['Investments', investmentsData.ec2021, investmentsData.ec2022, investmentsData.ec2023, investmentsData.ec2024],
                        ['Other Assets', otherAssetsData.ec2021, otherAssetsData.ec2022, otherAssetsData.ec2023, otherAssetsData.ec2024],
                        ['Total Assets', totalAssetsData.ec2021, totalAssetsData.ec2022, totalAssetsData.ec2023, totalAssetsData.ec2024],                        
                        ].map((row, index) => (
                            <tr key={index} className={index%2 === 0 ?`bg-[#09090b]`:null}>
                              {row.map((cell, i) => (
                                <td key={i} className={`px-4 py-2 ${i === 0 ? 'text-gray-300 font-medium' : 'text-gray-400'}`} >{cell}</td>
                              ))}
                            </tr>
                          ))}
                    </tbody>
                    </table>
                </div>
            </div>

            <div className="border bg-[#121214] border-gray-800 rounded-2xl p-8 mx-auto mt-10">

                <h2 className="text-4xl text-white mb-4">Cash Flow</h2>
        
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-gray-700">
                    <thead className="bg-[#121214]">
                        <tr>
                        {['', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024'].map((head) => (
                            <th key={head} className="px-4 py-2 font-medium text-gray-300">{head}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                        ['Cash from Operating Activity', operatingCFData.ec2021, operatingCFData.ec2022, operatingCFData.ec2023, operatingCFData.ec2024],
                        ['Cash from Investing Activity', investingCFData.ec2021, investingCFData.ec2022, investingCFData.ec2023, investingCFData.ec2024],
                        ['Cash from Financing Activity', finaningCFData.ec2021, finaningCFData.ec2022, finaningCFData.ec2023, finaningCFData.ec2024],
                        ['Net Cash Flow', netCFData.ec2021, netCFData.ec2022, netCFData.ec2023, netCFData.ec2024],
                        ].map((row, index) => (
                            <tr key={index} className={index%2 === 0 ?`bg-[#09090b]`:null}>
                              {row.map((cell, i) => (
                                <td key={i} className={`px-4 py-2 ${i === 0 ? 'text-gray-300 font-medium' : 'text-gray-400'}`} >{cell}</td>
                              ))}
                            </tr>
                          ))}
                    </tbody>
                    </table>

                </div>
            </div>

            <div className="border bg-[#121214] border-gray-800 rounded-2xl p-8 mx-auto mt-10">

                <h2 className="text-4xl text-white mb-4">Cash Flow</h2>
        
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-gray-700">
                    <thead className="bg-[#121214]">
                        <tr>
                        {['', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024'].map((head) => (
                            <th key={head} className="px-4 py-2 font-medium text-gray-300">{head}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                        ['Sales', salesData.ec2021, salesData.ec2022, salesData.ec2023, salesData.ec2024],
                        ['Expense', ExpenseData.ec2021, ExpenseData.ec2022, ExpenseData.ec2023, ExpenseData.ec2024],
                        ['Operating Profit', operatingProfitData.ec2021, operatingProfitData.ec2022, operatingProfitData.ec2023, operatingProfitData.ec2024],
                        ['OPM %', OPMData.ec2021, OPMData.ec2022, OPMData.ec2023, OPMData.ec2024],
                        ['Other Income', otherIncomeData.ec2021, otherIncomeData.ec2022, otherIncomeData.ec2023, otherIncomeData.ec2024],
                        ['Interest', interestData.ec2021, interestData.ec2022, interestData.ec2023, interestData.ec2024],
                        ['Depreciation', depreciationData.ec2021, depreciationData.ec2022, depreciationData.ec2023, depreciationData.ec2024],
                        ['Profit Before Tax', profitBeforeTaxData.ec2021, profitBeforeTaxData.ec2022, profitBeforeTaxData.ec2023, profitBeforeTaxData.ec2024],
                        ['Tax %', taxData.ec2021, taxData.ec2022, taxData.ec2023, taxData.ec2024],
                        ['Net Profit', netProfitData.ec2021, netProfitData.ec2022, netProfitData.ec2023, netProfitData.ec2024]
                        ].map((row, index) => (
                            <tr key={index} className={index%2 === 0 ?`bg-[#09090b]`:null}>
                              {row.map((cell, i) => (
                                <td key={i} className={`px-4 py-2 ${i === 0 ? 'text-gray-300 font-medium' : 'text-gray-400'}`} >{cell}</td>
                              ))}
                            </tr>
                          ))}
                    </tbody>
                    </table>
                </div>
            </div>

        </div>      )}  
    </div>

      );
}

