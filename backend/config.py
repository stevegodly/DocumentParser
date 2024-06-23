from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client['admin']
aadhar_table = db['aadhar_entities']
pan_table=db['pan_entities']
