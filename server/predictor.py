# server/predictor.py
import sys
import traceback
<<<<<<< HEAD
from keras.preprocessing.sequence import pad_sequences
import pickle
import numpy as np
=======
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
>>>>>>> parent of 06ed8b2 (final)

# Define the global vectorizer variable
vectorizer = None

def load_model(model_path='model.pkl'):
    try:
        model = joblib.load(model_path)
        return model
    except Exception as e:
        print(f"Error loading the model: {e}")
        traceback.print_exc()
        sys.exit(1)

def load_vectorizer(vectorizer_path='vectorizer.pkl'):
    try:
        global vectorizer  # Add this line to reference the global variable
        vectorizer = joblib.load(vectorizer_path)
        return vectorizer
    except Exception as e:
        print(f"Error loading the vectorizer: {e}")
        traceback.print_exc()
        sys.exit(1)

def preprocess_input(input_text):
    # Use the global vectorizer for transformation
    global vectorizer
    if vectorizer is None:
        print("Vectorizer not initialized. Please load the model first.")
        sys.exit(1)

    tfidf_matrix = vectorizer.transform([input_text])
    return tfidf_matrix

def make_prediction(model, input_text):
    try:
        input_data = preprocess_input(input_text)

        # Check if the vocabulary sizes match
        #if input_data.shape[1] != model.support_vectors_.shape[1]:
            #raise ValueError("Mismatch in vocabulary size between vectorizer and model")

        # Use predict for binary classification
        prediction = model.predict(input_data)

        # Handle the case where prediction is an empty array
        if prediction.size == 0:
            raise ValueError("Empty prediction array")

        return prediction[0]
    except Exception as e:
        print(f"Error making prediction: {e}")
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    # Load the vectorizer globally
    load_vectorizer()  # Remove the assignment to vectorizer, as it's a global variable

    # Load the trained model
    trained_model = load_model()

    # Get the input text from the command line argument
    input_text = sys.argv[1]  # Change from sys.argv[0] to sys.argv[1]

    # Make the prediction
    result = make_prediction(trained_model, input_text)

    # Print the result
    print(result)
