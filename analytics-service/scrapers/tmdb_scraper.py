import os
import requests
from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"


def search_movie(movie_name):
    url = f"{BASE_URL}/search/movie"

    params = {
        "api_key": TMDB_API_KEY,
        "query": movie_name
    }

    response = requests.get(url, params=params)
    data = response.json()

    if not data.get("results"):
        return {"error": "Movie not found"}

    movie = data["results"][0]
    return movie


def get_movie_details(movie_name):
    movie = search_movie(movie_name)

    if "error" in movie:
        return movie

    movie_id = movie["id"]

    details_url = f"{BASE_URL}/movie/{movie_id}"
    credits_url = f"{BASE_URL}/movie/{movie_id}/credits"

    details = requests.get(details_url, params={"api_key": TMDB_API_KEY}).json()
    credits = requests.get(credits_url, params={"api_key": TMDB_API_KEY}).json()

    cast = [actor["name"] for actor in credits.get("cast", [])[:5]]

    return {
        "title": details.get("title"),
        "release_date": details.get("release_date"),
        "runtime": details.get("runtime"),
        "genres": [g["name"] for g in details.get("genres", [])],
        "overview": details.get("overview"),
        "tmdb_rating": details.get("vote_average"),
        "vote_count": details.get("vote_count"),
        "popularity_score": details.get("popularity"),
        "budget": details.get("budget"),
        "revenue": details.get("revenue"),
        "top_cast": cast
    }