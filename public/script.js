// script.js
function makePrediction() {
    // Get the input text from the textarea
    var inputText = document.getElementById("newsInput").value;

    // Show the loading spinner
    var loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'inline-block';

    // Send a request to your backend for prediction using AJAX or Fetch API
    // Example using Fetch API
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText: inputText }),
    })
    .then(response => response.json())
    .then(data => {
        // Hide the loading spinner
        loadingSpinner.style.display = 'none';

        // Check if data.prediction is a valid number
        if (!isNaN(data.prediction)) {
            // Convert prediction to a user-friendly format (0 or 1)
            var binaryPrediction = data.prediction;
            var pred
            pred = (binaryPrediction == 1) ? "Reliable" : "Unreliable";


            // Update the result element with the binary prediction
            var resultElement = document.getElementById("result");
            resultElement.innerHTML = "Prediction: " + pred;
        } else {
            // Display an error message
            var resultElement = document.getElementById("result");
            resultElement.innerHTML = "Error: Invalid prediction value";
        }
       console.log(data.prediction)
    })
    .catch((error) => {
        // Hide the loading spinner in case of an error
        loadingSpinner.style.display = 'none';

        // Display an error message
        var resultElement = document.getElementById("result");
        resultElement.innerHTML = "Error: Failed to make prediction";
        console.error('Error:', error);
    });
}
