import { useStockData } from "./StockContext";

const StockInfo = () => {
    const { stockData } = useStockData();
    const stockKeys = stockData ? Object.keys(stockData["General Information"]["Company Name"]) : [];
    const stock1 = stockKeys[0];
    const stock2 = stockKeys[1];

    return (
        <div className="p-6 bg-[#09090b] flex justify-center items-center ">
            {stockData && stock1 && stock2 ? (
                <div className="flex gap-10">
                    <StockCard stock={stockData} stockKey={stock1} />
                    <StockCard stock={stockData} stockKey={stock2} />
                </div>
            ) : (
                <p className="text-white">Loading stock data...</p>
            )}
        </div>
    );
};

export default StockInfo;

const StockCard = ({ stock, stockKey }) => {
    const sector = stock["General Information"]["Sector"][stockKey];
    const sectorColors = {
        Energy: "bg-blue-600",
        Technology: "bg-green-600",
        Finance: "bg-yellow-600",
        Healthcare: "bg-red-600",
    };

    return (
        <div className="bg-[#09090b] border border-gray-600 p-6 pb-12 rounded-lg shadow-md text-white w-[40rem]">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{stock["General Information"]["Company Name"][stockKey]}</h1>
                <span className={`text-xs text-white px-3 py-2 rounded-full ${sectorColors[sector] || "bg-gray-600"}`}>
                    {sector}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <BoxInfo name="Current Price" value={`₹${stock["General Information"]["Current Price"][stockKey]}`} />
                <BoxInfo name="Market Cap" value={`₹${stock["General Information"]["Market Cap"][stockKey]}`} />
                <BoxInfo name="P/E Ratio" value={stock["General Information"]["PE Ratio"][stockKey]} />
                <BoxInfo name="ROCE" value={stock["General Information"]["ROCE"][stockKey]} />
            </div>
        </div>
    );
};

const BoxInfo = ({ name, value }) => {
    return (
        <div className="bg-[#121214] p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-400">{name}</p>
            <h1 className="text-2xl font-semibold text-white">{value}</h1>
        </div>
    );
};
