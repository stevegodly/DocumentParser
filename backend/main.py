from flask import request, jsonify
from config import app,aadhar_table
from flask_cors import CORS
from spaCy_util import process_text
from ocr_util import extract_text
from layoutlm import classify_doc
import os
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError,PyMongoError

CORS(app, resources={r"/*": {"origins": "host://5173"}})

UPLOAD_FOLDER='D:/docParser/backend/upload/'
CLASSIFY_FOLDER='D:/docParser/backend/classify/'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CLASSIFY_FOLDER']= CLASSIFY_FOLDER

def allowed_file(filename):
    # Add allowed file extensions here
    ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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
        text=extract_text(saved_path)  
        entities = process_text(text)
        insert_aadhar_table(entities,saved_path)
        return jsonify({'message': 'File successfully processed'}), 200
    else:
        return jsonify({'error': 'File processing failed'}), 500

@app.route('/retrieve',methods=['GET'])
def retrieve_entities():
    try:
        entities = list(aadhar_table.find({}, {"_id": 0}))
        return jsonify(entities)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get_record', methods=['GET'])
def get_record():
    pan_record={}
    aadhar_record={}
    if 'name' in request.args:
        name = request.args.get('name')
        aadhar_record=aadhar_table.find_one({'name':name})
        pan_record=pan_table.find({'name':name})

    elif 'aadhar_no' in request.args:
        aadhar_no = request.args.get('aadhar_no')
        aadhar_record=aadhar_table.find_one({'aadhar_no':aadhar_no})

    elif 'pan_no' in request.args:
        pan_no = request.args.get('pan_no')
        pan_record=aadhar_table.find_one({'pan_no':pan_no})

    record=[aadhar_record,pan_record]
    return jsonify(record)

def insert_aadhar_table(entities,saved_path):
    print("entities:",entities)
    try:
        new_entity = {
            'name': entities.get('NAME'),
            'gender': entities.get('GENDER'),
            'dob': entities.get('DOB'),
            'aadhar_no': entities.get('AADHAR_NO'),
            'image_path': saved_path
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