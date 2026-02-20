from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["film_intel"]
collection = db["scraped_data"]

def save_data(data):
    collection.insert_one(data)