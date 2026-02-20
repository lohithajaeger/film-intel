def calculate_visibility(tmdb, sentiment, engagement):

    rating = float(tmdb.get("rating") or 0)
    popularity = float(tmdb.get("popularity") or 0)

    positive = sentiment.get("positive_percent", 0)
    negative = sentiment.get("negative_percent", 0)

    visibility_score = (
        rating * 0.3 +
        popularity * 0.2 +
        engagement * 100 * 0.3 +
        positive * 0.2 -
        negative * 0.1
    )

    return round(visibility_score, 2)