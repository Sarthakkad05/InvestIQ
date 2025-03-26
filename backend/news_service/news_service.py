from fastapi import APIRouter, HTTPException
import requests
import time
from datetime import datetime, timedelta

router = APIRouter()

NEWS_API_URL = "https://newsapi.org/v2/everything"
API_KEY = ""

@router.get("/finance-news")
def get_finance_news():
    last_week = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")
    
    params = {
        "q": "finance OR stock OR economy",
        "language": "en",  # Only fetch English news
        "sortBy": "publishedAt",
        "from": last_week,
        "pageSize": 50,
        "apiKey": API_KEY,
    }

    retries = 0
    while retries < 3:
        try:
            response = requests.get(NEWS_API_URL, params=params)
            response.raise_for_status()
            data = response.json()

            if "articles" not in data:
                raise HTTPException(status_code=404, detail="No articles found")

            seen_headlines = set()
            news_list = [
                {
                    "headline": article.get("title"),
                    "summary": article.get("description"),
                    "image": article.get("urlToImage"),
                    "source": article["source"]["name"],
                    "url": article.get("url")
                }
                for article in data["articles"]
                if all([article.get("title"), article.get("description"), article.get("urlToImage")])
                and article.get("title") not in seen_headlines
                and not seen_headlines.add(article.get("title"))
            ]

            # Limit to top 10 freshest articles
            final_news = news_list[:10]

            return {"news": final_news}

        except requests.exceptions.RequestException as e:
            retries += 1
            time.sleep(2 ** retries)
            if retries == 3:
                raise HTTPException(status_code=500, detail="Failed to fetch news data")
