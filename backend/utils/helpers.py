import yfinance as yf
from typing import Optional
import pandas as pd

def safe_get(df, key, default=0):
    try:
        return df.loc[key].astype(float)
    except KeyError:
        return pd.Series(default)

def convert_to_crore(value):
    return round(value / 1e7, 2) if isinstance(value, (int, float)) else value

def fetch_balance_sheet(stock):
    try:
        pd.set_option('future.no_silent_downcasting', True)
        balance_sheet = stock.balance_sheet.fillna(0).infer_objects(copy=False)
        balance_sheet = balance_sheet.apply(pd.to_numeric, errors='coerce')
        return {
            "Equity Capital": safe_get(balance_sheet, "Common Stock").map(convert_to_crore).to_dict(),
            "Reserves": safe_get(balance_sheet, "Retained Earnings").map(convert_to_crore).to_dict(),
            "Borrowings": {
                "Long Term": safe_get(balance_sheet, "Long Term Debt").map(convert_to_crore).to_dict(),
                "Short Term": safe_get(balance_sheet, "Current Debt").map(convert_to_crore).to_dict()
            },
            "Other Liabilities": safe_get(balance_sheet, "Other Non Current Liabilities").map(convert_to_crore).to_dict(),
            "Total Liabilities": safe_get(balance_sheet, "Total Debt").map(convert_to_crore).to_dict(),
            "Fixed Assets": safe_get(balance_sheet, "Land And Improvements").map(convert_to_crore).to_dict(),
            "CWIP": safe_get(balance_sheet, "Construction In Progress").map(convert_to_crore).to_dict(),
            "Investments": safe_get(balance_sheet, "Investmentin Financial Assets").map(convert_to_crore).to_dict(),
            "Other Assets": safe_get(balance_sheet, "Other Current Assets").map(convert_to_crore).to_dict(),
            "Total Assets": safe_get(balance_sheet, "Total Assets").map(convert_to_crore).to_dict()
        }
    except Exception as e:
        return {"error": f"Error fetching balance sheet: {str(e)}"}

def fetch_cash_flow(stock):
    try:
        cash_flow = stock.cashflow.fillna(0).astype(float)
        return {
            "Cash from Operating Activity": safe_get(cash_flow, "Operating Cash Flow").map(convert_to_crore).to_dict(),
            "Cash from Investing Activity": safe_get(cash_flow, "Investing Cash Flow").map(convert_to_crore).to_dict(),
            "Cash from Financing Activity": safe_get(cash_flow, "Financing Cash Flow").map(convert_to_crore).to_dict(),
            "Net Cash Flow": (safe_get(cash_flow, "Operating Cash Flow") + 
                              safe_get(cash_flow, "Investing Cash Flow") + 
                              safe_get(cash_flow, "Financing Cash Flow")).map(convert_to_crore).to_dict()
        }
    except Exception as e:
        return {"error": f"Error fetching cash flow: {str(e)}"}

def fetch_income_statements(stock):
    try:
        income_statements = stock.financials.fillna(0).astype(float)
        return {
            "Sales": safe_get(income_statements, "Total Revenue").map(convert_to_crore).to_dict(),
            "Expense": safe_get(income_statements, "Cost Of Revenue").map(convert_to_crore).to_dict(),
            "Operating Profit": safe_get(income_statements, "Operating Income").map(convert_to_crore).to_dict(),
            "OPM %": ((safe_get(income_statements, "Operating Income") / 
                      safe_get(income_statements, "Total Revenue").replace(0, 1)) * 100).round(2).to_dict(),
            "Other Income": safe_get(income_statements, "Other Non Operating Income Expenses").map(convert_to_crore).to_dict(),
            "Interest": safe_get(income_statements, "Interest Expense").map(convert_to_crore).to_dict(),
            "Depreciation": safe_get(income_statements, "Reconciled Depreciation", safe_get(income_statements, "Depreciation")).map(convert_to_crore).to_dict(),
            "Profit Before Tax": safe_get(income_statements, "Pretax Income").map(convert_to_crore).to_dict(),
            "Tax %": ((safe_get(income_statements, "Tax Provision") / 
                      safe_get(income_statements, "Pretax Income").replace(0, 1)) * 100).round(2).to_dict(),
            "Net Profit": safe_get(income_statements, "Net Income").map(convert_to_crore).to_dict()
        }
    except Exception as e:
        return {"error": f"Error fetching income statements: {str(e)}"}

def fetch_stock_details(stock):
    try:
        info = stock.info
        return {
            "Company Name": info.get("longName", "N/A"),
            "Sector": info.get("sector", "N/A"),
            "Current Price": round(info.get("currentPrice", 0), 2),
            "52-Week High": round(info.get("fiftyTwoWeekHigh", 0), 2),
            "52-Week Low": round(info.get("fiftyTwoWeekLow", 0), 2),
            "Market Cap": convert_to_crore(info.get("marketCap", 0)),
            "PE Ratio": round(info.get("trailingPE", 0), 2),
            "Book Value": round(info.get("bookValue", 0), 2),
            "Dividend Yield": round(info.get("dividendYield", 0), 2),
            "ROCE": round(info.get("returnOnEquity", 0) * 100, 2),
            "Face Value": round(info.get("faceValue", 0), 2),
            "About": info.get("longBusinessSummary", "N/A"),
            "Website": info.get("website", "N/A")
        }
    except Exception as e:
        return {"error": f"Error fetching stock details: {str(e)}"}