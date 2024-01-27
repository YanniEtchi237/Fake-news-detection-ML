function makePrediction() {
    // Get the input text from the textarea
    var inputText = document.getElementById("newsInput").value;

    // Show the loading spinner
    var loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'inline-block';

    // Log input text for debugging
    console.log("Input Text:", inputText);

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure it to make a POST request to '/predict'
    xhr.open('POST', '/predict', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Define a callback function to handle the response
    xhr.onload = function () {
        try {
            // Check if the request was successful (status code 200)
            if (xhr.status === 200) {
                // Parse the JSON response
                var data = JSON.parse(xhr.responseText);

                // Log received data for debugging
                console.log("Received Data:", data);

                // Check if data.prediction is a valid number
                if (!isNaN(data.prediction)) {
                    // Convert prediction to a user-friendly format (0 or 1)
                    var binaryPrediction = data.prediction;
                    var pred = (binaryPrediction == 1) ? "Reliable" : "Unreliable";

                    // Update the result element with the binary prediction
                    var resultElement = document.getElementById("result");
                    resultElement.innerHTML = "Prediction: " + pred;
                } else {
                    // Display an error message
                    handlePredictionError("Invalid prediction value");
                }
            } else {
                // Handle HTTP error
                handlePredictionError("HTTP error: " + xhr.status);
            }
        } catch (error) {
            // Handle JSON parsing error
            handlePredictionError("Error parsing JSON response");
        } finally {
            // Hide the loading spinner
            loadingSpinner.style.display = 'none';
        }
    };

    // Define a callback function to handle network errors
    xhr.onerror = function () {
        // Hide the loading spinner
        loadingSpinner.style.display = 'none';

        // Handle network error
        handlePredictionError("Network error");
    };

    // Stringify the input text and send the request
    xhr.send(JSON.stringify({ inputText: inputText }));
}

function handlePredictionError(message) {
    // Display an error message
    var resultElement = document.getElementById("result");
    resultElement.innerHTML = "Error: " + message;

    console.error('Prediction Error:', message);
}
