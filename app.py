from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import re

# Load saved model and vectorizer
with open("model/model.pkl", "rb") as f:
    model = pickle.load(f)

with open("model/vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

app = FastAPI()

# Define what input looks like
class Article(BaseModel):
    text: str

# Clean text (same as Phase 1)
def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

# Prediction endpoint
@app.post("/predict")
def predict(article: Article):
    cleaned = clean_text(article.text)
    vectorized = vectorizer.transform([cleaned])
    prediction = model.predict(vectorized)[0]
    confidence = model.predict_proba(vectorized)[0].max()
    
    return {
        "label": "FAKE" if prediction == 0 else "REAL",
        "confidence": round(float(confidence), 2)
    }