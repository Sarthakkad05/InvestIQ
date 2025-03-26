from  fastapi import APIRouter, HTTPException
import yfinance as yf
from pydantic import BaseModel
import requests
from google.cloud import bigquery
from datetime import datetime
from backend.utils.helpers import fetch_stock_details, fetch_balance_sheet, fetch_cash_flow, fetch_income_statements

comparison_router = APIRouter()

BIG_QUERY_ID = ''
BIG_QUERY_DATASET = ''
BIG_QUERY_TABLE = ''

client = bigquery.Client(project="")

def log_compared_stocks(user_id: str, stock1: str, stock2: str, stock1_details: dict, stock2_details: dict):
    table_id = f"{BIG_QUERY_ID}.{BIG_QUERY_DATASET}.{BIG_QUERY_TABLE}"
    row = [{
            "user_id": user_id,
            "stock1": stock1,
            "stock2": stock2,
            "stock1_sector": stock1_details.get("Sector", "N/A"),
            "stock2_sector": stock2_details.get("Sector", "N/A"),
            "stock1_pe_ratio": stock1_details.get("PE Ratio", "N/A"),
            "stock2_pe_ratio": stock2_details.get("PE Ratio", "N/A"),
            "stock1_market_cap": stock1_details.get("Market Cap", "N/A"),
            "stock2_market_cap": stock2_details.get("Market Cap", "N/A"),
            "timestamp": datetime.utcnow().isoformat(),
        }]

    errors = client.insert_rows_json(table_id, row)
    if errors:
        raise HTTPException(status_code=500, detail=f"Error logging data to BigQuery: {errors}")

class ComparisonRequest(BaseModel):
    user_id: str
    stock1: str
    stock2: str

@comparison_router.post("/compare_stocks")
def compare_stocks(request: ComparisonRequest):
    try: 

        stock1 = request.stock1
        stock2 = request.stock2
        user_id = request.user_id

        s1 = yf.Ticker(stock1 + ".NS")
        s2 = yf.Ticker(stock2 + ".NS")

        stock1_details = fetch_stock_details(s1)
        stock1_balance_sheet = fetch_balance_sheet(s1)
        stock1_cash_flow = fetch_cash_flow(s1)
        stock1_income = fetch_income_statements(s1)

        stock2_details = fetch_stock_details(s2)
        stock2_balance_sheet = fetch_balance_sheet(s2)
        stock2_cash_flow = fetch_cash_flow(s2)
        stock2_income = fetch_income_statements(s2)

        comparison_data = {
            "General Information": {
                "Company Name": {stock1: stock1_details["Company Name"], stock2: stock2_details["Company Name"]},
                "Sector": {stock1: stock1_details["Sector"], stock2: stock2_details["Sector"]},
                "Current Price": {stock1: stock1_details["Current Price"], stock2: stock2_details["Current Price"]},
                "Market Cap": {stock1: stock1_details["Market Cap"], stock2: stock2_details["Market Cap"]},
                "PE Ratio": {stock1: stock1_details["PE Ratio"], stock2: stock2_details["PE Ratio"]},
                "ROCE": {stock1: stock1_details["ROCE"], stock2: stock2_details["ROCE"]},
            },
            "Financial Performance": {
                "Revenue": {stock1: stock1_income["Sales"], stock2: stock2_income["Sales"]},
                "Net Profit": {stock1: stock1_income["Net Profit"], stock2: stock2_income["Net Profit"]},
                "Operating Profit Margin (OPM%)": {stock1: stock1_income["OPM %"], stock2: stock2_income["OPM %"]},
            },
            "Balance Sheet Strength": {
                "Equity Capital": {stock1: stock1_balance_sheet["Equity Capital"], stock2: stock2_balance_sheet["Equity Capital"]},
                "Total Borrowings": {stock1: stock1_balance_sheet["Total Liabilities"], stock2: stock2_balance_sheet["Total Liabilities"]},
                "Total Assets": {stock1: stock1_balance_sheet["Total Assets"], stock2: stock2_balance_sheet["Total Assets"]},
            },
            "Growth Metrics": {
                "YoY Profit Growth %": {stock1: stock1_income["Net Profit"], stock2: stock2_income["Net Profit"]},
            },
            "Valuation & Dividends": {
                "Dividend Yield": {stock1: stock1_details["Dividend Yield"], stock2: stock2_details["Dividend Yield"]},
                "Book Value": {stock1: stock1_details["Book Value"], stock2: stock2_details["Book Value"]},
            },
        }

        log_compared_stocks(user_id, stock1, stock2, stock1_details, stock2_details)
        return comparison_data
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error comparing stocks: {str(e)}")