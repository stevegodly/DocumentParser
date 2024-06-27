from flask import request, jsonify,send_from_directory
from config import app,aadhar_table,pan_table
from flask_cors import CORS
from spaCy_util import process_text,process_pan
from ocr_util import extract_text,extract_pan
from layoutlm import classify_doc
import os
import pymongo
from werkzeug.utils import secure_filename
from pymongo.errors import DuplicateKeyError,PyMongoError

CORS(app, resources={r"/*": {"origins": "host://5173"}})

UPLOAD_FOLDER='D:/DocumentParser/backend/uploads/'
CLASSIFY_FOLDER='D:/DocumentParser/backend/classify/'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CLASSIFY_FOLDER']= CLASSIFY_FOLDER

def allowed_file(filename):
    # Add allowed file extensions here
    ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def make_serializable(document):
    if document is None:
        return None
    document['_id'] = str(document['_id'])  # Convert ObjectId to string
    return document

@app.route("/classify",methods=["POST"])
def classify():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        if not os.path.exists(app.config['CLASSIFY_FOLDER']):
            os.makedirs(app.config['CLASSIFY_FOLDER'])

        # Save the file to the uploads folder
        filename = file.filename
        saved_path=os.path.join(app.config['CLASSIFY_FOLDER'], filename)  
        file.save(saved_path)
        print('saved_path:',saved_path)
        label=classify_doc(saved_path)  
        print("label:",label)
        return jsonify(label), 200
    else:
        return jsonify({'error': 'File processing failed'}), 500



@app.route("/upload", methods=["POST"])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            print("enteref folder creation")
            os.makedirs(app.config['UPLOAD_FOLDER'])

        # Save the file to the uploads folder
        filename = secure_filename(file.filename)
        saved_path=os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(saved_path)
        print("entered file saving")
        print('saved_path:',saved_path)
        label=classify_doc(saved_path)

        if label=="aadhar":
            text=extract_text(saved_path)  
            entities = process_text(text)
            insert_aadhar_table(entities,saved_path)
            
        elif label=="pan":
            print("entered else")
            text=extract_pan(saved_path)  
            entities = process_pan(text)
            insert_pan_table(entities,saved_path)  

        return jsonify({'entities':entities,'label':label,'message': 'File successfully processed'}), 200
    else:
        return jsonify({'error': 'File processing failed'}), 500

@app.route('/retrieve/',methods=['GET'])
def retrieve_entities():
    try:
        type=request.args.get("type")
        if type=="aadhar":
            entities = list(aadhar_table.find({}, {"_id": 0}))
            return jsonify(entities)
        elif type=="pan":
            entities = list(pan_table.find({}, {"_id": 0}))
            return jsonify(entities)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/fetch/',methods=['GET'])
def fetch_entities():
    try:
        type=request.args.get("type")
        if type=="aadhar":
            entities = aadhar_table.find_one(sort=[('_id', pymongo.DESCENDING)])
        elif type=="pan":
            entities = pan_table.find_one(sort=[('_id', pymongo.DESCENDING)])
        return jsonify(make_serializable(entities))
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/get_record/', methods=['GET'])
def get_record():
    pan_record={}
    aadhar_record={}

    name=request.args.get('name')
    aadhar_no=request.args.get('aadhar_no')
    pan_no=request.args.get('pan_no')

    if name:
        aadhar_record=list(aadhar_table.find({'name':name},{"_id": 0}))
        pan_record=list(pan_table.find({'name':name},{"_id": 0}))

    elif aadhar_no:
        aadhar_record=list(aadhar_table.find({'aadhar_no':aadhar_no},{"_id": 0}))

    elif pan_no:
        pan_record=list(pan_table.find({'pan':pan_no},{"_id": 0}))

    record=[aadhar_record,pan_record]
    return jsonify(record)

@app.route('/uploads/<path:filename>',methods=['GET'])
def serve_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


def insert_pan_table(entities,saved_path):
    print("entities:",entities)
    try:
        local_prefix = "D:/DocumentParser/backend"
        url_prefix = "http://127.0.0.1:5000"
    
    # Replace the local prefix with the URL prefix
        url_path = saved_path.replace(local_prefix, url_prefix)
        new_entity = {
            'name': entities.get('NAME').replace('|', ''),
            'father_name': entities.get('FATHER_NAME').replace('|', ''),
            'dob': entities.get('DOB').replace('|', ''),
            'pan': entities.get('PAN').replace('|', ''),
            'image_path': url_path
        }
        result = pan_table.insert_one(new_entity)
        print(f"New entity added successfully with id: {result.inserted_id}")
    except DuplicateKeyError as e:
        print(f"Error occurred: Duplicate key error - {e}")
    except PyMongoError as e:
        print(f"An error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")    

def insert_aadhar_table(entities,saved_path):
    print("entities:",entities)
    try:
        local_prefix = "D:/DocumentParser/backend"
        url_prefix = "http://127.0.0.1:5000"
    
    # Replace the local prefix with the URL prefix
        url_path = saved_path.replace(local_prefix, url_prefix)
        new_entity = {
            'name': entities.get('NAME'),
            'gender': entities.get('GENDER'),
            'dob': entities.get('DOB'),
            'aadhar_no': entities.get('AADHAR_NO'),
            'image_path': url_path
        }
        result = aadhar_table.insert_one(new_entity)
        print(f"New entity added successfully with id: {result.inserted_id}")
    except DuplicateKeyError as e:
        print(f"Error occurred: Duplicate key error - {e}")
    except PyMongoError as e:
        print(f"An error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")    
        


if __name__ == "__main__":
    app.run(debug=True)        