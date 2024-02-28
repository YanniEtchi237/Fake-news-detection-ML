from flask import Flask, request, jsonify, send_from_directory
from subprocess import Popen, PIPE
import os

app = Flask(__name__)

@app.route('/')
def index():
    # Serve index.html from the public directory
    return send_from_directory('../public', 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_text = request.json['inputText']
        process = Popen(['python', 'predictor.py', input_text], stdout=PIPE, stderr=PIPE, encoding='utf-8')
        stdout, stderr = process.communicate()
        
        if process.returncode == 0:
            prediction = stdout.strip()
            return jsonify({'prediction': prediction})
        else:
            error_message = stderr.strip() if stderr else 'Unknown error occurred'
            return jsonify({'error': error_message}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/<path:filename>')
def serve_static(filename):
    # Serve static files from the public directory
    return send_from_directory('../public', filename)

if __name__ == '__main__':
    app.run(debug=True)
