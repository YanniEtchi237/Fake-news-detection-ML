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
        const input_text = req.body.textInput;
        const pythonProcess = spawn('python', ['predictor.py', input_text]);

        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                res.json({ prediction: result.trim() });
            } else {
                res.status(500).json({ error: 'Error executing the Python script' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
