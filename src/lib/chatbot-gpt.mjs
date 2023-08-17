import readline from 'node:readline';
import http from 'node:http';
import fs from 'node:fs';
import GPTModel from './gpt.mjs';
import { textColor, log } from './loging.mjs';

class Chatbot {
	constructor(data) {
		this.classifier = new GPTModel(data); // Initialize GPTModel with the provided data
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		this.context = []; // Initialize an array to store the conversation context
	}

	classify(doc) {
		try {
			// Store the current user input and chatbot response in the context
			this.context.push({ input: doc });

			// Limit the context to a reasonable number of interactions (e.g., 5)
			const maxContextSize = 5;
			if (this.context.length > maxContextSize) {
				this.context.shift(); // Remove the oldest element from the context
			}

			// Generate a response using the GPTModel
			const response = this.classifier.generateResponse(doc, 1, this.context.map(entry => entry.input).join(' '));
      
			// Add the generated response to the context
			this.context[this.context.length - 1].output = response;

			return response;
		} catch (error) {
			console.error(`Error occurred while processing the input: ${error.message}`);
			return 'Oops! Something went wrong. Please try again.';
		}
	}

	saveModel(filename) {
		this.classifier.saveModel(filename);
	}

	loadModel(filename) {
		this.classifier.loadModel(filename);
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
		log.warn('This feature is experimental and not recommended for production use.');
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
			if (url === '/') {
				fs.readFile('./lib/index.html', (err, data) => {
					if (err) {
						res.writeHead(500);
						res.end(JSON.stringify({ error: err.message }));
						return;
					}
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.end(data);
				});
			} else if (url.startsWith('/api')) {
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
			} else {
				res.writeHead(404, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ error: 'Not found' }));
			}

		});
		server.listen(3000, () => {
			log.info('Server running at http://localhost:3000/');
		});
	}
}

export default Chatbot;
