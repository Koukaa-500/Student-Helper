
# This will serve as a blueprint to make connecting to database easier in other code

from pymongo import MongoClient

class MongoConnection:
    def __init__(self, host='localhost', port=27017, database_name='your_database'):
        self.host = host
        self.port = port
        self.database_name = database_name
        self.client = MongoClient(host, port)
        self.db = self.client[database_name]
        print("DataBase connection established")

    def get_collection(self, collection_name):
        return self.db[collection_name]

    def close_connection(self):
        self.client.close()

