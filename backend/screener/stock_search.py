from fastapi import APIRouter, HTTPException, Header
import yfinance as yf
import pandas as pd
from google.cloud import bigquery
from datetime import datetime
from typing import Optional
from backend.utils.helpers import fetch_stock_details, fetch_balance_sheet, fetch_cash_flow, fetch_income_statements

stock_search_router = APIRouter()

BIG_QUERY_ID = ''
BIG_QUERY_DATASET = ''
BIG_QUERY_TABLE = ''

client = bigquery.Client(project="")


def log_stock_search(user_id: str, stock_symbol: str, viewed_sections: list):
    table_id = f"{BIG_QUERY_ID}.{BIG_QUERY_DATASET}.{BIG_QUERY_TABLE}"
    row = [{
        "user_id": user_id,
        "stock_symbol": stock_symbol,
        "timestamp": datetime.utcnow().isoformat()
    }]
    
    print(f"Attempting to insert: {row}")
    
    try:
        errors = client.insert_rows_json(table_id, row)
        if errors:
            print(f"BigQuery Insertion Error: {errors}")
        else:
            print("Stock search history stored successfully!")
    except Exception as e:
        print(f"BigQuery Exception: {e}")


@stock_search_router.get("/stock/{symbol}")
def fetch_data(symbol: str, user_id: Optional[str] = Header(None, convert_underscores=False)):
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID is required")
    
    stock = yf.Ticker(symbol + ".NS")
    viewed_sections = ["Company Info", "Balance Sheet", "Cash Flow", "Income Statement", "Quarterly Results"]
    
    log_stock_search(user_id, symbol, viewed_sections)
    
    return {
        "Company Info": fetch_stock_details(stock),
        "Balance Sheet": fetch_balance_sheet(stock),
        "Cash Flow": fetch_cash_flow(stock),
        "Income Statement": fetch_income_statements(stock)
    }