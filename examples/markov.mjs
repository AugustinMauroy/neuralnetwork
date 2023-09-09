import fs from 'node:fs';
import path from 'node:path';
import { MarkovChatbot } from 'neuralnetwork-js';

const dataDirectoryPath = 'examples/data/data-markov';

// debug relative path displaying the absolute path
console.log(`Absolute path to data directory: ${path.resolve(dataDirectoryPath)}`);
const dataFiles = fs.readdirSync(dataDirectoryPath).filter(file => path.extname(file) === '.json');

const trainingData = [];
dataFiles.forEach(file => {

    const data = JSON.parse(fs.readFileSync(path.join(dataDirectoryPath, file), 'utf-8'));
    return data;

});

const chatbot = new MarkovChatbot(trainingData);
const modelFilePath = './data/trained-models/markov.json';

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
