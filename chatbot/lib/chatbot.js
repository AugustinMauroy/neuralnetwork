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
		const processedInput = doc.toLowerCase();
		const responseCategories = this.classifier.classify(processedInput);
	
		// Store the current user input and chatbot response in the context
		this.context.push({ input: doc, output: responseCategories[0] });
	
		// Limit the context to a reasonable number of interactions (e.g., 5)
		const maxContextSize = 5;
		if (this.context.length > maxContextSize) {
		  this.context.shift(); // Remove the oldest element from the context
		}
	
		// For this example, we'll just return the first response category.
		// You can customize the response selection logic based on the context.
		return responseCategories[0];
	  }

      start() {
        const prompt = () => {
          this.rl.question(textColor(32, '[You]: '), input => {
            // Store the user's input in the context (before processing for classification)
            this.context.push({ input });
    
            const output = this.classify(input);
            console.log(`${textColor(31, '[Chatbot]:')} ${output}`);
            prompt();
          });
        };
    
        prompt();
      }
}

export default Chatbot;
