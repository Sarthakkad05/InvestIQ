from fastapi import APIRouter, HTTPException
from google.cloud import bigquery
from google.genai import Client
from google.genai.types import Content, Part, GenerateContentConfig, SafetySetting
from datetime import datetime
from pydantic import BaseModel

bot_router = APIRouter()

client = bigquery.Client(project="")

PROJECT_ID = ""
BQ_DATASET = ""
BQ_TABLE = ""
MODEL_NAME = "gemini-2.0-flash-001"
LOCATION = "us-central1"

def get_latest_user_activity(user_id: str):
    query = f"""
    SELECT stock1, stock2, timestamp, stock_symbol, stock1_sector,
    stock2_sector, stock1_pe_ratio, stock2_pe_ratio, stock1_market_cap,
    stock2_market_cap
    FROM ``
    WHERE user_id = '{user_id}'
    AND stock1 IS NOT NULL
    AND stock2 IS NOT NULL
    ORDER BY timestamp DESC
    LIMIT 1;
    """
    results = client.query(query).to_dataframe()
    return results.to_dict(orient="records")[0] if not results.empty else {}

def store_chat_history(user_id, message, response_text):
    """Store chat history in BigQuery."""
    table_id = f"{PROJECT_ID}.{BQ_DATASET}.{BQ_TABLE}"
    rows_to_insert = [{
        "user_id": user_id,
        "timestamp": datetime.utcnow().isoformat(),
        "message": message,
        "reply": response_text
    }]
    client.insert_rows_json(table_id, rows_to_insert)

class ChatRequest(BaseModel):
    user_id: str
    message: str

@bot_router.post("/chat")
def generate(request: ChatRequest):
    vertex_client = Client(
        vertexai=True,
        project=PROJECT_ID,
        location=LOCATION,
    )

    user_activity = get_latest_user_activity(request.user_id)

    message = request.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    activity_context = ""
    if user_activity:
        stock_symbol = user_activity.get("stock_symbol", "")
        stock1 = user_activity.get("stock1", "")
        stock2 = user_activity.get("stock2", "")
        stock1_pe = user_activity.get("stock1_pe_ratio", None)
        stock2_pe = user_activity.get("stock2_pe_ratio", None)

        if "compared" in message.lower() and stock1 and stock2:
            activity_context = (
                f"You last compared {stock1} and {stock2}. "
                f"The PE ratio for {stock1} is {stock1_pe}, and for {stock2}, it is {stock2_pe}."
            )
        elif stock1 and "PE ratio" in message:
            activity_context = f" The PE ratio of {stock1} is {stock1_pe}."
        else:
            activity_context = f"You recently searched for {stock_symbol}."
    else:
        activity_context = "You have not compared any stocks recently."

    system_instruction = """You are a financial assistant designed to educate users about investing, stock market trends, and financial literacy.

    Your Role:
    - Answer finance-related questions clearly and simply.
    - Provide data-driven insights without giving financial advice.
    - Personalize responses based on user activity history from BigQuery.
    - Use get_latest_user_activity(user_id) to fetch recent stock searches and comparisons.

    Response Guidelines:
    - Keep answers concise yet detailed.
    - Use examples, comparisons, and real-world analogies to simplify concepts.
    - Provide tables, bullet points, or step-by-step explanations for clarity.
    - Make responses engaging and user-friendly.
    - Extract relevant details such as searched stock symbols, comparison history, and any saved filters.

    Personalization Rules:
    - If user history is available (from BigQuery) → Reference past interactions to make responses more relevant.
    - If no history is found → Answer normally, but encourage users to explore more features.
    - Adjust responses based on user experience level (Beginner, Intermediate, Advanced).

    Restricted Topics:
    - No financial, tax, or investment advice.
    - No stock price predictions or direct investment recommendations.

    important:
    - NEVER return responses in `tool_code` format.
    - NEVER assume function execution; only respond in human-readable text.
    - If user asks about their past comparisons, retrieve stock data and reply in natural language.
    - If no history is found, simply say: "You have not compared any stocks recently."


    Example Use Cases:
    - “What is a P/E ratio?” → Explain in simple terms + example(example stock should be stock_symbol which you get from user_activity variable).
    - “How to analyze a stock?” → Provide a structured method (e.g., Fundamental vs. Technical Analysis).
    - “Which stocks did I compare last?” → Fetch past comparisons and respond in plain text.
    - If the user searches for a stock they previously viewed, provide insights like:
    "You recently searched for [Stock A]. Here's an updated price and key fundamentals."
    - If the user compared stocks, offer a follow-up:
    "Last time, you compared [Stock A] and [Stock B]. Would you like an updated analysis?"
    - Suggest related stocks or alternative investments based on their past searches.
    Notify users of price changes, earnings reports, or breaking news about stocks they frequently check.

Offer personalized screeners based on past filter preferences.

User Experience Enhancement:

If a user consistently searches for high-dividend stocks, highlight new opportunities in that category.

If they compare tech stocks often, suggest a tech sector analysis.
    """

    model = MODEL_NAME
    contents = [
        Content(
            role="user",
            parts=[Part.from_text(text=f"{request.message}{activity_context}")]
        )
    ]

    generate_content_config = GenerateContentConfig(
        temperature=0.7,
        top_p=0.95,
        max_output_tokens=8192,
        response_modalities=["TEXT"],
        safety_settings=[
            SafetySetting(category="HARM_CATEGORY_HATE_SPEECH", threshold="OFF"),
            SafetySetting(category="HARM_CATEGORY_DANGEROUS_CONTENT", threshold="OFF"),
            SafetySetting(category="HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold="OFF"),
            SafetySetting(category="HARM_CATEGORY_HARASSMENT", threshold="OFF")
        ],
        system_instruction=[Part.from_text(text=system_instruction)]
    )

    response_text = ""
    for chunk in vertex_client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        response_text += chunk.text

    store_chat_history(request.user_id, message, response_text)
    return {"reply": response_text}