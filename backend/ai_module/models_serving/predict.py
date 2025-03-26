import os
import sys
import joblib

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.append(BASE_DIR) 


MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "vectorizer.pkl")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f" Model file not found at: {MODEL_PATH}")

if not os.path.exists(VECTORIZER_PATH):
    raise FileNotFoundError(f" Vectorizer file not found at: {VECTORIZER_PATH}")


print(f" Loading model from: {MODEL_PATH}")
model = joblib.load(MODEL_PATH)

print(f" Loading vectorizer from: {VECTORIZER_PATH}")
vectorizer = joblib.load(VECTORIZER_PATH)


def predict_response(user_query):
    """Preprocess user input and predict chatbot response"""
    transformed_query = vectorizer.transform([user_query])
    predicted_response = model.predict(transformed_query)[0]
    return predicted_response


if __name__ == "__main__":
    user_query = "What is ROCE?"
    response = predict_response(user_query)
    print(f" Predicted Response: {response}")