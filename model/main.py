import pandas as pd
import re
import pickle
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Step 1 — Load data
fake = pd.read_csv("data/Fake.csv")
real = pd.read_csv("data/True.csv")
fake["label"] = 0
real["label"] = 1
df = pd.concat([fake, real], ignore_index=True)
print("Data loaded:", df.shape)

# Step 2 — Clean text
def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

df["clean_text"] = df["text"].apply(clean_text)
print("Text cleaned!")

# Step 3 — Train model
X_train, X_test, y_train, y_test = train_test_split(
    df["clean_text"], df["label"], test_size=0.2, random_state=42
)
vectorizer = TfidfVectorizer(max_features=10000, stop_words="english")
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf  = vectorizer.transform(X_test)
model = LogisticRegression(max_iter=1000)
model.fit(X_train_tfidf, y_train)
predictions = model.predict(X_test_tfidf)
print("Accuracy:", accuracy_score(y_test, predictions))
print(classification_report(y_test, predictions))

# Step 4 — Save model
with open("model/model.pkl", "wb") as f:
    pickle.dump(model, f)
with open("model/vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)
print("Model saved!")