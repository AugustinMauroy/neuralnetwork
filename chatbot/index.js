import Chatbot from './lib/chatbot.js';
import fs from 'fs';
import path from 'path';

// Define the directory path for data storage
const dataDirectoryPath = './data';

// Read all JSON files in the data directory
const dataFiles = fs.readdirSync(dataDirectoryPath).filter(file => path.extname(file) === '.json');

// Preprocess the data
const preprocessedData = [];
dataFiles.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(dataDirectoryPath, file), 'utf-8'));
    data.forEach(item => {
        preprocessedData.push({
            input: item.question.toLowerCase(), // Convert input to lowercase for case-insensitive matching
            output: item.answer
        });
    });
});

// Train the chatbot
const chatbot = new Chatbot();
preprocessedData.forEach(item => {
    chatbot.addDocument(item.input, item.output);
});
chatbot.train();

// Define the file path for model storage
const modelFilePath = './trainedModel.json';

// Save the trained model to a file
try {
	chatbot.saveModel(modelFilePath);
	console.log(`Trained model saved to ${modelFilePath}`);
} catch (error) {
	console.error(`Error saving the trained model: ${error.message}`);
}

// Uncomment the following lines based on the desired deployment scenario:

// To run the chatbot as a REPL (command-line interface):
chatbot.REPLstart();

// To run the chatbot as an API server:
// chatbot.APIstart();
