from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import uuid
import logging
from datetime import datetime

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO)

# Load the trained model
try:
    model = load_model("C:/Users/PRERNA/Downloads/BEPROJECT/BEPROJECT/Disease_detection/Disease_detection/potato-disease/training/model-1.h5")
    logging.info("Model loaded successfully.")
except Exception as e:
    logging.error(f"Error loading model: {e}")
    exit(1)

# Define class labels
class_labels = ["Early Blight", "Late Blight", "Healthy"]

# Limit file size to 16 MB
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.route('/api/predict', methods=['GET', 'POST'])
def predict():
    logging.info("Request received")
    if 'file' not in request.files:
        logging.error("No file in request")
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    logging.info(f"Received file: {file.filename}")
    if request.method == 'GET':
        return jsonify({'message': 'This endpoint only supports POST requests with an image file.'}), 200
    if request.method == 'POST':
        try:
            # Validate file type
            if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                logging.error("Invalid file type")
                return jsonify({'error': 'Invalid file type. Only PNG, JPG, and JPEG are allowed'}), 400

            # Create unique filename and save file
            upload_dir = os.path.join("uploads", datetime.now().strftime("%Y-%m-%d"))
            os.makedirs(upload_dir, exist_ok=True)
            filename = str(uuid.uuid4()) + "_" + file.filename
            filepath = os.path.join(upload_dir, filename)
            file.save(filepath)

            # Preprocess image
            img = image.load_img(filepath, target_size=(224, 224))
            img_array = image.img_to_array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)

            # Make prediction
            prediction = model.predict(img_array)
            probabilities = prediction.tolist()[0]
            class_index = int(np.argmax(prediction))
            disease = class_labels[class_index]
            confidence = float(np.max(prediction))

            logging.info(f"Prediction: {disease} | Confidence: {confidence}")

            # Cleanup uploaded file
            os.remove(filepath)

            return jsonify({
                'disease': disease,
                'confidence': confidence,
                'probabilities': {class_labels[i]: float(probabilities[i]) for i in range(len(class_labels))}
            })

        except Exception as e:
            logging.error(f"Error during prediction: {e}")
            return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'Server is running'}), 200

if __name__ == '__main__':
    os.makedirs("uploads", exist_ok=True)
    app.run(debug=True, host="0.0.0.0", port=5000)
    
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# import numpy as np
# import os
# import uuid

# app = Flask(__name__)
# CORS(app)


# # Load the trained model
# model = load_model("C:/Users/PRERNA/Downloads/BEPROJECT/BEPROJECT/Disease_detection/Disease_detection/potato-disease/training/model.h5")

# # model = load_model("../model.h5")
# print("Model loaded successfully.")

# # Define class labels
# class_labels = ["Early Blight", "Late Blight", "Healthy"]


# @app.route('/api/predict', methods=['GET','POST'])  
# def predict():
#     print("Request received")
#     if 'file' not in request.files:
#         print("No file in request")
#         return jsonify({'error': 'No file part in the request'}), 400

#     file = request.files['file']
#     print(f"Received file: {file.filename}")
#     if request.method == 'GET':
#         return jsonify({'message': 'This endpoint only supports POST requests with an image file.'}), 200
#     if request.method == 'POST':
#         try:
#             # Receive the file from request
#             if 'file' not in request.files:
#                 return jsonify({'error': 'No file part in the request'}), 400

#             file = request.files['file']
#             if file.filename == '':
#                 return jsonify({'error': 'No file selected for uploading'}), 400

#             # Validate file type (e.g., only allow images)
#             if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
#                 return jsonify({'error': 'Invalid file type. Only PNG, JPG, and JPEG are allowed'}), 400

#             # Create unique filename to avoid overwrite
#             filename = str(uuid.uuid4()) + "_" + file.filename
#             filepath = os.path.join("uploads", filename)
#             file.save(filepath)

#             # Preprocess image
#             img = image.load_img(filepath, target_size=(224, 224))
#             img_array = image.img_to_array(img) / 255.0
#             img_array = np.expand_dims(img_array, axis=0)

#             # Make prediction
#             prediction = model.predict(img_array)
#             class_index = int(np.argmax(prediction))
#             disease = class_labels[class_index]
#             confidence = float(np.max(prediction))

#             # Cleanup uploaded file
#             os.remove(filepath)

#             return jsonify({'disease': disease, 'confidence': confidence})

#         except Exception as e:
#             return jsonify({'error': str(e)}), 500
# # @app.route('/api/predict', methods=['POST'])
# # def predict():
# #     try:
# #         print("running successfully")
# #         # Receive the file from request
# #         file = request.files['file']
# #         print("Received file:", file.filename)

# #         # Create unique filename to avoid overwrite
# #         filename = str(uuid.uuid4()) + "_" + file.filename
# #         filepath = os.path.join("uploads", filename)
# #         # Save file to local folder
# #         file.save(filepath)
# #         print("File saved at:", filepath)

# #         # Preprocess image
# #         img = image.load_img(filepath, target_size=(224, 224))
# #         img_array = image.img_to_array(img) / 255.0
# #         img_array = np.expand_dims(img_array, axis=0)

# #         print("Image preprocessed. Shape:", img_array.shape)

# #         # Make prediction
# #         prediction = model.predict(img_array)
# #         class_index = int(np.argmax(prediction))
# #         disease = class_labels[class_index]
# #         confidence = float(np.max(prediction))

# #         print("Prediction made:", disease, "| Confidence:", confidence)

# #         return jsonify({'disease': disease, 'confidence': confidence})

# #     except Exception as e:
# #         print("Error occurred:", str(e))
# #         return jsonify({'error': str(e)})

# if __name__ == '__main__':
#     os.makedirs("uploads", exist_ok=True)
    
#     app.run(debug=True, host="0.0.0.0", port=5000)

