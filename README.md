# Fake News Detector

An AI-powered web app that detects whether a news article is real or fake using Machine Learning and Natural Language Processing.

## Features
- Paste any news article and get an instant prediction
- Shows confidence score with each prediction
- REST API built with FastAPI
- React frontend with clean UI
- Fully containerized with Docker

## Tech Stack
- **ML Model:** Scikit-learn (TF-IDF + Logistic Regression)
- **Backend:** Python, FastAPI
- **Frontend:** React.js
- **Deployment:** Docker, Docker Compose
- **Dataset:** Fake and Real News Dataset (44,000+ articles)

## Model Performance
- Accuracy: 98.9%
- Precision: 0.99
- Recall: 0.99
- F1 Score: 0.99

## How to Run

### With Docker (recommended)
```bash
docker compose up --build
```
Then open http://localhost:3000

### Without Docker
**Backend:**
```bash
source .venv/bin/activate
uvicorn app:app --reload
```
**Frontend:**
```bash
cd frontend
npm start
```

## Project Structure
```
fake-news-detector/
├── app.py              # FastAPI backend
├── model/
│   ├── main.py         # ML training script
│   ├── model.pkl       # Trained model
│   └── vectorizer.pkl  # TF-IDF vectorizer
├── frontend/           # React app
├── Dockerfile          # Backend Docker config
└── docker-compose.yml  # Multi-container setup
```