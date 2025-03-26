from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.authentication.routes import router
from backend.chatbot.bot import  bot_router
from backend.screener.stock_search import stock_search_router
from backend.stock_comparison.comparison import comparison_router
from backend.news_service.news_service import router as news_router

app = FastAPI()

app.include_router(router)
app.include_router(bot_router)
app.include_router(stock_search_router)
app.include_router(comparison_router)
app.include_router(news_router)

origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)
@app.get("/")
async def root():
    return {"message": "Welcome to the Finance Website API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
