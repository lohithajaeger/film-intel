from apify_client import ApifyClient
import os
from dotenv import load_dotenv

load_dotenv()

APIFY_TOKEN = os.getenv("APIFY_TOKEN")


def scrape_reel_by_url(reel_url):
    try:
        client = ApifyClient(APIFY_TOKEN)

        run_input = {
            "directUrls": [reel_url],  # 🔥 IMPORTANT
            "resultsLimit": 1
        }

        # ✅ Correct actor for post/reel scraping
        run = client.actor("apify/instagram-post-scraper").call(run_input=run_input)

        items = client.dataset(run["defaultDatasetId"]).list_items().items

        if not items:
            return {"error": "No data found"}

        post = items[0]

        return {
            "caption": post.get("caption"),
            "likes": post.get("likesCount"),
            "comments_count": post.get("commentsCount"),
            "video_view_count": post.get("videoViewCount"),
            "owner_username": post.get("ownerUsername"),
            "timestamp": post.get("timestamp")
        }

    except Exception as e:
        return {"error": str(e)}