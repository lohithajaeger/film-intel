import json
from datetime import datetime
import os

FILE_PATH = "data/movie_data.json"


def save_to_file(data):
    # Add timestamp
    data["saved_at"] = datetime.utcnow().isoformat()

    # If file doesn't exist, create it
    if not os.path.exists(FILE_PATH):
        with open(FILE_PATH, "w") as f:
            json.dump([], f)

    # Read existing data
    with open(FILE_PATH, "r") as f:
        existing_data = json.load(f)

    # Prevent duplicate movies
    for movie in existing_data:
        if movie["movie"] == data["movie"]:
            return  # already stored

    # Append new movie
    existing_data.append(data)

    # Write back to file
    with open(FILE_PATH, "w") as f:
        json.dump(existing_data, f, indent=4)


def get_all_movies():
    with open(FILE_PATH, "r") as f:
        return json.load(f)


def get_movie(movie_name):
    with open(FILE_PATH, "r") as f:
        data = json.load(f)

    for movie in data:
        if movie["movie"] == movie_name:
            return movie

    return {"error": "Movie not found"}