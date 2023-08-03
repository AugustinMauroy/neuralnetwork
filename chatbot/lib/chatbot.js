import readline from 'node:readline';
import http from 'node:http';
import NaturalLanguageClassifier from './natural.js';
import { textColor, log } from './loging.js';

class Chatbot {
	constructor() {
	  this.classifier = new NaturalLanguageClassifier();
	  this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
	  });
	  this.context = []; // Initialize an array to store the conversation context
	}
  
	addDocument(doc, category) {
	  // Add validation and sanitization here if needed
	  this.classifier.addDocument(doc, category);
	}
  
	train() {
	  this.classifier.train();
	}
  
	classify(doc) {
	  try {
			const processedInput = doc.toLowerCase().replace(/[^\w\s]/gi, '');
			const responseCategories = this.classifier.classify(processedInput);
  
			// Store the current user input and chatbot response in the context
			this.context.push({ input: doc, output: responseCategories[0] });
  
			// Limit the context to a reasonable number of interactions (e.g., 5)
			const maxContextSize = 5;
			if (this.context.length > maxContextSize) {
		  this.context.shift(); // Remove the oldest element from the context
			}
  
			// If the classifier is not confident, return a default response or ask for clarification.
			const ambiguous = responseCategories.length === 1 && this.classifier.maxProb < 0.5;
			return ambiguous ? 'I\'m not sure. Can you please provide more context?' : responseCategories[0];
	  } catch (error) {
			console.error(`Error occurred while processing the input: ${error.message}`);
			return 'Oops! Something went wrong. Please try again.';
	  }
	}
  
	saveModel(filePath) {
		this.classifier.saveModelToFile(filePath);
	  }

	  loadModel(filePath) {
		this.classifier.loadModelFromFile(filePath);
	  } 
	REPLstart() {
	  const prompt = () => {
			this.rl.question(textColor(32, '[You]: '), input => {
		  // Remove punctuation from the user's input
		  const sanitizedInput = input.replace(/[^\w\s]/gi, '');
		  // Store the user's input in the context (before processing for classification)
		  this.context.push({ input });
  
		  const output = this.classify(sanitizedInput);
		  console.log(`${textColor(31, '[Chatbot]:')} ${output}`);
		  prompt();
			});
	  };

	  prompt();
	}

	APIstart() {
		console.warn('This feature is experimental and not recommended for production use.');
		const server = http.createServer((req, res) => {
			// Set CORS headers
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Request-Method', '*');
			res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
			res.setHeader('Access-Control-Allow-Headers', '*');
			if (req.method === 'OPTIONS') {
				res.writeHead(200);
				res.end();
				return;
			}
			const { url } = req;
			try {
				// trhow error if no input is provided
				if (!url.includes('?input=')) {
					throw new Error('No input provided');
				}
				const query = url.split('?')[1];
				const input = query.split('=')[1];
				const output = this.classify(input);
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ input, output }));
			} catch (error) {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ error: error.message }));
			}
		});
		server.listen(3000, () => {
			log.info('Server running at http://localhost:3000/');
		});
	}
}

export default Chatbot;
