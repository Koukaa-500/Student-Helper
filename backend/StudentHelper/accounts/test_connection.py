from pymongo import MongoClient
import os


try:
    # Connection URI for MongoDB Atlas
    uri = os.environ.get('MONGODB_URI')

    # Create a MongoClient and connect to MongoDB Atlas
    client = MongoClient(uri)

    # Access the database
    db = client['Student-HelperDB']  # Replace 'your_database_name' with the name of your MongoDB database

    # Access the Users collection
    users_collection = db['Users']

    # insert a document into the Users collection
    new_user = {
        'name': 'Mohamed',
        'email': 'osos.com',
        'password': 'password123',
    }
    # # Insert the document into the collection
    users_collection.insert_one(new_user)
    #check the number of documents in the collection
    num_documents = users_collection.count_documents({})
    # If the query is successful, the connection is working
    print("MongoDB connection is working! Number of documents in Users collection:", num_documents)
except Exception as e:
    # If any error occurs, print an error message
    print("Error: Failed to connect to MongoDB:", e)
    
    
