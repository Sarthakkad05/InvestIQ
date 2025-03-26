import pickle
from sklearn.linear_model import LogisticRegression
from preprocess import load_and_preprocess_data
import joblib

X_train, X_test, Y_train, Y_test, vectorizer = load_and_preprocess_data()

model = LogisticRegression()
model.fit(X_train, Y_train)

with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

joblib.dump(model, "model.pkl")
print("Model saved successfully in model.pkl")