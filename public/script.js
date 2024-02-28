function makePrediction() {
    // Get the input text from the textarea
    var inputText = document.getElementById("newsInput").value;

    // Show the loading spinner
    var loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'inline-block';

    // Log input text for debugging
    console.log("Input Text:", inputText);

    // Define request options
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputText: inputText })
    };

    // Make the HTTP request using Fetch API
    fetch('/predict', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Log received data for debugging
            console.log("Received Data:", data);

            // Check if data.prediction is a valid number
            if (!(data.prediction === null)) {
                // Convert prediction to a user-friendly format (0 or 1)
                var resultElement = document.getElementById("result");
                resultElement.innerHTML = (parseFloat(data.prediction.slice(1,-1))*100).toFixed(2)+ "% Reliable";
            } else {
                // Display an error message
                handlePredictionError("Invalid prediction value");
            }
        })
        .catch(error => {
            // Handle network or parsing errors
            handlePredictionError(error.message);
        })
        .finally(() => {
            // Hide the loading spinner
            loadingSpinner.style.display = 'none';
        });
}


function handlePredictionError(message) {
    // Display an error message
    var resultElement = document.getElementById("result");
    resultElement.innerHTML = "Error: " + message;

    console.error('Prediction Error:', message);
}
