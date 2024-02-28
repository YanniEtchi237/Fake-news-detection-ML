// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('../public'));

app.post('/predict', (req, res) => {
    try {
        const input_text = req.body.inputText;  // Use 'inputText' instead of 'textInput'
        const pythonProcess = spawn('python', ['predictor.py', input_text]);

        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                res.json({ prediction: result.trim() });
            } else {
                console.error('Python script execution failed with exit code:', code);
                res.status(500).json({ error: 'Error executing the Python script' });
            }
        });

        pythonProcess.on('error', (error) => {
            console.error('Error executing Python script:', error);
            res.status(500).json({ error: 'Error executing the Python script' });
        });
    } catch (error) {
        console.error('Error in /predict route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
