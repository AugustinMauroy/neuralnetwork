import { readFileSync } from 'node:fs';
import parseCJSON from './lib/cjson.js';
import Chatbot from './lib/chatbot.js';

// get data
const data = parseCJSON(readFileSync('./data.json', 'utf8'));

// Preprocess the data
const preprocessedData = data.map(item => ({
	input: item.question,
	output: item.answer
}));

// Train the chatbot
const chatbot = new Chatbot();
preprocessedData.forEach(item => {
	chatbot.addDocument(item.input, item.output);
});
chatbot.train();

// Start the REPL
chatbot.start();
