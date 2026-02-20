def calculate_engagement(platforms):

    total_score = 0

    for platform in platforms:
        views = platform["views"] or 0
        likes = platform["likes"] or 0
        comments = platform["comments_count"] or 0

        engagement = (likes * 2 + comments * 3) / (views + 1)
        total_score += engagement

    return round(total_score, 4)