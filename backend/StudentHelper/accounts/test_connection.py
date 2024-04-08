# Import the MongoConnection class from DBconnection module
import MongoConnection

# Example usage in views.py
def my_view(request):
    # Create an instance of MongoConnection
    mongo_conn = MongoConnection(host='localhost', port=27017, database_name='your_database')

    # Get a reference to a MongoDB collection
    collection = mongo_conn.get_collection('your_collection')

    # Perform operations on the collection
    # For example:
    # collection.insert_one({'key': 'value'})
    # collection.find_one({'key': 'value'})

    # Close the connection when done
    mongo_conn.close_connection()

    # Continue with your view logic
