from textblob import TextBlob

def analyze_sentiment(platforms):

    positive = 0
    negative = 0
    neutral = 0

    for platform in platforms:
        for comment in platform["comments"]:
            polarity = TextBlob(comment).sentiment.polarity

            if polarity > 0.1:
                positive += 1
            elif polarity < -0.1:
                negative += 1
            else:
                neutral += 1

    total = positive + negative + neutral

    if total == 0:
        return {"positive": 0, "negative": 0, "neutral": 0}

    return {
        "positive_percent": round((positive / total) * 100, 2),
        "negative_percent": round((negative / total) * 100, 2),
        "neutral_percent": round((neutral / total) * 100, 2)
    }