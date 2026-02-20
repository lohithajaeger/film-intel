from fastapi import FastAPI
from textblob import TextBlob

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Analytics Service Running"}

@app.post("/sentiment")
def sentiment_analysis(text: str):
    analysis = TextBlob(text)
    return {
        "polarity": analysis.sentiment.polarity,
        "subjectivity": analysis.sentiment.subjectivity
    }