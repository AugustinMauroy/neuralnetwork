import Chatbot from './lib/chatbot.js';
import data from './data.json' assert { type: 'json' };

// Preprocess the data
const preprocessedData = data.map(item => ({
  input: item.question.toLowerCase(), // Convert input to lowercase for case-insensitive matching
  output: item.answer
}));

// Train the chatbot
const chatbot = new Chatbot();
preprocessedData.forEach(item => {
  chatbot.addDocument(item.input, item.output);
});
chatbot.train();

// Start the REPL, need to be uncommented when running locally
//chatbot.REPLstart();

// Start API server, need to be uncommented when running locally
//chatbot.APIstart();
