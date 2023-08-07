import Chatbot from './lib/chatbot.js';
import trainingData from './data.json' assert { type: 'json' };

const chatbot = new Chatbot(trainingData);
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
// chatbot.REPLstart();

// To run the chatbot as an API server:
// chatbot.APIstart();
