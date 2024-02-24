# server/predictor.py
import sys
import traceback
from keras.preprocessing.sequence import pad_sequences
import pickle
import numpy as np
import tensorflow as tf
# Define the global vectorizer variable
vectorizer = None

def load_model(model_path):
    try:
        model = tf.keras.models.load_model(model_path)
        return model
    except Exception as e:
        print(f"Error loading the model: {e}")
        traceback.print_exc()
        sys.exit(1)


def preprocess_input(input_text,tokenizer_path):
    # import tokenizer.
    with open(tokenizer_path, 'rb') as f:
        tokenizer = pickle.load(f)
    
    
    new_text_sequence = tokenizer.texts_to_sequences([input_text])  # Assuming 'tokenizer' is the tokenizer used during training
    new_text_padded = pad_sequences(new_text_sequence, maxlen=100)

    return new_text_padded

   

def make_prediction(model, input_text):
    try:
        input_data = preprocess_input(input_text,"./tokenizer.pkl")

        # Check if the vocabulary sizes match
        #if input_data.shape[1] != model.support_vectors_.shape[1]:
            #raise ValueError("Mismatch in vocabulary size between vectorizer and model")

        # Use predict for binary classification
        prediction = model.predict(input_data,verbose = 0)

        # Handle the case where prediction is an empty array
        if prediction.size == 0:
            raise ValueError("Empty prediction array")

        return prediction[0]
    except Exception as e:
        print(f"Error making prediction: {e}")
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":


    # Load the trained model
    trained_model = load_model("./model.h5")

    # Get the input text from the command line argument
    input_text = sys.argv[1]  # Change from sys.argv[0] to sys.argv[1]
   
    # Make the prediction
    result = make_prediction(trained_model, input_text)

    # Print the result
    print(result)
