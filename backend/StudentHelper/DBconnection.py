from pymongo import MongoClient
import os

def check_mongo_connection():
    try:
        # Connection URI for MongoDB Atlas
        uri = os.environ.get('MONGODB_URI')

        # Create a MongoClient and connect to MongoDB Atlas
        client = MongoClient(uri)

        # Access the database
        db = client['Student-HelperDB']  # Replace 'your_database_name' with the name of your MongoDB database

        # Access the Users collection
        users_collection = db['Users']

        # Perform a test query (e.g., count the number of documents)
        num_documents = users_collection.count_documents({})

        # If the query is successful, the connection is working
        print("MongoDB connection is working! Number of documents in Users collection:", num_documents)
    except Exception as e:
        # If any error occurs, print an error message
        print("Error: Failed to connect to MongoDB:", e)

# Call the function to check the MongoDB connection
check_mongo_connection()