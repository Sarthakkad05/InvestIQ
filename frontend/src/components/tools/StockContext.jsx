import { createContext, useContext, useState } from "react";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [stockData, setStockData] = useState(null);

    return (
        <StockContext.Provider value={{ stockData, setStockData }}>
            {children}
        </StockContext.Provider>
    );
};

export const useStockData = () => useContext(StockContext);
