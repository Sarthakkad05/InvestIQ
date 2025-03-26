import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useStockData } from "./StockContext";


const BalanceSheet = () => {

  const { stockData } = useStockData();
  const stockKeys = stockData ? Object.keys(stockData["General Information"]["Company Name"]) : [];
  const stock1 = stockKeys[0];
  const stock2 = stockKeys[1];

  const borrowing1 = stockData["Balance Sheet Strength"]["Total Borrowings"][stock1];
  const borrowing2 = stockData["Balance Sheet Strength"]["Total Borrowings"][stock2];
  const assets1 = stockData["Balance Sheet Strength"]["Total Assets"][stock1];
  const assets2 = stockData["Balance Sheet Strength"]["Total Assets"][stock2];

  const borrowing1Data = Object.fromEntries(
    Object.entries(borrowing1).map(([key, value]) => [
      `ec${key.substring(0, 4)}`,
      value,
    ])
  );
  const borrowing2Data = Object.fromEntries(
    Object.entries(borrowing2).map(([key, value]) => [
      `ec${key.substring(0, 4)}`,
      value,
    ])
  );
  const assets1Data = Object.fromEntries(
    Object.entries(assets1).map(([key, value]) => [
      `ec${key.substring(0, 4)}`,
      value,
    ])
  );
  const assets2Data = Object.fromEntries(
    Object.entries(assets2).map(([key, value]) => [
      `ec${key.substring(0, 4)}`,
      value,
    ])
  );

  const totalAssetsData = {
    labels: ["2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: stock1,
        data: [borrowing1Data.ec2021 ,borrowing1Data.ec2022 , borrowing1Data.ec2023,borrowing1Data.ec2024],
        backgroundColor: "#4A90E2",
      },
      {
        label: stock2,
        data: [borrowing2Data.ec2021, borrowing2Data.ec2022, borrowing2Data.ec2023, borrowing2Data.ec2024],
        backgroundColor: "#7ED321",
      },
    ],
  };

  const totalBorrowingsData = {
    labels: ["2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: stock1,
        data: [assets1Data.ec2021, assets1Data.ec2022, assets1Data.ec2023, assets1Data.ec2024],
        backgroundColor: "#4A90E2",
      },
      {
        label: stock2,
        data: [assets2Data.ec2021, assets2Data.ec2022, assets2Data.ec2023, assets2Data.ec2024],
        backgroundColor: "#7ED321",
      },
    ],
  };

  return (
    <div className="bg-[#09090b] text-white p-8">

      <div className="grid grid-cols-2 gap-8 ">
        <div className="border border-gray-600 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-2">Total Assets (₹ Crore)</h2>
          <Bar data={totalAssetsData} />
        </div>
        <div className="border border-gray-600 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-2">Total Borrowings (₹ Crore)</h2>
          <Bar data={totalBorrowingsData} />
        </div>
      </div>

    </div>
  );
};

export default BalanceSheet;
