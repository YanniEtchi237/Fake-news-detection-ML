# test_predictor.py
import subprocess
import json

def test_prediction(input_text):
    try:
        # Run the predictor.py script with the provided input
        result = subprocess.check_output(['python', 'predictor.py', input_text])
        return result.decode('utf-8').strip()
    except subprocess.CalledProcessError as e:
        return f"Error: {e}"

if __name__ == "__main__":
    # Test with sample input
    sample_input = "This is a test input for fake news detection."
    prediction_result = test_prediction(sample_input)

    # Print the result
    print(f"Sample Input: {sample_input}")
    print(f"Prediction Result: {prediction_result}")

    # If you have additional test cases, you can add them here
