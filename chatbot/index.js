import fs from 'node:fs';
import path from 'node:path';
import Chatbot from './lib/chatbot.js';

// Function to read and preprocess a JSON file
const readAndPreprocessJSON = (filePath) => {
	const data = fs.readFileSync(filePath, 'utf8');
	const jsonData = JSON.parse(data);
	return jsonData.map(item => ({
		input: item.question.toLowerCase(),
		output: item.answer
	}));
};


// Function to read all JSON files in the 'data' directory
const readAllDataFiles = () => {
	const dataDirectory = path.join(path.resolve(), 'data');
	const dataFiles = fs.readdirSync(dataDirectory).filter(file => file.endsWith('.json'));
	const allData = [];
	dataFiles.forEach(file => {
		const filePath = path.join(dataDirectory, file);
		const fileData = readAndPreprocessJSON(filePath);
		allData.push(...fileData);
	});
	return allData;
};

// Get all preprocessed data from all JSON files
const allPreprocessedData = readAllDataFiles();

console.log(allPreprocessedData);


// Train the chatbot
const chatbot = new Chatbot();
allPreprocessedData.forEach(item => {
	chatbot.addDocument(item.input, item.output);
});
chatbot.train();

// Start the REPL
//chatbot.REPLstart();

// Start API server
// chatbot.APIstart();
