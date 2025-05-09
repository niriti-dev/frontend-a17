"""
Database connection configuration.
"""
from pymongo import MongoClient

# MongoDB connection string - replace with your actual connection string
MONGO_URI = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"

# Initialize MongoDB client
try:
    client = MongoClient(MONGO_URI)
    print("Connecting to Mongo in the cloud")
    db = client.get_database()
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    raise e 