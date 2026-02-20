from fastapi import FastAPI
from scrapers.youtube_scraper import scrape_video_by_url
from scrapers.tmdb_scraper import get_movie_details
from file_db import save_to_file, get_all_movies, get_movie

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Analytics Service Running"}


# 🔥 MAIN ENDPOINT
@app.get("/scrape-movie")
def scrape_movie(movie: str, youtubeUrl: str):

    # 1️⃣ Scrape TMDB using movie name
    tmdb_data = get_movie_details(movie)

    # 2️⃣ Scrape YouTube using provided URL
    youtube_data = scrape_video_by_url(youtubeUrl)

    # 3️⃣ Structure the data
    structured_data = {
        "movie": movie,
        "tmdb": tmdb_data,
        "youtube": youtube_data
    }

    # 4️⃣ Save to JSON file
    save_to_file(structured_data)

    # 5️⃣ Return structured data
    return structured_data


# 🔥 Fetch all stored movies
@app.get("/all-movies")
def all_movies():
    return get_all_movies()


# 🔥 Fetch specific movie
@app.get("/movie-data")
def movie_data(movie: str):
    return get_movie(movie)