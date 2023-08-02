import readline from 'node:readline';
import natural from './natural.js';

const textColor = (colorCode, text) => `\x1b[${colorCode}m${text}\x1b[0m`;

class Chatbot {
	constructor() {
	  this.classifier = natural.BayesClassifier();
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
  
	start() {
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
}

export default Chatbot;
