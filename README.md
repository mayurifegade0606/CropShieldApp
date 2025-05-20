## CropShield - Crop Disease Detection and Monitoring System Using Machine Learning

## Overview
**CropShield** is an Android application that helps farmers and agricultural users detect crop diseases through image analysis. Users can either upload or capture an image of a crop leaf using their mobile device. The image is then processed by a machine learning model hosted on a Flask backend. The app provides disease prediction and basic remedies using a React.js-based frontend integrated into the Android app.

## Features
- Upload or capture live crop leaf images.
- Accurate crop disease detection using a trained ML model.
- Displays predicted disease name with basic remedies.
- React.js frontend embedded into the Android app.
- Flask backend for communication between app and ML model.

## Tech Stack
- Android (Mobile App)
- Frontend: React.js 
- Backend: Python, Flask
- Machine Learning: TensorFlow, Keras (Python)

## How It Works
1. User uploads or captures a crop leaf image in the Android app.
2. Image is sent to the Flask backend.
3. Backend preprocesses the image and sends it to a CNN model.
4. The model returns the predicted disease name.
5. App displays the result with basic info and remedies.

## Installation & Setup

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/mayurifegade0606/CropShield.git
cd CropShield/backend

# Set up virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py
