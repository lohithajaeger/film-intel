def normalize_scraped_data(movie_name, tmdb_data, youtube_data, instagram_data):

    normalized = {
        "movie": movie_name,
        "tmdb": {
            "rating": tmdb_data.get("tmdb_rating"),
            "vote_count": tmdb_data.get("vote_count"),
            "popularity": tmdb_data.get("popularity_score")
        },
        "platforms": []
    }

    # YouTube normalization
    for video in youtube_data:
        normalized["platforms"].append({
            "platform": "YouTube",
            "views": video.get("views"),
            "likes": video.get("likes"),
            "comments_count": video.get("total_comments"),
            "comments": [c["comment"] for c in video.get("influential_comments", [])]
        })

    # Instagram normalization
    if instagram_data:
        normalized["platforms"].append({
            "platform": "Instagram",
            "views": instagram_data.get("video_view_count"),
            "likes": instagram_data.get("likes"),
            "comments_count": instagram_data.get("comments_count"),
            "comments": []  # if you fetch later
        })

    return normalized