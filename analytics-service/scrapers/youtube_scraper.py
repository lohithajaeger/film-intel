
# import os
# from dotenv import load_dotenv
# from googleapiclient.discovery import build

# load_dotenv()

# API_KEY = os.getenv("YOUTUBE_API_KEY")
# youtube = build("youtube", "v3", developerKey=API_KEY)


# def get_top_influential_comments(video_id, max_total=100):
#     comments = []
#     next_page_token = None

#     while len(comments) < max_total:
#         request = youtube.commentThreads().list(
#             part="snippet",
#             videoId=video_id,
#             maxResults=100,
#             order="relevance",   # 🔥 IMPORTANT
#             pageToken=next_page_token,
#             textFormat="plainText"
#         )

#         response = request.execute()

#         for item in response.get("items", []):
#             comment = item["snippet"]["topLevelComment"]["snippet"]

#             comments.append({
#                 "author": comment["authorDisplayName"],
#                 "comment": comment["textDisplay"],
#                 "likes": comment["likeCount"],
#                 "published_at": comment["publishedAt"]
#             })

#             if len(comments) >= max_total:
#                 break

#         next_page_token = response.get("nextPageToken")
#         if not next_page_token:
#             break

#     return comments

# def search_trailer(movie_name):
#     request = youtube.search().list(
#         part="snippet",
#         q=f"{movie_name} trailer",
#         type="video",
#         maxResults=3  # keep small to save quota
#     )

#     response = request.execute()

#     videos = []

#     for item in response["items"]:
#         video_id = item["id"]["videoId"]

#         video_request = youtube.videos().list(
#             part="statistics,snippet",
#             id=video_id
#         )

#         video_response = video_request.execute()
#         stats = video_response["items"][0]

#         views = int(stats["statistics"].get("viewCount", 0))
#         likes = int(stats["statistics"].get("likeCount", 0))
#         comments_count = int(stats["statistics"].get("commentCount", 0))

#         engagement_score = (likes * 2 + comments_count * 3) / (views + 1)

#         # 🔥 Fetch 10 comments
#         comments = get_top_influential_comments(video_id, max_total=100)

#         videos.append({
#             "title": stats["snippet"]["title"],
#             "channel": stats["snippet"]["channelTitle"],
#             "published_at": stats["snippet"]["publishedAt"],
#             "views": views,
#             "likes": likes,
#             "total_comments": comments_count,
#             "engagement_score": engagement_score,
#             "top_10_comments": comments
#         })

#     return videos

import os
import re
from dotenv import load_dotenv
from googleapiclient.discovery import build

load_dotenv()

API_KEY = os.getenv("YOUTUBE_API_KEY")
youtube = build("youtube", "v3", developerKey=API_KEY)


# 🔹 Extract video ID from URL
def extract_video_id(url):
    pattern = r"(?:v=|youtu\.be/)([a-zA-Z0-9_-]{11})"
    match = re.search(pattern, url)
    if match:
        return match.group(1)
    return None


# 🔹 Fetch full video metadata
def get_video_metadata(video_id):
    request = youtube.videos().list(
        part="snippet,statistics,contentDetails",
        id=video_id
    )

    response = request.execute()

    if not response["items"]:
        return {"error": "Video not found"}

    item = response["items"][0]

    return {
        "title": item["snippet"]["title"],
        "description": item["snippet"]["description"],
        "channel": item["snippet"]["channelTitle"],
        "published_at": item["snippet"]["publishedAt"],
        "tags": item["snippet"].get("tags", []),
        "duration": item["contentDetails"]["duration"],
        "views": int(item["statistics"].get("viewCount", 0)),
        "likes": int(item["statistics"].get("likeCount", 0)),
        "comment_count": int(item["statistics"].get("commentCount", 0))
    }


# 🔹 Get top 100 influential comments
def get_top_influential_comments(video_id, max_total=100):
    comments = []
    next_page_token = None

    while len(comments) < max_total:
        request = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=100,
            order="relevance",   # 🔥 MOST IMPORTANT
            pageToken=next_page_token,
            textFormat="plainText"
        )

        response = request.execute()

        for item in response.get("items", []):
            comment = item["snippet"]["topLevelComment"]["snippet"]

            comments.append({
                "author": comment["authorDisplayName"],
                "comment": comment["textDisplay"],
                "likes": comment["likeCount"],
                "published_at": comment["publishedAt"]
            })

            if len(comments) >= max_total:
                break

        next_page_token = response.get("nextPageToken")
        if not next_page_token:
            break

    return comments


# 🔹 Main scrape function using URL
def scrape_video_by_url(url):
    video_id = extract_video_id(url)

    if not video_id:
        return {"error": "Invalid YouTube URL"}

    metadata = get_video_metadata(video_id)
    comments = get_top_influential_comments(video_id, max_total=100)

    return {
        "video_id": video_id,
        "metadata": metadata,
        "total_influential_comments": len(comments),
        "influential_comments": comments
    }