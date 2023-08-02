const readline = require('readline');
const natural = require('./lib.js');
const data = require('./data.json');

class Chatbot {
	constructor() {
		this.classifier = natural.BayesClassifier();
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
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

		// For this example, we'll just return the first response category. You can customize the response selection logic as needed.
		return responseCategories[0];
	}

	start() {
		const textColor = (colorCode, text) => `\x1b[${colorCode}m${text}\x1b[0m`;

		const prompt = () => {
			this.rl.question(textColor(32, '[You]: '), input => {
				const output = this.classify(input);
				console.log(`${textColor(31, '[Chatbot]:')} ${output}`);
				prompt();
			});
		};

		prompt();
	}
}

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
